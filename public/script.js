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

$('#btnCheck').off('click').on('click', function () {
  let score = 0;
  questions.forEach(q => {
    if (userAnswers[q.index] === q.answer) {
      score += 1;
    }
  });
  // Tạo popup đơn giản
  if ($('#popin-submit').length) return; // tránh tạo nhiều lần
  $('body').append(`
    <div id="popin-submit" style="
      position:fixed;top:0;left:0;right:0;bottom:0;
      background:rgba(0,0,0,0.3);z-index:2000;display:flex;align-items:center;justify-content:center;">
      <div style="
        background:#fff;padding:32px 24px;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.18);min-width:220px;text-align:center;">
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
});

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
  // Đánh dấu nút đang active
  $('.btn-number').removeClass('active');
  $(this).addClass('active');
  // Hiện đúng panel
  $('.panel-content.left').hide();
  $('.panel-content.left[data-index="' + idx + '"]').show();
  $('.panel-content.right').hide();
  $('.panel-content.right[data-index="' + idx + '"]').show();
  // Đổi tiêu đề theo Part (nếu muốn)
  let partNum = $(this).closest('.numberButtonsContainer').index() + 1;
  // ... (bạn có thể thêm code đổi tiêu đề ở đây nếu cần)
});

// Hiển thị panel đầu tiên khi load trang
$(document).ready(function() {
  // Lấy chỉ số đầu tiên (ví dụ là 1)
  var firstIdx = $('.btn-number').first().data('index');
  $('.panel-content.left').hide();
  $('.panel-content.left[data-index="' + firstIdx + '"]').show();
  $('.panel-content.right').hide();
  $('.panel-content.right[data-index="' + firstIdx + '"]').show();
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
});
// Xử lý sự kiện chọn đáp án
// Lưu đáp án người dùng vào biến userAnswers
$(document).on('change', '.question-options input[type="radio"]', function() {
  const idx = $(this).attr('name').replace('q', '');
  userAnswers[idx] = $(this).val();
});
// Lưu đáp án người dùng vào biến userAnswers


$('.question-options input[type="radio"]').on('change', function() {
  const idx = $(this).attr('name').replace('q', '');
  userAnswers[idx] = $(this).val();
});

