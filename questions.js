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
    left: `<div class="email-panel">
    <div class="email-header">
      <span><b>To:</b> Lucy</span>
      <span><b>From:</b> Emma</span>
    </div>
    <div class="email-body">
      Can you come sailing this weekend? My dad's rented a small boat for two days.<br>
      It doesn't matter that it's your first time.
    </div>
  </div>`,
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
    left: `<div class="sticky-note">
      <div class="sticky-title">Friday singing lessons<br><span class="sticky-room">(Room 3B)</span></div>
      <div class="sticky-body">
        Please tell Mrs Topson by Thursday afternoon if interested.
      </div>
    </div>`,
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
    left: `<div class="phone-mockup">
      <div class="dynamic-island"></div>
      <div class="phone-screen">
        <div style="font-weight:bold; margin-bottom:6px;">Hi Jamie,</div>
        <div>
          You left your maths book at my house yesterday.<br>
          I'll bring it to school tomorrow and give it to you.
        </div>
        <div style="margin-top:10px; text-align:right;">Max</div>
      </div>
      <div class="phone-footer"></div>
    </div>`,
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
    left: `<div class="email-panel">
      <div class="email-header">
        <span><b>To:</b> Students</span>
        <span><b>From:</b> Mr Thomas</span>
      </div>
      <div class="email-body">
        Anyone interested in becoming a member of an after-school sports club this term must complete an online form first.
      </div>
    </div>`,
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
    left: `<div class="note-paper">
      <div class="note-pin"></div>
      <div class="note-content">
        Jack,<br><br>
        I'm working late tonight - back by 7. Turn the heating on if you're cold.<br>
        You'll find some pasta in the fridge.<br><br>
        Mum
      </div>
    </div>`,
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
    left: `<div class="email-panel">
      <div class="email-header">
        <span><b>To:</b> All students</span>
        <span><b>Subject:</b> School magazine</span>
      </div>
      <div class="email-body">
        We need some articles for the school magazine.<br>
        Email me with your ideas by Tuesday. I'll need the finished articles in two weeks.
      </div>
    </div>`,
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
      right: '', // Không cần bảng ở đây nữa
      answers: {
        7: "B",
        8: "C",
        9: "A",
        10: "C",
        11: "B",
        12: "C",
        13: "A"
      },
      answer: "B"
    },
    {
      index: 8,
      part: 2,
      left: reading7_13,
      right: '',
      answer: "C"
    },
    {
      index: 9,
      part: 2,
      left: reading7_13,
      right: '',
      answer: "A"
    },
    {
      index: 10,
      part: 2,
      left: reading7_13,
      right: '',
      answer: "C"
    },
    {
      index: 11,
      part: 2,
      left: reading7_13,
      right: '',
      answer: "B"
    },
    {
      index: 12,
      part: 2,
      left: reading7_13,
      right: '',
      answer: "C"
    },
    {
      index: 13,
      part: 2,
      left: reading7_13,
      right: '',
      answer: "A"
    },
];

// Export danh sách câu hỏi
module.exports = questions;