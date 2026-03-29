// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  FixedAnime(); /* スクロール途中からヘッダーを出現させる関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  FixedAnime(); /* スクロール途中からヘッダーを出現させる関数を呼ぶ*/
});

/**
 * ページ内リンク
 */
 jQuery(function ($) {
  $('a[href^="#"]').click(function () {
    var adjust = 0;
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top + adjust;
    $("body,html").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});
