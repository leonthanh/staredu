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
    answer: `C`,
  },
  {
    index: 3,
    part: 1,
    left: `<img src="./images/ket3.png" alt="cau hoi so 3">`,
    right: `
      <strong>3</strong> <br /> <button class="flag-btn" data-flag="3" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
      <div class="question-options">
        <label><input type="radio" name="q3" value="A"> A. Max has borrowed one of Jamie's books.</label><br>
        <label><input type="radio" name="q3" value="B"> B. Max and Jamie will havee a maths class tomorrow.</label><br>
        <label><input type="radio" name="q3" value="C"> C. Max has found Jamie's school book.</label>
      </div>`,
      
    answer: `C`,
  },
  {
    index: 4,
    part: 1,
    left: `<img src="./images/ket4.png" alt="cau hoi so 4">`,
    right: `
      <strong>4</strong> <br /> <button class="flag-btn" data-flag="4" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
      <div class="question-options">
        <label><input type="radio" name="q4" value="A"> A. You cannot join a sports club until you have filled in a form.</label><br>
        <label><input type="radio" name="q4" value="B"> B. If you belong to a sports club, check online for details about it.</label><br>
        <label><input type="radio" name="q4" value="C"> C. The sports clubs aren't taking new members because they're already full.</label>
        </div>`,
        answer: `A`,
    },
    

  // Thêm các câu hỏi khác vào đây theo cấu trúc tương tự
];

// Export danh sách câu hỏi
module.exports = questions;