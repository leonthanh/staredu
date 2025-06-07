const questions = [
  {
    index: 1,
    part: 1,
    left: `<img src="./images/ket1.png" alt="cau hoi so 1">`,
    right: `
      <strong>1</strong> <br /> 
      <button class="flag-btn" data-flag="1" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
      <h4>Emma says it's not a problem that</h4>
      <div class="question-options">
        <label><input type="radio" name="q1" value="A"> A. there isn't much space on the boat.</label><br>
        <label><input type="radio" name="q1" value="B"> B. the sailing trip will be very short</label><br>
        <label><input type="radio" name="q1" value="C"> C. Lucy has never sailed before</label>
      </div>`,
    answer: `C`,
  },
  {
    index: 2,
    part: 1,
    left: `<img src="./images/ket2.png" alt="cau hoi so 2">`,
    right: `
      <strong>2</strong> <br /> <button class="flag-btn" data-flag="2" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
      <div class="question-options">
        <label><input type="radio" name="q2" value="A"> A. Mrs Topson is telling students about a change to their singing lessons.</label><br>
        <label><input type="radio" name="q2" value="B"> B. Mrs Topson is offering to give singing lessons on Thursday anh Fridays.</label><br>
        <label><input type="radio" name="q2" value="C"> C. Mrs Topson would like to know who wants to have singing lessons</label>
      </div>`,
    answer: `A`,
  },
  {
    index: 3,
    part: 1,
    left: `<img src="./images/ket3.png" alt="cau hoi so 3">`,
    right: `
      <strong>3</strong> <br /> <button class="flag-btn" data-flag="3" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
    `,
    answer: `B`,
  }
  // Thêm các câu hỏi khác vào đây theo cấu trúc tương tự
];

// Export danh sách câu hỏi
module.exports = questions;