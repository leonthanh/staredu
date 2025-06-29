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
      <img src="/images/ket1_listening_1A.png" alt="16th" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q1A" name="q1" value="A" style="margin-right:4px;"> <span style="font-weight:bold;">A</span>
      </label>
    </div>
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q1B').checked=true;">
      <img src="/images/ket1_listening_1B.png" alt="20th" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q1B" name="q1" value="B" style="margin-right:4px;"> <span style="font-weight:bold;">B</span>
      </label>
    </div>
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q1C').checked=true;">
      <img src="/images/ket1_listening_1C.png" alt="23rd" style="width:240px; height:auto;"><br>
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
    left: `<div class="question-title"><strong>2. What time does the football match begin?</strong>
    <button class="flag-btn" data-flag="2" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
  </div>`,
    right: `
      <div class="listening-images" style="display:flex; gap:32px; justify-content:center; margin:24px 0;">
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q2A').checked=true;">
      <img src="/images/ket1_listening_2A.png" alt="16th" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q2A" name="q2" value="A" style="margin-right:4px;"> <span style="font-weight:bold;">A</span>
      </label>
    </div>
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q2B').checked=true;">
      <img src="/images/ket1_listening_2B.png" alt="20th" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q2B" name="q2" value="B" style="margin-right:4px;"> <span style="font-weight:bold;">B</span>
      </label>
    </div>
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q2C').checked=true;">
      <img src="/images/ket1_listening_2C.png" alt="23rd" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q2C" name="q2" value="C" style="margin-right:4px;"> <span style="font-weight:bold;">C</span>
      </label>
    </div>
  </div>`,
    answer: `C`,
  },
  {
    index: 3,
    part: 1,
    left: `<div class="question-title"><strong>3. Which T-shirt whould the boy like?</strong>
    <button class="flag-btn" data-flag="3" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
  </div>`,
    right: `
      <div class="listening-images" style="display:flex; gap:32px; justify-content:center; margin:24px 0;">
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q3A').checked=true;">
      <img src="/images/ket1_listening_3A.png" alt="16th" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q3A" name="q3" value="A" style="margin-right:4px;"> <span style="font-weight:bold;">A</span>
      </label>
    </div>
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q3B').checked=true;">
      <img src="/images/ket1_listening_3B.png" alt="20th" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q3B" name="q3" value="B" style="margin-right:4px;"> <span style="font-weight:bold;">B</span>
      </label>
    </div>
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q3C').checked=true;">
      <img src="/images/ket1_listening_3C.png" alt="23rd" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q3C" name="q3" value="C" style="margin-right:4px;"> <span style="font-weight:bold;">C</span>
      </label>
    </div>
  </div>`,
    answer: `C`,
  },

  {
    index: 4,
    part: 1,
    left: `<div class="question-title"><strong>4. How much has the girl paid for each ticket?</strong>
    <button class="flag-btn" data-flag="4" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
  </div>`,
    right: `
      <div class="listening-images" style="display:flex; gap:32px; justify-content:center; margin:24px 0;">
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q4A').checked=true;">
      <img src="/images/ket1_listening_4A.png" alt="16th" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q4A" name="q4" value="A" style="margin-right:4px;"> <span style="font-weight:bold;">A</span>
      </label>
    </div>
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q4B').checked=true;">
      <img src="/images/ket1_listening_4B.png" alt="20th" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q4B" name="q4" value="B" style="margin-right:4px;"> <span style="font-weight:bold;">B</span>
      </label>
    </div>
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q4C').checked=true;">
      <img src="/images/ket1_listening_4C.png" alt="23rd" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q4C" name="q4" value="C" style="margin-right:4px;"> <span style="font-weight:bold;">C</span>
      </label>
    </div>
  </div>`,
        answer: `A`,
    },
    {
    index: 5,
    part: 1,    
      left: `<div class="question-title"><strong>5. Who did they have dinner with yesterday evening?</strong>
    <button class="flag-btn" data-flag="5" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
  </div>`,
    right: `
      <div class="listening-images" style="display:flex; gap:32px; justify-content:center; margin:24px 0;">
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q5A').checked=true;">
      <img src="/images/ket1_listening_5A.png" alt="16th" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q5A" name="q5" value="A" style="margin-right:4px;"> <span style="font-weight:bold;">A</span>
      </label>
    </div>
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q5B').checked=true;">
      <img src="/images/ket1_listening_5B.png" alt="20th" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q5B" name="q5" value="B" style="margin-right:4px;"> <span style="font-weight:bold;">B</span>
      </label>
    </div>
    <div style="text-align:center; cursor:pointer;" onclick="document.getElementById('q5C').checked=true;">
      <img src="/images/ket1_listening_5C.png" alt="23rd" style="width:240px; height:auto;"><br>
      <label>
        <input type="radio" id="q5C" name="q5" value="C" style="margin-right:4px;"> <span style="font-weight:bold;">C</span>
      </label>
    </div>
  </div>`,
    answer: `B`,
    },
    {
    index: 6,
    part: 2,
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
    answer: "Hi Alex,\n\nI think we should meet at the bus station at 10am on Saturday. Please bring a tent, sleeping bag, and some food. We can go hiking, fishing, and maybe even try cooking over a campfire.\n\nSee you soon!\nPrisha\n"
  },
  {
    index: 32,
    part: 7,
    left: '',
    right: '',
    answer: "In the morning, Johnny was unhappy because his sister Rachel was listening to music and singing loudly. In the afternoon, Rachel was angry because Johnny was talking loudly on his phone. At night, they played video games together and had fun.\n"
  }
];

// Export danh sách câu hỏi
module.exports = {
  meta,
  questions
};

