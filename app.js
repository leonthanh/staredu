const express = require('express');
const path = require('path');
const questions = require('./questions.js');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');
const app = express();

const upload = multer();

// Đường dẫn an toàn cho file dữ liệu
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const RESULTS_FILE = path.join(DATA_DIR, 'results.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

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

// Trang chủ
app.get('/', (req, res) => {
  res.render('index', { questions });
});

// API lấy dữ liệu câu hỏi
app.get('/api/questions', (req, res) => {
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
        from: '"KET Test" <stareduelt@gmail.com>',
        to: 'thientinh1984@gmail.com',
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));