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
      $('.panel-content.right[data-index="' + idx + '"]').show();
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
});

function finishExam() {
  let score = 0;
  questions.forEach(q => {
    if (userAnswers[q.index] === q.answer) {
      score += 1;
    }
  });

  // Lấy thông tin user
  const userName = localStorage.getItem('userName') || '';
  const userPhone = localStorage.getItem('userPhone') || '';

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
  questions.forEach(q => {
    doc.text(
      `Q${q.index}: Your answer: ${userAnswers[q.index] || '-'} | Correct: ${q.answer}`,
      10, y
    );
    y += 10;
  });

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
  setTimeout(function() {
    window.location.href = '/login';
  }, 1500); // Đợi 1.5s cho user xem popup điểm
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

$(document).on('mouseup touchend', function() {
  if (isResizing) {
    isResizing = false;
    $('body').removeClass('resizing');
  }
});

$(window).on('resize', function() {
  $('#leftPane, #rightPane').css('width', '');
});

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
});

// Resize dọc cho mobile
function isMobile() {
  return window.innerWidth <= 480;
}

let isResizingVertical = false;
let startY = 0;
let startTopHeight = 0;

$('.divider').on('mousedown touchstart', function(e) {
  if (!isMobile()) return;
  isResizingVertical = true;
  startY = e.pageY || (e.originalEvent.touches && e.originalEvent.touches[0].pageY);
  startTopHeight = $('#leftPane').height();
  $('body').addClass('resizing');
  e.preventDefault();
});

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

$(document).on('mouseup touchend', function() {
  if (isResizingVertical) {
    isResizingVertical = false;
    $('body').removeClass('resizing');
  }
});

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

// Khôi phục đáp án đã chọn cho bảng 7-13
function restoreMultiQuestionAnswers() {
  for (let i = 7; i <= 13; i++) {
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
    if (idx >= 7 && idx <= 13) {
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

  // Khôi phục đáp án đã chọn cho bảng 7-13
  restoreMultiQuestionAnswers();
});

let examTimerInterval = null;
function startExamTimer() {
  // Ghi lại thời gian bắt đầu
  localStorage.setItem('examStartTime', Date.now().toString());
  runExamTimer();
}

function runExamTimer() {
  let startTime = parseInt(localStorage.getItem('examStartTime'), 10);
  let duration = 60 * 60; // 60 phút (giây)
  let elapsed = Math.floor((Date.now() - startTime) / 1000);
  let remain = duration - elapsed;
  if (remain < 0) remain = 0;

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
function updateTimerDisplay(seconds) {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  $('#exam-timer').text((m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s);
};