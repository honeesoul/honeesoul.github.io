
// 디데이
var dDayholder = document.getElementById("d-day-holder");
var count = new Date().getTime();
var dday = new Date("2022-04-24T00:00:00").getTime();
var gap = dday - count;
var dday_text = "";
if (gap < 0) {
    dday_text = Math.abs(Math.ceil(gap / (1000 * 60 * 60 * 24))) + "일 지났습니다.";
}else{
    dday_text = Math.ceil(gap / (1000 * 60 * 60 * 24)) + "일 남았습니다.";
}

dDayholder.append(dday_text);


