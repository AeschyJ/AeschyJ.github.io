$(document).ready(startPage);

var count = 0;
var usingcount = 0;
var dif = 1;
var time;
var alar = 4;
var lose = 0;
var tp = 40;
var bt = 40;
var lf = 40;
var rt = 40;
var strdif;

function startPage() {
  count = count;
  $("body").css("background-color", "#6b9ca2");
  $(".container").empty();

  $baner = $("<h1>").css("margin-top", "30vh");
  $baner
    .text("Click On！")
    .attr("data-aos", "fade-up")
    .attr("data-aos-duration", "1000");
  $(".container").append($baner);

  $baner = $("<p>");
  $baner
    .text("追上移動中的按鈕吧！")
    .attr("data-aos", "flip-left")
    .attr("data-aos-duration", "800")
    .attr("data-aos-delay", "500");
  $(".container").append($baner);

  $incol = $("<div>").addClass("col-auto");
  $inplab = $("<label>")
    .addClass("col-form-label")
    .attr("for", "times")
    .text("設定次數：");
  $incol.append($inplab);
  $inp = $("<div>")
    .addClass("row align-items-center")
    .attr("data-aos", "fade-up")
    .attr("data-aos-duration", "1000")
    .attr("data-aos-delay", "1000")
    .append($incol);

  $incol = $("<div>").addClass("col-auto");
  $inpf = $("<input>")
    .addClass("col-form-label")
    .css("width", "30vw")
    .css("min-width", "100px")
    .attr("id", "times")
    .attr("aria-describedby", "passwordHelpInline");
  if (count != 0) {
    $inpf.attr("placeholder", count);
  }
  $incol.append($inpf);
  $inp.append($incol);

  $incol = $("<div>").addClass("col-auto mx-auto");
  $inpse = $(
    '<select class="form-select" aria-label="Default select example" style="width:30vw;min-width:250px">'
  )
    .append('<option selected value="1">選擇難度(預設:簡單)</option>')
    .append('<option value="1">簡單</option>')
    .append('<option value="2">中等</option>')
    .append('<option value="3">困難</option>');
  $incol.append($inpse);
  $inp.append($incol);
  $(".container").append($inp);

  $(".container").append("<br>");
  $but = $("<button>")
    .addClass("btn btn-primary my-3")
    .text("確認")
    .attr("type", "button")
    .attr("data-aos", "flip-up")
    .attr("data-aos-duration", "600")
    .attr("data-aos-delay", "2000")
    .click(check);
  $(".container").append($but);
}

function check() {
  if ($("#times").val() != "" && !(typeof $("#times").val() === "undefined")) {
    count = $("#times").val();
  }
  if (count == "" || isNaN(Number(count))) {
    alert("請輸入次數");
  } else if (Number(count) < 1 || Math.floor(Number(count)) != Number(count)) {
    alert("需輸入正整數\n" + "你的輸入: " + count);
  } else {
    count = Number(count);
    usingcount = count;

    if (
      $("option:selected").val() != "" &&
      !(typeof $("option:selected").val() === "undefined")
    ) {
      dif = Number($("option:selected").val());
    }
    if (dif == 2) {
      alar = 3;
    } else if (dif == 3) {
      alar = 2;
    } else {
      alar = 4;
    }
    switch (dif) {
      case 1:
        strdif = "簡單";
        break;
      case 2:
        strdif = "中等";
        break;
      case 3:
        strdif = "困難";
        break;
    }

    $("body").css("background-color", "#6b9ca2");
    $(".container").empty();

    $baner = $("<h2>").css("margin-top", "30vh");
    $baner.text("即將開始...");
    $(".container").append($baner);

    $baner = $("<p>");
    $baner.text("遊戲將在進入3秒後開始");
    $(".container").append($baner);

    $baner = $("<p>");
    $baner.text("難度: " + strdif + ", 點擊次數：" + count);
    $(".container").append($baner);

    $but = $("<button>")
      .addClass("btn btn-primary my-3 mx-3")
      .text("確認")
      .attr("type", "button")
      .attr("data-aos", "flip-down")
      .attr("data-aos-duration", "700")
      .attr("data-aos-delay", "500")
      .click(play);
    $(".container").append($but);

    $but = $("<button>")
      .addClass("btn btn-primary my-3 mx-3")
      .text("重設")
      .attr("type", "button")
      .attr("data-aos", "flip-down")
      .attr("data-aos-duration", "700")
      .attr("data-aos-delay", "1200")
      .click(startPage);
    $(".container").append($but);
  }
}

