const express = require('express');
const path = require('path');
const questions = require('./questions.js');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Trang chủ
app.get('/', (req, res) => {
  res.render('index', { questions });
});

// API lấy dữ liệu câu hỏi (nếu cần AJAX)
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));