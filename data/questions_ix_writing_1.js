const meta = {
  id: 'ix_writing_1',
  name: 'IX Writing 1',
  desc: 'Đề thi IX Writing Thảo Vy số 1',
  level: 'Summer',
};


const writingLeftTask1 = `
<div class="writing-panel" style="max-width:500px;margin:auto;">
  <div style="margin-bottom:10px;">
    Writing task 1    
  </div>
  <div style="text-align:center;">
    <b>Pie chart</b>
    <ul style="margin-top:6px;">
      <li>The pie charts show information about energy production in a country in two separate years.</li>
    </ul>
    <div style="text-align:center;">
      <img src="/images/pie chart.png" alt="23rd" style="width:100%; height:auto;"><br>
    </div>
  </div>
</div>
`;
const writingRightTask1 = `
<div style="margin-top:16px;">
    <div style="margin-top:10px; font-weight:bold; color:#555;">
        <b>Task 1 Your answer:</b>
    </div>
  <button class="flag-btn" data-flag="1" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
</div>


<div style="position:relative;">
    <textarea id="writing-part6-answer" rows="20" style="width:100%; min-height:220px; resize:vertical; font-size:16px; padding:10px; box-sizing:border-box;"></textarea>
    <span style="position:absolute; right:12px; bottom:8px; color:#222; font-size:16px;">
      Words: <span id="writing-part6-wordcount">0</span>
    </span>  
</div>
`;
const writingLeftTask2 = `
<div class="writing-panel" style="max-width:500px;margin:auto;">
    <div>Writing task 2 </div>
    <div style="text-align:center;"><b>agree/disagree</b></div>
<div style="text-align:justify; margin-top:10px;">
  It is the responsibility of schools to teach children good behavior in addition to providing formal education. To what extent do you agree or disagree? 
</div>
</div>

`;
const writingRightTask2 = `
<div style="margin-top: 16px;">
  <div style="margin-top:10px; font-weight:bold; color:#555;">
        <b>Task 2 Your answer:</b>
    </div>
    <button class="flag-btn" data-flag="2" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
</div>



<div style="position:relative;">
    <textarea id="writing-part7-answer" rows="25" style="width:100%; min-height:220px; resize:vertical; font-size:16px; padding:10px; box-sizing:border-box;"></textarea>
      <span style="position:absolute; right:12px; bottom:8px; color:#222; font-size:16px;">
      Words: <span id="writing-part7-wordcount">0</span>
      </span>  
</div>

`;
// Questions for the KET test, part 1
const questions = [
    {
    index: 1,
    part: '',
    left: writingLeftTask1,
    right: writingRightTask1,
    answer: ''
  },
  {
    index: 2,
    part: '',
    left: writingLeftTask2,
    right: writingRightTask2,
    answer: ''
  }
 
];

// Export danh sách câu hỏi
module.exports = {
  meta,
  questions
};

