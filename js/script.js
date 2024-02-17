// ローディング
const loading = document.getElementById('loading');

function animation() {
  loading.classList.add('loaded');
}
window.addEventListener('load', animation);


//ハンバーガーメニュー
$(function () {
  //--------------------------------------------
  const $trigger = $('#hamburger');
  const $nav = $('#spmenu');
  const point_header = window.matchMedia('screen and (min-width: 768px)');

  $trigger.on('click', function () {
      const expanded = $(this).attr('aria-expanded');
      if (expanded === 'false') {
          openMenu();
      } else {
          closeMenu();
      }
  });

  function openMenu() {
      $trigger.attr('aria-expanded', true).attr('aria-label', 'メニューを閉じる');
      $nav.attr('aria-hidden', false).fadeIn();
  }
  function closeMenu() {
      $trigger.attr('aria-expanded', false).attr('aria-label', 'メニューを開ける');
      $nav.attr('aria-hidden', true).fadeOut();
  }
  // //ブレイクポイントをまたいだときの挙動
  function checkBreakPoint() {
      if (point_header.matches) {
          closeMenu();
      }
  }
  // SPメニューのリンクをクリックしたらページを閉じる
  $(".spmenu_item a").on("click", function () {
      closeMenu();
  });


  //コンタクトのエラーメッセージ
  //--------------------------------------------
  $('input,textarea').each(function () {
      $(this).on('change', function () {
          if ($(this).is(':invalid')) {
              $(this).parents('.contact_container').addClass('is-error');
              $(this).parents('.contact_container').find('.error-text').attr('aria-hidden', false);
          } else {
              $(this).parents('.contact_container').removeClass('is-error');
              $(this).parents('.contact_container').find('.error-text').attr('aria-hidden', true);
          }
      });
  });

  $('#submit').on('click', function () {
      $('input,textarea').each(function () {
          if ($(this).is(':invalid')) {
              $(this).parents('.contact_container').addClass('is-error');
              $(this).parents('.contact_container').find('.error-text').attr('aria-hidden', false);

          } else {
              $(this).parents('.contact_container').removeClass('is-error');
              $(this).parents('.contact_container').find('.error-text').attr('aria-hidden', true);
          }
      });
  });


  //コンタクト
  //--------------------------------------------

  $(document).ready(function () {

      $('#form').submit(function (event) {
          var formData = $('#form').serialize();
          $.ajax({
              url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLScOiGR01os6IFoUDUj9vx0TIaMRtNeM7y-Wi6v4BHvLB86aQA/formResponse",
              data: formData,
              type: "POST",
              dataType: "xml",
              statusCode: {
                  0: function () {
                      $(".end-message").slideDown();
                      $(".btn").fadeOut();
                      $(".btn-center").fadeOut();
                      window.location.href = "thanks.html";
                  },
                  200: function () {
                      $(".false-message").slideDown();
                  }
              }
          });
          event.preventDefault();
      });

  });

  //form-desabled
  //--------------------------------------------
  $(function () {
      $(document).on('input', function () {
          var flg1 = $('[required]:is([type=text],[type=tel],[type=email],textarea)').is(function () { return $(this).val() == ""; });
          var flg2 = !$(':radio[required]:checked').val();
          $('#submit').prop('disabled', flg1 || flg2);
      });
  });


  //スクロール時にふわっとさせる
  //--------------------------------------------
  $(function () {
      $(window).scroll(function () {
          const windowHeight = $(window).height();
          const scroll = $(window).scrollTop();

          $('.element').each(function () {
              const targetPosition = $(this).offset().top;
              if (scroll > targetPosition - windowHeight + 150) {
                  $(this).addClass("is-fadein");
              }
          });
      });
  });

  //スワイパー
  //--------------------------------------------
  const mySwiper = new Swiper('.swiper', {
      loop: true,
      loopAdditionalSlides: 2,
      speed: 1000,
      autoplay: {
          delay: 4000,
          disableOnInteraction: false,
      },
      grabCursor: true,
      centeredSlides: true,
      breakpoints: {
          0: {
              slidesPerView: '1.5',
              spaceBetween: 24,
          },
          600: {
              slidesPerView: 'auto',
              spaceBetween: 24,
          },
      },

  });

  // アコーディオン
  //--------------------------------------------
  function accordion() {
      $('[aria-controls^="accordion"]').stop().on('click', function (e) {
          const $self = $(e.currentTarget);
          const expanded = $self.attr('aria-expanded');
          const $target = $('#' + $self.attr('aria-controls'));


          if (expanded === 'false') {
              $self.attr('aria-expanded', true);
              $target.attr('aria-hidden', false).slideDown();
          } else {
              $self.attr('aria-expanded', false);
              $target.attr('aria-hidden', true).slideUp();
          }
      });
  }
  accordion();
});
