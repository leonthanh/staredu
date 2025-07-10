const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');
const app = express();
const PDFDocument = require('pdfkit');
const upload = multer();

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const RESULTS_FILE = path.join(DATA_DIR, 'results.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// --- Helper: Lấy danh sách đề thi ---
function getTestList() {
  // Chỉ lấy file questions_*.js
  const files = fs.readdirSync(DATA_DIR).filter(f => /^questions_.+\.js$/.test(f));
  // Lấy meta từ từng file (nên export meta trong mỗi file đề)
  return files.map(f => {
    const testId = f.replace(/^questions_/, '').replace(/\.js$/, '');
    // Đọc meta nếu có
    let meta = { id: testId, name: testId, desc: '', level: '', count: 0 };
    try {
      const q = require(path.join(DATA_DIR, f));
      meta = Object.assign(meta, q.meta || {}, { count: Array.isArray(q.questions) ? q.questions.length : 0 });
    } catch {}
    return meta;
  });
}

// --- Helper: Load đề theo testId ---
function loadQuestions(testId) {
  const file = path.join(DATA_DIR, `questions_${testId}.js`);
  if (!fs.existsSync(file)) return null;
  const q = require(file);
  return q.questions || [];
}

// Cấu hình transporter cho Gmail (nên dùng App Password và biến môi trường)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER || 'stareduelt@gmail.com',
    pass: process.env.MAIL_PASS || 'xrrz fqwq xwdc hujb'
  }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Trang chủ: chọn đề thi
app.get('/', (req, res) => {
  res.render('login');
});

// Trang home: chọn đề thi
app.get('/home', (req, res) => {
  const tests = getTestList();
  res.render('home', { tests });
});

// Trang home: chọn đề thi
app.get('/home', (req, res) => {
  const tests = getTestList();
  res.render('home', { tests });
});

// Trang làm bài: truyền testId
app.get('/test/:testId', (req, res) => {
  const testId = req.params.testId;
  const questions = loadQuestions(testId);
  if (!questions.length) return res.status(404).send('Test not found');
  // Lấy meta từ file đề thi
  const file = path.join(DATA_DIR, `questions_${testId}.js`);
  let testMeta = { id: testId, name: testId, desc: '', level: '', count: questions.length };
  if (fs.existsSync(file)) {
    const q = require(file);
    if (q.meta) testMeta = Object.assign(testMeta, q.meta);
  }
  res.render('index', { questions, testId, testMeta });
});

// API lấy dữ liệu câu hỏi theo testId
app.get('/api/questions/:testId', (req, res) => {
  const questions = loadQuestions(req.params.testId);
  if (!questions.length) return res.status(404).json({ error: 'Not found' });
  res.json(questions);
});

// API nhận kết quả bài làm
app.post('/submit', upload.single('pdf'), async (req, res) => {
  try {
    const { score, total, time, answers } = req.body;
    const pdfBuffer = req.file ? req.file.buffer : null;

    // Gửi email cho admin nếu có file PDF
    if (pdfBuffer) {
      await transporter.sendMail({
        from: '"StarEdu Test" <stareduelt@gmail.com>',
        to: 'thanhlh@siec-star.edu.vn',
        subject: 'Kết quả bài thi mới',
        text: `Số điểm: ${score}/${total}\nThời gian: ${time}\nĐáp án: ${answers}`,
        attachments: [
          {
            filename: 'result.pdf',
            content: pdfBuffer
          }
        ]
      });
    }

    // Lưu kết quả vào file
    fs.appendFile(RESULTS_FILE, JSON.stringify({ score, total, time, answers }) + '\n', err => {});

    // Lấy thông tin người dùng từ số điện thoại (nếu cần)
    const phone = answers.find(a => /^0\d{9,10}$/.test(a));
    let userName = '', userPhone = '';
    if (phone) {
      const users = fs.existsSync(USERS_FILE) ? JSON.parse(fs.readFileSync(USERS_FILE)) : [];
      const user = users.find(u => u.phone === phone);
      if (user) {
        userName = user.name;
        userPhone = user.phone;
      }
    }
  
    const wordBuffer = await Packer.toBuffer(doc);

    // Gửi mail với các file đính kèm
    await transporter.sendMail({
      from: '"KET Test" <stareduelt@gmail.com>',
      to: 'thientinh1984@gmail.com',
      subject: 'Kết quả bài thi - ' + userName,
      text: `Kết quả bài thi của bạn: ${score}/${total}\nThời gian: ${time} giây`,
      attachments: [
        {
          filename: 'result.txt',
          content: txtBuffer
        },
        {
          filename: 'result.docx',
          content: wordBuffer
        }
      ]
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Đăng ký
app.post('/register', (req, res) => {
  const { name, phone } = req.body;
  if (!name || name.length < 2) return res.json({ success: false, message: 'Name is required!' });
  if (!/^0\d{9,10}$/.test(phone)) return res.json({ success: false, message: 'Invalid phone number!' });
  let users = [];
  if (fs.existsSync(USERS_FILE)) users = JSON.parse(fs.readFileSync(USERS_FILE));
  if (users.find(u => u.phone === phone)) return res.json({ success: false, message: 'Phone already registered!' });
  users.push({ name, phone });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users));
  res.json({ success: true });
});

// Đăng nhập
app.post('/login', (req, res) => {
  const { name, phone } = req.body;
  let users = [];
  if (fs.existsSync(USERS_FILE)) users = JSON.parse(fs.readFileSync(USERS_FILE));
  if (users.find(u => u.phone === phone && u.name === name)) return res.json({ success: true });
  res.json({ success: false, message: 'Wrong name or phone!' });
});

app.get('/login', (req, res) => {
  res.render('login');
});
// API lấy danh sách kết quả
function buildFullResultContent(userAnswers, userName, userPhone, score, total, time) {
  let text = `TEST RESULT\n`;
  text += `Name: ${userName}\nPhone: ${userPhone}\nTime: ${time}\nScore: ${score}/${total}\n\n`;

  let currentPart = 0;
  questions.forEach(q => {
    if (q.part !== currentPart) {
      currentPart = q.part;
      text += `\n--- Part ${currentPart} ---\n`;
    }
    let userAns = userAnswers[q.index] || '-';
    let correctAns = getAnswerText(q.answer);
    text += `Q${q.index}: Your answer: ${userAns} | Correct: ${correctAns}\n`;
  });

  return text;
}

function buildDocxContent(userAnswers, userName, userPhone, score, total, time) {
  const content = [
    new Paragraph(`TEST RESULT`),
    new Paragraph(`Name: ${userName}`),
    new Paragraph(`Phone: ${userPhone}`),
    new Paragraph(`Time: ${time}`),
    new Paragraph(`Score: ${score}/${total}`),
  ];

  let currentPart = 0;
  questions.forEach(q => {
    if (q.part !== currentPart) {
      currentPart = q.part;
      content.push(new Paragraph(``));
      content.push(new Paragraph(`--- Part ${currentPart} ---`));
    }
    let userAns = userAnswers[q.index] || '-';
    // Nếu là Part 6, 7 (tự luận), in riêng
    if (q.part === 6 || q.part === 7) {
      content.push(new Paragraph(`Q${q.index}: ${userAns}`));
    } else {
      content.push(new Paragraph(`Q${q.index}: Your answer: ${userAns} | Correct: ${getAnswerText(q.answer)}`));
    }
  });

  return content;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
