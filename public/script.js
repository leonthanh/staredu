let userAnswers = {};
// ... các code resize ...


// Sự kiện click nút Part: xổ ra/ẩn vào các nút chỉ số và hiện panel đầu tiên của Part
$('[id^=btnPart]').on('click', function () {
  const partNum = $(this).attr('id').replace('btnPart', '');
  const $container = $('#numberButtonsContainer' + partNum);

  // Nếu đang hiện thì ẩn, nếu đang ẩn thì hiện
  if ($container.hasClass('show')) {
    $container.removeClass('show');
    $('[id^=btnPart]').removeClass('active');
  } else {
    $('.numberButtonsContainer').removeClass('show');
    $container.addClass('show');
    $('[id^=btnPart]').removeClass('active');
    $(this).addClass('active');
    // Chọn nút số đầu tiên của Part này và hiển thị panel tương ứng
    let $firstBtn = $container.find('.btn-number').first();
    if ($firstBtn.length) {
      let idx = $firstBtn.data('index');
      $('.btn-number').removeClass('active');
      $firstBtn.addClass('active');
      $('.panel-content.left').hide();
      $('.panel-content.left[data-index="' + idx + '"]').show();
      $('.panel-content.right').hide();
      // Sửa đoạn này: Nếu là Part 2 (index 7-13), luôn show panel-part2
      if (idx >= 7 && idx <= 13) {
        $('#panel-part2').show();
        setTimeout(function() {
          restoreMultiQuestionAnswers();
          // Cuộn đến đúng dòng
          var row = $('#q' + idx);
          if (row.length) {
            row[0].scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 0);
      } else {
        $('.panel-content.right[data-index="' + idx + '"]').show();
      }
    }
  }
});

// Sự kiện nút mũi tên
$('#btnPrev').on('click', function () {
  let $allBtns = $('.btn-number');
  let $current = $('.btn-number.active');
  let idx = $allBtns.index($current);
  if (idx > 0) {
    $allBtns.eq(idx - 1).trigger('click');
    // Hiện Part chứa nút này
    let $container = $allBtns.eq(idx - 1).closest('.numberButtonsContainer');
    $container.addClass('show').siblings('.numberButtonsContainer').removeClass('show');
    $('[id^=btnPart]').removeClass('active');
    let partNum = $container.attr('id').replace('numberButtonsContainer', '');
    $('#btnPart' + partNum).addClass('active');
  }
});

// Nút Next: chuyển đến nút kế tiếp và hiện panel tương ứng
$('#btnNext').on('click', function () {
  let $allBtns = $('.btn-number');
  let $current = $('.btn-number.active');
  let idx = $allBtns.index($current);
  if (idx < $allBtns.length - 1) {
    $allBtns.eq(idx + 1).trigger('click');
    // Hiện Part chứa nút này
    let $container = $allBtns.eq(idx + 1).closest('.numberButtonsContainer');
    $container.addClass('show').siblings('.numberButtonsContainer').removeClass('show');
    $('[id^=btnPart]').removeClass('active');
    let partNum = $container.attr('id').replace('numberButtonsContainer', '');
    $('#btnPart' + partNum).addClass('active');
  }
});

// Sự kiện phím mũi tên
$(document).on('keydown', function(e) {
  if ($(e.target).is('input, textarea')) return;
  if (e.key === "ArrowLeft") {
    $('#btnPrev').trigger('click');
    e.preventDefault();
  }
  if (e.key === "ArrowRight") {
    $('#btnNext').trigger('click');
    e.preventDefault();
  }
});

// Giả sử bạn đã có biến userAnswers, questions, score, ...
$('#btnCheck').off('click').on('click', function () {
  finishExam();

  // Xóa dữ liệu Part 5 khỏi localStorage
    for (let i = 25; i <= 30; i++) {
    localStorage.removeItem(`part5_q${i}`);
    $(`#part5-q${i}`).val('');
  }
  // Xóa dữ liệu Part 6 và Part 7 khỏi localStorage
localStorage.removeItem('writing_part6_answer');
localStorage.removeItem('writing_part7_answer');

// Làm trống ô nhập Part 6 và Part 7 (nếu đang hiển thị)
$('#writing-part6-answer').val('');
$('#writing-part7-answer').val('');

// Reset word count về 0
$('#writing-part6-wordcount').text(0);
$('#writing-part7-wordcount').text(0);
});

function normalizeAnswer(ans) {
  // Chuẩn hóa: xóa khoảng trắng đầu/cuối, chuyển về chữ thường
  return (ans || '').toString().trim().toLowerCase();
}

function finishExam() {
  // ĐỒNG BỘ ĐÁP ÁN PART 5 VÀO userAnswers TRƯỚC KHI TÍNH ĐIỂM
  for (let i = 25; i <= 30; i++) {
    userAnswers[i] = $(`#part5-q${i}`).val() || '-';
  }

  let score = 0;
  questions.forEach(q => {
    let userAns = userAnswers[q.index];
    let correctAns = typeof q.answer === 'string' ? q.answer : (q.answer.text || q.answer.value || '');
    // Nếu là Part 5 (câu 25-30): so sánh không phân biệt hoa thường, khoảng trắng
    if (q.index >= 25 && q.index <= 30) {
      if (normalizeAnswer(userAns) === normalizeAnswer(correctAns)) {
        score += 1;
      }
    } else {
      // Các phần khác giữ nguyên cách chấm cũ
      if (userAns === correctAns) {
        score += 1;
      }
    }
  });

  // Lấy thông tin user
  const userName = localStorage.getItem('userName') || '';
  const userPhone = localStorage.getItem('userPhone') || '';

  // ĐỒNG BỘ ĐÁP ÁN PART 5 VÀO userAnswers
  for (let i = 25; i <= 30; i++) {
    userAnswers[i] = $(`#part5-q${i}`).val() || '-';
  }

  // Hiện popup NGAY LẬP TỨC
    if ($('#popin-submit').length) return;
    $('body').append(`
    <div id="popin-submit" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.3);z-index:2000;display:flex;align-items:center;justify-content:center;">
      <div style="background:#fff;padding:32px 24px;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.18);min-width:220px;text-align:center;">
        <h2 style="color:#2575fc;margin-bottom:12px;">Đã nộp bài!</h2>
        <p>Bạn đã nộp bài thành công.</p>
        <p style="font-size:1.2em;font-weight:bold;color:#eab308;">Số điểm: ${score}/${questions.length}</p>
        <button id="closePopin" style="margin-top:18px;padding:8px 18px;border-radius:8px;border:none;background:#2575fc;color:#fff;font-weight:bold;cursor:pointer;">Đóng</button>
      </div>
    </div>
    `);
    $('#closePopin').on('click', function () {
    $('#popin-submit').remove();
    });

  // Tạo PDF và gửi lên server (chạy nền)
  let doc = new window.jspdf.jsPDF();
  doc.setFont("helvetica", "normal");
  doc.text('TEST RESULT', 10, 10);
  doc.text('Name: ' + userName, 10, 20);
  doc.text('Phone: ' + userPhone, 10, 30);
  doc.text('Time: ' + new Date().toLocaleString(), 10, 40);
  doc.text('Score: ' + score + '/' + questions.length, 10, 50);
  let y = 60;

// Duyệt qua từng câu hỏi
questions.forEach(q => {
  let userAns = userAnswers[q.index] || '-';
  let correctAns = typeof q.answer === 'string' ? q.answer : (q.answer.text || q.answer.value || JSON.stringify(q.answer));

  // Nếu là câu tự luận (31, 32) hoặc đáp án dài
  if (q.index === 31 || q.index === 32) {
    doc.text(`Q${q.index}:`, 10, y);
    y += 8;

    // Chia nhỏ đoạn text để vừa trang
    let answerLines = doc.splitTextToSize(userAns, 180);
    answerLines.forEach(line => {
      if (y > 270) { // Gần cuối trang A4
        doc.addPage();
        y = 20;
      }
      doc.text(line, 14, y);
      y += 8;
    });

    // In đáp án đúng (nếu muốn)
    doc.text('Correct:', 10, y);
    y += 8;
    let correctLines = doc.splitTextToSize(correctAns, 180);
    correctLines.forEach(line => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 14, y);
      y += 8;
    });
  } else {
    // Các câu khác
    let line = `Q${q.index}: Your answer: ${userAns} | Correct: ${correctAns}`;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, 10, y);
    y += 10;
  }
});