function play() {
  $("body").css("background-color", "black");
  $(".container").empty();

  $counts = $('<button type="button"></button>')
    .text(count)
    .addClass("btn btn-primary")
    .attr("id", "countBut")
    .css("padding-inline", "50px")
    .css("padding-block", "10px")
    .css("font-size", "25px")
    .css("position", "absolute")
    .css("top", "50%")
    .css("left", "50%")
    .css("transform", "translate(-50%,-50%)")
    .attr("type", "button")
    .attr("data-aos", "fade-up")
    .attr("data-aos-duration", "500")
    .attr("data-aos-delay", "500")
    .prop("disabled", true)
    .click(minus)
    .click(move);
  $(".container").append($counts);

  $timer = $("<div>")
    .addClass("border border-white border-rounded")
    .addClass("position-fixed bottom-0 start-50")
    .css("transform", "translate(-50%,0)")
    .addClass("px-3 bg-light")
    .text("剩餘時間: wait");
  $(".container").append($timer);

  setTimeout(function () {
    tStart();
    $("#countBut").prop("disabled", false);
  }, 3000);
}

function minus() {
  usingcount--;
  tStart();
  $counts.text(usingcount);
  $color = "";
  if ($counts.hasClass("btn-primary")) {
    $color = "btn-primary";
    $counts.removeClass("btn-primary").addClass("btn-secondary");
  } else if ($counts.hasClass("btn-secondary")) {
    $color = "btn-secondary";
    $counts.removeClass("btn-secondary").addClass("btn-success");
  } else if ($counts.hasClass("btn-success")) {
    $color = "btn-successy";
    $counts.removeClass("btn-success").addClass("btn-danger");
  } else if ($counts.hasClass("btn-danger")) {
    $color = "btn-danger";
    $counts.removeClass("btn-danger").addClass("btn-warning");
  } else if ($counts.hasClass("btn-warning")) {
    $color = "btn-warning";
    $counts.removeClass("btn-warning").addClass("btn-info");
  } else {
    $color = "btn-info";
    $counts.removeClass("btn-info").addClass("btn-primary");
  }
  if (usingcount == 0) {
    tStop();
    cong();
  }
}

function tStart() {
  $("#countBut")
    .removeAttr("data-aos")
    .removeAttr("data-aos-duration")
    .removeAttr("data-aos-delay");

  lose = 0;
  clearInterval(time);
  time = setInterval(counting, 1000);
  $(".position-fixed").text("剩餘時間: " + (alar - lose));
}

function tStop() {
  lose = 0;
  clearInterval(time);
}

function counting() {
  lose++;
  $(".position-fixed").text("剩餘時間: " + (alar - lose));
  if (alar - lose == 0) {
    tStop();
    loser();
  }
}

function loser() {
  $("body").css("background-color", "#ca2020");
  $(".container").empty();

  $baner = $("<h1>").css("margin-top", "35vh");
  $baner
    .text("You Lose!")
    .attr("data-aos", "zoom-out")
    .attr("data-aos-duration", "1000");
  $(".container").append($baner);

  $baner = $("<p>");
  $baner
    .text(
      "你在" +
        strdif +
        "難度下，點擊了" +
        (count - usingcount) +
        "次按鈕\n距離目標還差" +
        usingcount +
        "次"
    )
    .attr("data-aos", "fade-right")
    .attr("data-aos-duration", "500")
    .attr("data-aos-delay", "1000");
  $(".container").append($baner);

  $start = $("<button>")
    .addClass("btn btn-primary my-3")
    .text("回首頁")
    .attr("type", "button")
    .attr("data-aos", "fade-up")
    .attr("data-aos-duration", "500")
    .attr("data-aos-delay", "1500")
    .click(startPage);
  $(".container").append($start);

  $(".container").append("<br>");
  $but = $("<button>")
    .addClass("btn btn-primary my-3")
    .text("再試一次")
    .attr("type", "button")
    .attr("data-aos", "fade-up")
    .attr("data-aos-duration", "500")
    .attr("data-aos-delay", "1500")
    .click(check);
  $(".container").append($but);
}

function cong() {
  $("body").css("background-color", "#fffe00");
  $(".container").empty();

  $baner = $("<h1>").css("margin-top", "35vh");
  $baner
    .text("Congratulations!")
    .attr("data-aos", "zoom-in")
    .attr("data-aos-duration", "1000");
  $(".container").append($baner);

  $baner = $("<p>");
  $baner
    .text("你在" + strdif + "難度下，成功點擊了" + count + "次按鈕")
    .attr("data-aos", "fade-right")
    .attr("data-aos-duration", "500")
    .attr("data-aos-delay", "1000");
  $(".container").append($baner);

  $start = $("<button>")
    .addClass("btn btn-primary my-3")
    .text("回首頁")
    .attr("type", "button")
    .attr("data-aos", "fade-up")
    .attr("data-aos-duration", "500")
    .attr("data-aos-delay", "1000")
    .click(startPage);
  $(".container").append($start);

  $(".container").append("<br>");
  $but = $("<button>")
    .addClass("btn btn-primary my-3")
    .text("再玩一次")
    .attr("type", "button")
    .attr("data-aos", "fade-up")
    .attr("data-aos-duration", "500")
    .attr("data-aos-delay", "1000")
    .click(check);
  $(".container").append($but);
}
function move() {
  let x = getRandomInt(-lf, rt);
  let y = getRandomInt(-bt, tp);
  let moving = anime({
    targets: "#countBut",
    translateX: x + "vw",
    translateY: y + "vh",
    duration: 400,
    easing: "linear",
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
