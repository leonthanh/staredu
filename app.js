const express = require('express');
const path = require('path');
const questions = require('./questions.js');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');
const app = express();

const upload = multer();

// Cấu hình transporter cho Gmail (nên dùng App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'luongkhiemdu@gmail.com',
    pass: 'wbgh yxdj ddsu esas'
  }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Thêm dòng này để đọc JSON từ client

// Trang chủ
app.get('/', (req, res) => {
  res.render('index', { questions });
});

// API lấy dữ liệu câu hỏi (nếu cần AJAX)
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

// API nhận kết quả bài làm
app.post('/submit', upload.single('pdf'), async (req, res) => {
  try {
    const { score, total, time, answers } = req.body;
    const pdfBuffer = req.file.buffer;

    // Gửi email cho admin
    await transporter.sendMail({
      from: '"KET Test" <luongkhiemdu@gmail.com>',
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

    // Lưu kết quả vào file như cũ
    fs.appendFile('results.json', JSON.stringify({ score, total, time, answers }) + '\n', err => {});

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));