// --- Thêm xuất Part 5 ---
doc.text('--- Part 5: Fill in the blanks (Q25-30) ---', 10, y);
y += 10;
for (let i = 25; i <= 30; i++) {
  doc.text(
    `Q${i}: ${userAnswers[i] || '-'}`,
    10, y
  );
  y += 10;
  if (y > 270) {
    doc.addPage();
    y = 20;
  }
}

// --- Thêm xuất Part 6 ---
doc.text('--- Part 6: Writing (Q31) ---', 10, y);
y += 10;
const part6 = localStorage.getItem('writing_part6_answer') || '-';
doc.text(doc.splitTextToSize(part6, 180), 10, y);
y += 10 + 8 * Math.ceil(part6.length / 80);
if (y > 270) {
  doc.addPage();
  y = 20;
}

// --- Thêm xuất Part 7 ---
doc.text('--- Part 7: Writing (Q32) ---', 10, y);
y += 10;
const part7 = localStorage.getItem('writing_part7_answer') || '-';
doc.text(doc.splitTextToSize(part7, 180), 10, y);

// Gửi file PDF lên server
const arrayBuffer = doc.output('arraybuffer');
const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });

let formData = new FormData();
formData.append('pdf', pdfBlob, 'result.pdf');
formData.append('score', score);
formData.append('total', questions.length);
formData.append('time', new Date().toISOString());
formData.append('answers', JSON.stringify(userAnswers));
formData.append('userName', userName);
formData.append('userPhone', userPhone);


