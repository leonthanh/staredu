const reading7_13 = `
  <div style="text-align:center;">
    <b>Three places to learn surfing</b><br>
    <img src="./images/ket7_13.png" alt="surfing" style="max-width:220px;margin:12px auto;display:block;">
  </div>
  <b>Nosara, Costa Rica</b><br>
  From the centre of the town of Nosara, you can easily walk to several good beaches for beginner surfers. The sea is warm all year round and the weather is beautiful, so you'll be surprised by how quiet the beaches always are. There are many excellent surf teachers around the town, and their prices aren't high. The town's also famous for its wildlife park, where you can see some amazing sea animals.<br><br>
  <b>Agadir, Morocco</b><br>
  The area around Agadir in the south of Morocco is very popular with surfers. Beginners need to go in autumn when the sea is safe and the water is nice and warm. Experienced surfers will enjoy it more in winter when the waves are big and exciting. From the city you can drive to many lovely beaches in less than 20 minutes. The area's well known for having a large number of surf camps. These are comfortable and friendly and don't cost much. Book for at least three days, to make the most of your time.<br><br>
  <b>Inch Marlow, Barbados</b><br>
  A surprising number of people haven't heard that the southern side of the island of Barbados is excellent for beginner surfers. However, Zed Layson, a famous surfer, has a school there at Surfer's Point, which is excellent for those who want to try the sport for the first time. As well as good teachers, there is always a photographer waiting to take a picture of you on your surfboard. In summer it rains a lot, but the water is warm so surfing is still possible.
`;

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
    {
    index: 5,
    part: 1,    
    left: `<img src="./images/ket5.png" alt="cau hoi so 5">`,
    right: `
      <strong>5</strong> <br /> <button class="flag-btn" data-flag="5" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
      <h4>Jack's mother says</h4>
      <div class="question-options">
        <label><input type="radio" name="q5" value="A"> A. there is a problem with the heating..</label><br>
        <label><input type="radio" name="q5" value="B"> B. she's left some food ready for Jack.</label><br>
        <label><input type="radio" name="q5" value="C"> C. she'll be home at the usual time.</label>
      </div>`,
    answer: `B`,
    },
    {
    index: 6,
    part: 1,
    left: `<img src="./images/ket6.png" alt="cau hoi so 6">`,
    right: `
      <strong>6</strong> <br /> <button class="flag-btn" data-flag="6" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
      <h4>The school magazine</h4>
      <div class="question-options">
        <label><input type="radio" name="q6" value="A"> A. will be available on Tuesday.</label><br>
        <label><input type="radio" name="q6" value="B"> B. is looking for writers.</label><br>
        <label><input type="radio" name="q6" value="C"> C. needs new readers.</label>
      </div>`,
    answer: `B`,
    },
    {
      index: 7,
      part: 2,
      left: reading7_13,
      right: `
        <table class="multi-question-table" style="width:100%;margin-bottom:16px;">
          <thead>
            <tr>
              <th></th>
              <th style="text-align:center;">Nosara</th>
              <th style="text-align:center;">Agadir</th>
              <th style="text-align:center;">Inch Marlow</th>
            </tr>
          </thead>
          <tbody>
            <tr id="q7">
              <td>7. Which place is only good for beginners at one time of year?</td>
              <td style="text-align:center;"><label><input type="radio" name="q7" value="A"> A </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q7" value="B"> B </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q7" value="C"> C </label></td>
            </tr>
            <tr id="q8">
              <td>8. Where can you learn from a well-known teacher?</td>
              <td style="text-align:center;"><label><input type="radio" name="q8" value="A"> A </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q8" value="B"> B </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q8" value="C"> C </label></td>
            </tr>
            <tr id="q9">
              <td>9. Which place has something to do when you're not surfing?</td>
              <td style="text-align:center;"><label><input type="radio" name="q9" value="A"> A </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q9" value="B"> B </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q9" value="C"> C </label></td>
            </tr>
            <tr id="q10">
              <td>10. Which place has wet weather at one time of the year?</td>
              <td style="text-align:center;"><label><input type="radio" name="q10" value="A"> A </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q10" value="B"> B </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q10" value="C"> C </label></td>
            </tr>
            <tr id="q11">
              <td>11. Where is it possible to stay without paying a lot?</td>
              <td style="text-align:center;"><label><input type="radio" name="q11" value="A"> A </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q11" value="B"> B </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q11" value="C"> C </label></td>
            </tr>
            <tr id="q12">
              <td>12. Which place is not well known as a good place to learn to surf?</td>
              <td style="text-align:center;"><label><input type="radio" name="q12" value="A"> A </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q12" value="B"> B </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q12" value="C"> C </label></td>
            </tr>
            <tr id="q13">
              <td>13. From which town can you get to the surfing beaches on foot?</td>
              <td style="text-align:center;"><label><input type="radio" name="q13" value="A"> A </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q13" value="B"> B </label></td>
              <td style="text-align:center;"><label><input type="radio" name="q13" value="C"> C </label></td>
            </tr>
          </tbody>
        </table>
      `,
      // Bạn có thể thêm trường answers nếu muốn chấm tự động:
      answers: {
        7: "B",
        8: "C",
        9: "A",
        10: "C",
        11: "B",
        12: "C",
        13: "A"
      }
    },
    
];

// Export danh sách câu hỏi
module.exports = questions;