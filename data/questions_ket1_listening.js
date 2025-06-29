const meta = {
  id: 'ket1_listening',
  name: 'KET 1 Listening',
  desc: 'Đề thi KET Listening số 1',
  level: 'A2',
};

// Questions for the KET test, part 1
const questions = [
    
  {
    index: 1,
    part: 1,
    left: `
  <div class="question-title"><strong>1. When is the party?</strong>
    <button class="flag-btn" data-flag="1" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
  </div>
  `,
    right: `
    <div class="listening-images" style="display:flex; gap:32px; justify-content:center; margin:24px 0;">
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q1A').checked=true;">
      <img src="/images/ket1_listening_1A.png" alt="16th" style="width:120px; height:auto;"><br>
      <label>
        <input type="radio" id="q1A" name="q1" value="A" style="margin-right:4px;"> <span style="font-weight:bold;">A</span>
      </label>
    </div>
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q1B').checked=true;">
      <img src="/images/ket1_listening_1B.png" alt="20th" style="width:120px; height:auto;"><br>
      <label>
        <input type="radio" id="q1B" name="q1" value="B" style="margin-right:4px;"> <span style="font-weight:bold;">B</span>
      </label>
    </div>
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q1C').checked=true;">
      <img src="/images/ket1_listening_1C.png" alt="23rd" style="width:120px; height:auto;"><br>
      <label>
        <input type="radio" id="q1C" name="q1" value="C" style="margin-right:4px;"> <span style="font-weight:bold;">C</span>
      </label>
    </div>
  </div> `,
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
      left: '',
      right: '',
      answer: "B"
    },
    {
      index: 8,
      part: 2,
      left: '',
      right: '',
      answer: "C"
    },
    {
      index: 9,
      part: 2,
      left: '',
      right: '',
      answer: "A"
    },
    {
      index: 10,
      part: 2,
      left: '',
      right: '',
      answer: "C"
    },
    {
      index: 11,
      part: 2,
      left: '',
      right: '',
      answer: "B"
    },
    {
      index: 12,
      part: 2,
      left: '',
      right: '',
      answer: "C"
    },
    {
      index: 13,
      part: 2,
      left: '',
      right: '',
      answer: "A"
    },
  {
    index: 14,
    part: 3,
    left: '',
    right: '',
    answer: "B"
  },
  {
    index: 15,
    part: 3,
    left: '',
    right: '',
    answer: "C"
  },
  {
    index: 16,
    part: 3,
    left: '',
    right: '',
    answer: "A"
  },
  {
    index: 17,
    part: 3,
    left: '',
    right: '',
    answer: "A"
  },
  {
    index: 18,
    part: 3,
    left: '',
    right: '',
    answer: "C"
  },
    {
    index: 19,
    part: 4,
    left: '',
    right: '',
    answer: "B"
  },
  {
    index: 20,
    part: 4,
    left: '',
    right: '',
    answer: "B"
  },
  {
    index: 21,
    part: 4,
    left: '',
    right: '',
    answer: "A"
  },
  {
    index: 22,
    part: 4,
    left: '',
    right: '',
    answer: "C"
  },
  {
    index: 23,
    part: 4,
    left: '',
    right: '',
    answer: "A"
  },
  {
    index: 24,
    part: 4,
    left: '',
    right: '',
    answer: "B"
  },
  {
    index: 25,
    part: 5,
    left: '',
    right: '',
    answer: "about"
  },
  {
    index: 26,
    part: 5,
    left: '',
    right: '',
    answer: "as"
  },
  {
    index: 27,
    part: 5,
    left: '',
    right: '',
    answer: "too"
  },
  {
    index: 28,
    part: 5,
    left: '',
    right: '',
    answer: "you"
  },
  {
    index: 29,
    part: 5,
    left: '',
    right: '',
    answer: "and"
  },
  {
    index: 30,
    part: 5,
    left: '',
    right: '',
    answer: "are"
  },
  {
    index: 31,
    part: 6,
    left: '',
    right: '',
    answer: "Hi Alex,\n\nI think we should meet at the bus station at 10am on Saturday. Please bring a tent, sleeping bag, and some food. We can go hiking, fishing, and maybe even try cooking over a campfire.\n\nSee you soon!\nPrisha"
  },
  {
    index: 32,
    part: 7,
    left: '',
    right: '',
    answer: "In the morning, Johnny was unhappy because his sister Rachel was listening to music and singing loudly. In the afternoon, Rachel was angry because Johnny was talking loudly on his phone. At night, they played video games together and had fun."
  }
];

// Export danh sách câu hỏi
module.exports = {
  meta,
  questions
};