fetch('/submit', {
  method: 'POST',
  body: formData
}).catch(err => {
    alert('Có lỗi khi gửi kết quả. Vui lòng thử lại!');
    console.error(err);
  });

  // Sau khi gửi xong:
  localStorage.removeItem('examStartTime');
  localStorage.removeItem('userName');
  localStorage.removeItem('userPhone');
  localStorage.removeItem('userAnswers');
  localStorage.removeItem('flaggedQuestions');
  userAnswers = {}; // <--- Thêm dòng này để reset biến toàn cục
  setTimeout(function() {
    window.location.href = '/login';
    setTimeout(function() {
      window.location.reload();
    }, 200);
  }, 2500); // Đợi 1.5s cho user xem popup điểm
}

let isResizing = false;
let startX = 0;
let startLeftWidth = 0;

$('#divider').on('mousedown touchstart', function(e) {
  isResizing = true;
  startX = e.pageX || e.originalEvent.touches[0].pageX;
  startLeftWidth = $('#leftPane').width();
  $('body').addClass('resizing');
  e.preventDefault();
});
// Xử lý sự kiện di chuyển chuột hoặc chạm để resize
$(document).on('mousemove touchmove', function(e) {
  if (!isResizing) return;
  let x = e.pageX || (e.originalEvent.touches && e.originalEvent.touches[0].pageX);
  let dx = x - startX;
  let containerWidth = $('#container').width();
  let dividerWidth = $('#divider').outerWidth();
  let newLeftWidth = startLeftWidth + dx;
  // Giới hạn min/max
  if (newLeftWidth < 80) newLeftWidth = 80;
  if (newLeftWidth > containerWidth - dividerWidth - 80) newLeftWidth = containerWidth - dividerWidth - 80;
  $('#leftPane').css('width', newLeftWidth + 'px');
  $('#rightPane').css('width', (containerWidth - dividerWidth - newLeftWidth) + 'px');
});
// Xử lý sự kiện khi kết thúc resize
$(document).on('mouseup touchend', function() {
  if (isResizing) {
    isResizing = false;
    $('body').removeClass('resizing');
  }
});
// Xử lý sự kiện resize cửa sổ
$(window).on('resize', function() {
  $('#leftPane, #rightPane').css('width', '');
});
// Thêm hiệu ứng hover cho nút Part 1
$('#btn1').hover(
  function() {
    $('#panel1-highlight').addClass('panel-highlight');
  },
  function() {
    $('#panel1-highlight').removeClass('panel-highlight');
  }
);

