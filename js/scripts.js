const useGoogleDrive = true;
const albumImgCount = 28;

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

setScreenSize();

function setScreenSize() {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
};
  
var dAlbumHolder = document.getElementById('album-holder');
var lastAlbumImgIdx = 0;

for (var i = 0; i < albumImgCount-1; i++) {
    var thumbImgs = thumbImgLinks();

    dAlbumHolder.innerHTML += `        
    <a class="col-sm-4 col-4 p-3" data-bs-toggle="modal" data-bs-target="#modal-album" data-bs-slide-to="${i}">
        <div class="square">
            <img class="thumbnail lazy wow fadeIn" data-src="${thumbImgs[i+1]}" alt="">
        </div>
    </a>
    `;
    lastAlbumImgIdx = i;
}

function thumbImgLinks() {
    var thumbImgs = {};

    for (var i = 0; i < albumImgCount; i++) {
        thumbImgs[i] = `images/gallery/${i+1}.jpg`;
    }

    return thumbImgs;
}

// Lazy
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img.lazy.thumbnail");
    var lazyloadThrottleTimeout;

    function lazyload() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function() {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) {
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            });
            if (lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

var mybutton = document.getElementById("topBtn");

window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        mybutton.classList.add('d-inline-flex');
        mybutton.classList.remove('d-none');
    } else {
        mybutton.classList.remove('d-inline-flex');
        mybutton.classList.add('d-none');
    }
}