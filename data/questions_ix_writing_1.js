const meta = {
  id: 'ix_writing_1',
  name: 'IX Writing 1',
  desc: 'Đề thi IX Writing Thảo Vy số 1',
  level: 'Summer',
};


const writingPart6 = `
<div class="writing-panel" style="max-width:500px;margin:auto;">
  <div style="margin-bottom:10px;">
    Writing task 1    
  </div>
  <div>
    <b>Pie chart</b>
    <ul style="margin-top:6px;">
      <li>The pie charts show information about energy production in a country in two separate years.</li>
    </ul>
    <div style="text-align:center; cursor:pointer;">
      <img src="/images/pie chart.png" alt="23rd" style="width:100%; height:auto;"><br>
    </div>
  </div>
</div>
`;
const writingPanelRightPart6 = `
<div style="margin-top:16px;">
  <div style="font-size:15px; color:#666;">
    Write <b>25 words</b> or more.
  </div>
  <div style="margin-top:10px; font-weight:bold; color:#555;">
    Write the email on your answer sheet.
  </div>
  <button class="flag-btn" data-flag="31" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
</div>

<div style="position:relative;">
    <textarea id="writing-part6-answer" rows="10" style="width:100%; min-height:220px; resize:vertical; font-size:16px; padding:10px; box-sizing:border-box;"></textarea>
    <span style="position:absolute; right:12px; bottom:8px; color:#222; font-size:16px;">
      Words: <span id="writing-part6-wordcount">0</span>
    </span>  
</div>
`;
const writingPanelLeftPart7 = `
<div style="margin-bottom:16px;">
  <b>Look at the three pictures.<br>
  Write the story shown in the pictures.<br>
  Write <span style="font-weight:bold;">35 words</span> or more.</b>
</div>
<div style="text-align:center;">
  <img src="/images/ket32-1-color.png" alt="Part 7 - Câu 32" class="part7-img" />
  <img src="/images/ket32-2-color.png" alt="Part 7 - Câu 32" class="part7-img" />
  <img src="/images/ket32-3-color.png" alt="Part 7 - Câu 32" class="part7-img" />
</div>
`;
const writingPanelRightPart7 = `
<div style="margin-bottom: 12px;">
  <b>Your answer:</b>
    <button class="flag-btn" data-flag="32" title="Đánh dấu câu này"><span class="flag-icon">&#9873;</span> </button>
</div>
<div style="position:relative;">
    <textarea id="writing-part7-answer" rows="10" style="width:100%; min-height:220px; resize:vertical; font-size:16px; padding:10px; box-sizing:border-box;"></textarea>
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
    left: writingPart6,
    right: writingPanelRightPart6,
    answer: "Hi Alex,\n\nI think we should meet at the bus station at 10am on Saturday. Please bring a tent, sleeping bag, and some food. We can go hiking, fishing, and maybe even try cooking over a campfire.\n\nSee you soon!\nPrisha\n"
  },
  {
    index: 2,
    part: '',
    left: writingPanelLeftPart7,
    right: writingPanelRightPart7,
    answer: "In the morning, Johnny was unhappy because his sister Rachel was listening to music and singing loudly. In the afternoon, Rachel was angry because Johnny was talking loudly on his phone. At night, they played video games together and had fun.\n"
  }
 
];

// Export danh sách câu hỏi
module.exports = {
  meta,
  questions
};