// Sự kiện click nút số
$('.btn-number').on('click', function() {
  var idx = $(this).data('index');
  $('.btn-number').removeClass('active');
  $(this).addClass('active');
  $('.panel-content.left').hide();
  $('.panel-content.left[data-index="' + idx + '"]').show();

  // Nếu là câu 7–13 thì chỉ show panel-part2
  if (idx >= 7 && idx <= 13) {
    $('.panel-content.right').hide();
    $('#panel-part2').show();
    setTimeout(function() {
      restoreMultiQuestionAnswers();
      // Cuộn đến đúng dòng
      var row = $('#q' + idx);
      if (row.length) {
        row[0].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 0);
  } else if (idx >= 14 && idx <= 18) {
    $('.panel-content.right').hide();
    $('#panel-part3').show();
    setTimeout(function() {
      // Khôi phục đáp án cho 14-18
      for (let i = 14; i <= 18; i++) {
        const ans = userAnswers[i];
        if (ans) {
          $(`.multi-question-table input[name="q${i}"][value="${ans}"]`).prop('checked', true);
        }
      }
      // Cuộn đến đúng dòng
      var row = $('#q' + idx);
      if (row.length) {
        row[0].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 0);
  } else {
    $('.panel-content.right').hide();
    $('.panel-content.right[data-index="' + idx + '"]').show();
  }
});

// Hiển thị panel đầu tiên khi load trang
$(document).ready(function() {
  var firstIdx = $('.btn-number').first().data('index');
  $('.panel-content.left').hide();
  $('.panel-content.left[data-index="' + firstIdx + '"]').show();
  if (firstIdx >= 7 && firstIdx <= 13) {
    $('.panel-content.right').hide();
    $('#panel-part2').show();
    restoreMultiQuestionAnswers();
  } else {
    $('.panel-content.right').hide();
    $('.panel-content.right[data-index="' + firstIdx + '"]').show();
  }
  let saved = JSON.parse(localStorage.getItem('answers') || '{}');
  Object.keys(saved).forEach(function(name) {
    $('input[type=radio][name="' + name + '"][value="' + saved[name] + '"]').prop('checked', true);
  });
});

// Resize dọc cho mobile
function isMobile() {
  return window.innerWidth <= 480;
}

let isResizingVertical = false;
let startY = 0;
let startTopHeight = 0;

// Xử lý sự kiện resize dọc cho mobile
$('.divider').on('mousedown touchstart', function(e) {
  if (!isMobile()) return;
  isResizingVertical = true;
  startY = e.pageY || (e.originalEvent.touches && e.originalEvent.touches[0].pageY);
  startTopHeight = $('#leftPane').height();
  $('body').addClass('resizing');
  e.preventDefault();
});
// Xử lý sự kiện di chuyển chuột hoặc chạm để resize dọc
$(document).on('mousemove touchmove', function(e) {
  if (!isResizingVertical) return;
  let y = e.pageY || (e.originalEvent.touches && e.originalEvent.touches[0].pageY);
  let dy = y - startY;
  let containerHeight = $('.container').height();
  let dividerHeight = $('.divider').outerHeight();
  let newTopHeight = startTopHeight + dy;
  // Giới hạn min/max
  if (newTopHeight < 60) newTopHeight = 60;
  if (newTopHeight > containerHeight - dividerHeight - 60) newTopHeight = containerHeight - dividerHeight - 60;
  $('#leftPane').css('height', newTopHeight + 'px');
  $('#rightPane').css('height', (containerHeight - dividerHeight - newTopHeight) + 'px');
});
// Xử lý sự kiện khi kết thúc resize dọc
$(document).on('mouseup touchend', function() {
  if (isResizingVertical) {
    isResizingVertical = false;
    $('body').removeClass('resizing');
  }
});
// Xử lý sự kiện resize cửa sổ
$(window).on('resize', function() {
  if (!isMobile()) {
    $('#leftPane, #rightPane').css('height', '');
  }
});
// Xử lý đánh dấu cờ cho từng câu
$(document).on('click', '.flag-btn', function() {
  const idx = $(this).data('flag');
  $(this).toggleClass('active');
  // Tìm nút số trên navbar
  const $btn = $('.btn-number[data-index="' + idx + '"]');
  if ($(this).hasClass('active')) {
    // Thêm icon cờ lên đầu chỉ số
    if ($btn.find('.flag-on-navbar').length === 0) {
      $btn.prepend('<span class="flag-on-navbar">&#9873;</span>');
    }
  } else {
    // Bỏ icon cờ
    $btn.find('.flag-on-navbar').remove();
  }

  // Lưu trạng thái cờ vào localStorage
  let flagged = JSON.parse(localStorage.getItem('flaggedQuestions') || '{}');
  flagged[idx] = $(this).hasClass('active');
  localStorage.setItem('flaggedQuestions', JSON.stringify(flagged));
});
// Xử lý sự kiện chọn đáp án

// Lưu đáp án người dùng vào biến userAnswers
$(document).on('change', '.question-options input[type="radio"]', function() {
  const idx = $(this).attr('name').replace('q', '');
  userAnswers[idx] = $(this).val();
  localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
});

// Lưu đáp án khi chọn radio trong bảng 7-13
$(document).on('change', '.multi-question-table input[type="radio"]', function() {
  const idx = $(this).attr('name').replace('q', '');
  userAnswers[idx] = $(this).val();
  localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
});


// Khôi phục đáp án đã chọn nếu có
let savedAnswers = localStorage.getItem('userAnswers');
if (
  savedAnswers &&
  localStorage.getItem('examStartTime') // chỉ khôi phục nếu đang làm bài dở
) {
  userAnswers = JSON.parse(savedAnswers);
  for (let idx in userAnswers) {
    $(`.question-options input[name="q${idx}"][value="${userAnswers[idx]}"]`).prop('checked', true);
  }
} else {
  // Nếu không phải đang làm bài dở, xóa sạch đáp án cũ
  userAnswers = {};
  localStorage.removeItem('userAnswers');
  $('.question-options input[type="radio"]').prop('checked', false);
  $('.multi-question-table input[type="radio"]').prop('checked', false);
}

// Khôi phục trạng thái cờ khi load lại trang
let flagged = JSON.parse(localStorage.getItem('flaggedQuestions') || '{}');
for (let idx in flagged) {
  if (flagged[idx]) {
    $(`.flag-btn[data-flag="${idx}"]`).addClass('active');
    const $btn = $(`.btn-number[data-index="${idx}"]`);
    if ($btn.find('.flag-on-navbar').length === 0) {
      $btn.prepend('<span class="flag-on-navbar">&#9873;</span>');
    }
  } else {
    $(`.flag-btn[data-flag="${idx}"]`).removeClass('active');
    $(`.btn-number[data-index="${idx}"]`).find('.flag-on-navbar').remove();
  }
}

// Khôi phục đáp án đã chọn cho bảng 7-18
function restoreMultiQuestionAnswers() {
  for (let i = 7; i <= 24; i++) {
    const ans = userAnswers[i];
    if (ans) {
      $(`.multi-question-table input[name="q${i}"][value="${ans}"]`).prop('checked', true);
    }
  }
}

// Khôi phục đáp án đã chọn cho bảng 19-24
function restoreMultiQuestionAnswersPart4() {
  for (let i = 19; i <= 24; i++) {
    const ans = userAnswers[i];
    if (ans) {
      $(`.multi-question-table input[name="q${i}"][value="${ans}"]`).prop('checked', true);
    }
  }
}

// Gọi khi chuyển câu 7-13
$('.btn-number').on('click', function() {
  var idx = $(this).data('index');
  // ...code chuyển panel...
  setTimeout(function() {
    if (idx >= 7 && idx <= 24) {
      restoreMultiQuestionAnswers();
    }
  }, 0);
});

// Gọi khi load trang
$(document).ready(function () {
  // Nếu chưa đăng nhập thì về trang login
  if (!localStorage.getItem('userPhone') || !localStorage.getItem('userName')) {
    window.location.href = '/login';
  }

  // Nếu đang làm bài dở, chỉ chạy lại đồng hồ, KHÔNG hiện popup
  if (localStorage.getItem('examStartTime')) {
    $('#startExamModal').hide(); // Đảm bảo popup bị ẩn
    runExamTimer();
  } else {
    // Hiện popup bắt đầu làm bài
    $('#startExamModal').show();
    $('#btnStartExam').off('click').on('click', function () {
      $('#startExamModal').hide();
      startExamTimer();
    });
  }

  // Khôi phục đáp án đã chọn nếu có
  let savedAnswers = localStorage.getItem('userAnswers');
  if (savedAnswers) {
    userAnswers = JSON.parse(savedAnswers);
    for (let idx in userAnswers) {
      $(`.question-options input[name="q${idx}"][value="${userAnswers[idx]}"]`).prop('checked', true);
    }
  }

  // Khôi phục trạng thái cờ khi load lại trang
  let flagged = JSON.parse(localStorage.getItem('flaggedQuestions') || '{}');
  for (let idx in flagged) {
    if (flagged[idx]) {
      $(`.flag-btn[data-flag="${idx}"]`).addClass('active');
      const $btn = $(`.btn-number[data-index="${idx}"]`);
      if ($btn.find('.flag-on-navbar').length === 0) {
        $btn.prepend('<span class="flag-on-navbar">&#9873;</span>');
      }
    } else {
      $(`.flag-btn[data-flag="${idx}"]`).removeClass('active');
      $(`.btn-number[data-index="${idx}"]`).find('.flag-on-navbar').remove();
    }
  }

  // Khôi phục đáp án đã chọn cho bảng 19-24
  restoreMultiQuestionAnswersPart4();
});
// Đồng hồ làm bài
// Kiểm tra nếu đã có thời gian bắt đầu thì chạy lại đồng hồ
let examTimerInterval = null;
function startExamTimer() {
  // Ghi lại thời gian bắt đầu
  localStorage.setItem('examStartTime', Date.now().toString());
  runExamTimer();
}
// Hàm chạy đồng hồ làm bài
function runExamTimer() {
  let startTime = parseInt(localStorage.getItem('examStartTime'), 10);
  let duration = 60 * 60; // 60 phút (giây)
  let elapsed = Math.floor((Date.now() - startTime) / 1000);
  let remain = duration - elapsed;
  if (remain < 0) remain = 0;
// Hiển thị đồng hồ
  $('#exam-timer').show();
  updateTimerDisplay(remain);
  if (examTimerInterval) clearInterval(examTimerInterval);
  examTimerInterval = setInterval(function () {
    remain--;
    updateTimerDisplay(remain);
    if (remain <= 0) {
      clearInterval(examTimerInterval);
      updateTimerDisplay(0);
      finishExam(); // Hết giờ thì tự động nộp bài
    }
  }, 1000);
}
// Hàm cập nhật hiển thị đồng hồ
function updateTimerDisplay(seconds) {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  $('#exam-timer').text((m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s);
};
// Sự kiện click nút Part 2: hiện panel 7-13 và đổi tiêu đề
// $('#btnPart2').on('click', function () {
//   $('.question h3').text('Questions 7-13');
// });

// Nếu muốn tự động đổi lại về "Question 1-6" khi click Part 1:
// $('#btnPart1').on('click', function () {
//   $('.question h3').text('Questions 1-6');
// });
// Sự kiện click nút Part 3: hiện panel 14-18 và đổi tiêu đề
$('#btnPart3').on('click', function () {
  $('.panel-content.left').hide();
  $('.panel-content.left[data-index="14"]').show();
  $('.panel-content.right').hide();
  $('#panel-part3').show();
  $('.question h3').text('Questions 14-18');
  $('.numberButtonsContainer').removeClass('show');
  $('#numberButtonsContainer3').addClass('show');
  $('[id^=btnPart]').removeClass('active');
  $(this).addClass('active');
  $('.btn-number').removeClass('active');
  $('#numberButtonsContainer3 .btn-number[data-index="14"]').addClass('active');
  setTimeout(function() {
    var row = $('#q14');
    if (row.length) {
      row[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 0);
});
// Chỉ cần click vào nút số sẽ hiện panel tương ứng
$('#numberButtonsContainer3 .btn-number').on('click', function () {
  $('.btn-number').removeClass('active');
  $(this).addClass('active');
  var idx = $(this).data('index');
  var row = $('#q' + idx);
  if (row.length) {
    row[0].scrollIntoView({ behavior: "smooth", block: "center" });
  }
});
// Sự kiện click nút Part 4: hiện panel 19-24 và đổi tiêu đề
$('#btnPart4').on('click', function () {
  $('.panel-content.right').hide();
  $('#panel-part4').show();

  $('.question h3').text('Questions 19-24');
  $('.numberButtonsContainer').removeClass('show');
  $('#numberButtonsContainer4').addClass('show');
  $('[id^=btnPart]').removeClass('active');
  $(this).addClass('active');
  $('.btn-number').removeClass('active');
  $('#numberButtonsContainer4 .btn-number[data-index="19"]').addClass('active');

  // Khôi phục đáp án đã chọn cho 19-24
  restoreMultiQuestionAnswersPart4();

  setTimeout(function() {
    var row = $('#q19');
    if (row.length) {
      row[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 0);
});
// Sự kiện click các nút số 19-24
$('#numberButtonsContainer4 .btn-number').on('click', function () {
  $('.btn-number').removeClass('active');
  $(this).addClass('active');
  var idx = $(this).data('index');
  $('.panel-content.right').hide();
  $('#panel-part4').show();

  // Khôi phục đáp án đã chọn cho 19-24
  restoreMultiQuestionAnswersPart4();

  var row = $('#q' + idx);
  if (row.length) {
    row[0].scrollIntoView({ behavior: "smooth", block: "center" });
  }
});
// Sự kiện click nút Part 5: hiện panel 25-30 và đổi tiêu đề
$('#btnPart5').on('click', function () {
  // Ẩn tất cả panel trái và phải
  $('.panel-content.left').hide();
  $('.panel-content.right').hide();
  $('.divider').hide();

  // Hiện panel trái của câu 25 (part 5)
  $('.panel-content.left[data-index="25"]').show();

  // Thêm class cho body để CSS áp dụng (nếu cần)
  $('body').addClass('part5-only');

  // Đánh dấu nút part 5 là active
  $('[id^=btnPart]').removeClass('active');
  $('#btnPart5').addClass('active');

  // Hiện các nút số cho part 5 nếu có
  $('.numberButtonsContainer').removeClass('show');
  $('#numberButtonsContainer5').addClass('show');

  // Đổi tiêu đề nếu cần
  // $('.question h3').text('Questions 25-30');
  // $('.question-type').text('For each question, write the correct answer. Write one word for each gap.');
});

// Sự kiện click các nút số 25-30
$('#numberButtonsContainer5 .btn-number').on('click', function () {
  // Hiện panel trái part 5, ẩn panel phải và divider
  $('.panel-content.left').hide();
  $('.panel-content.right').hide();
  $('.divider').hide();
  $('.panel-content.left[data-index="25"]').show();
  $('body').addClass('part5-only');

  // Lấy số câu
  var idx = $(this).data('index');

  // Focus vào input của câu đó
  setTimeout(function() {
    $('input[name="q' + idx + '"]').focus();
  }, 0);

  // Đánh dấu nút số đang active (nếu cần)
  $('.btn-number').removeClass('active');
  $(this).addClass('active');
});

function resetPanels() {
  $('.divider').show(); // <-- Dòng này đảm bảo divider hiện lại
  $('.panel-content.left').hide();
  $('.panel-content.right').hide();
  $('body').removeClass('part5-only');
}
function restorePart5Inputs() {
  for (let i = 25; i <= 30; i++) {
    const savedAnswer = localStorage.getItem(`part5_q${i}`);
    if (savedAnswer !== null) {
      $(`#part5-q${i}`).val(savedAnswer);
    }
  }
}

// Gắn sự kiện cho mỗi ô input Part 5 để lưu nội dung khi gõ:
for (let i = 25; i <= 30; i++) {
  $(`#part5-q${i}`).on('input', function() {
    localStorage.setItem(`part5_q${i}`, $(this).val());
  });
}

// Khi load trang, tự động khôi phục các ô input của Part 5:
$(document).ready(function() {
  restorePart5Inputs();
});
// Part 5
function showPart5Panel() {
  $('.panel-content.left').hide();
  $('.panel-content.right').hide();
  $('.divider').hide(); // Ẩn divider cho part 5
  $('.panel-content.left[data-index="25"]').show();
  $('body').addClass('part5-only');
  $('[id^=btnPart]').removeClass('active');
  $('#btnPart5').addClass('active');
  $('.numberButtonsContainer').removeClass('show');
  $('#numberButtonsContainer5').addClass('show');
  // $('.question h3').text('Questions 25-30');
  // $('.question-type').html('For each question, write the correct answer. Write <strong>one</strong> word for each gap.');

  // Sau khi hiển thị panel Part5, gọi hàm khôi phục nhập liệu:
  restorePart5Inputs();
}
$('#btnPart5').on('click', showPart5Panel);
$('#numberButtonsContainer5 .btn-number').on('click', showPart5Panel);

// Part 1-4 (ví dụ Part 1)
$('#btnPart1').on('click', function () {
  resetPanels();
  $('.panel-content.left[data-index="1"]').show();
  $('.panel-content.right[data-index="1"]').show();
  // ...các lệnh khác...
  
});
//part 6
$('#btnPart6').on('click', function () {
  resetPanels();
  $('.panel-content.left[data-index="31"]').show();
  $('.panel-content.right[data-index="31"]').show();
  $('.divider').show(); // Hiện lại thanh resize  
  $('body').removeClass('part5-only');
  $('[id^=btnPart]').removeClass('active');
  $('#btnPart6').addClass('active');
  $('.numberButtonsContainer').removeClass('show');
  $('#numberButtonsContainer6').addClass('show');
  // Đổi tiêu đề câu hỏi
  //    $('.question h3').text('Questions 31');
  // $('.question-type').text('');
});

// Tương tự cho các part khác và các nút số
$('#btnPart1, #btnPart2, #btnPart3, #btnPart4, #btnPart6, #btnPart7').on('click', function () {
  $('.divider').show(); // Hiện lại thanh resize
  // $('.panel-content.right').show();
  $('body').removeClass('part5-only');
  // ... các lệnh show/hide panel khác ...
});
// Xử lý sự kiện nhập liệu cho phần viết Part 6
$('#writing-part6-answer').on('input', function() {
  const text = $(this).val();
  localStorage.setItem('writing_part6_answer', text);
  // Đếm từ
  const count = text.trim() ? text.trim().split(/\s+/).length : 0;
  $('#writing-part6-wordcount').text(count);
});
  
  // Khôi phục đáp án đã lưu cho phần viết Part 6
$(document).ready(function() {
  const saved = localStorage.getItem('writing_part6_answer');
  if (saved !== null) {
    $('#writing-part6-answer').val(saved);
    
    // Đếm từ khi khôi phục
    const count = saved.trim() ? saved.trim().split(/\s+/).length : 0;
    $('#writing-part6-wordcount').text(count);
    }
});


//Part 7
$('#btnPart7').on('click', function () {
  resetPanels();
  $('.panel-content.left[data-index="32"]').show();
  $('.panel-content.right[data-index="32"]').show();
  $('.divider').show(); // Hiện lại thanh resize
  $('body').removeClass('part5-only');
  $('[id^=btnPart]').removeClass('active');
  $('#btnPart7').addClass('active');
  $('.numberButtonsContainer').removeClass('show');
  $('#numberButtonsContainer7').addClass('show');
  // Đổi tiêu đề câu hỏi
  // $('.question h3').text('Questions 32');
  // $('.question-type').text('');
});

// Xử lý sự kiện nhập liệu cho phần viết Part 7
$('#writing-part7-answer').on('input', function() {
  const text7 = $(this).val();
  localStorage.setItem('writing_part7_answer', text7);

  // Đếm từ realtime
  const count7 = text7.trim() ? text7.trim().split(/\s+/).length : 0;
  $('#writing-part7-wordcount').text(count7);
});

// Khi load trang, khôi phục nội dung đã lưu cho phần viết Part 7
$(document).ready(function() {
  const saved7 = localStorage.getItem('writing_part7_answer');
  if (saved7 !== null) {
    $('#writing-part7-answer').val(saved7);

    // Đếm từ khi khôi phục
    const count7 = saved7.trim() ? saved7.trim().split(/\s+/).length : 0;
    $('#writing-part7-wordcount').text(count7);
  } else {
    $('#writing-part7-wordcount').text(0);
  }
});
$('#submitBtn').on('click', function() {
  // ...xử lý nộp bài...

  localStorage.removeItem('writing_part6_answer');
  localStorage.removeItem('writing_part7_answer');

});

function onTimeUp() {
  // ...xử lý hết giờ...

  localStorage.removeItem('writing_part6_answer');
  localStorage.removeItem('writing_part7_answer');
}

const txtContent = `Name: ${userName}\nPhone: ${userPhone}\nTime: ${time}\nScore: ${score}/${total}\nAnswers:\n` +
  Object.keys(answersObj || {}).map(idx => `Q${idx}: ${answersObj[idx]}`).join('\n');

attachments.push({
  filename: 'result.txt',
  content: txtContent
});



