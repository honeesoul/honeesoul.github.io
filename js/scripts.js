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


// album
var dAlbumHolder = document.getElementById('album-holder');
var lastAlbumImgIdx = 0;

for (var i = 0; i < albumImgCount; i++) {
    var thumbImgs = thumbImgLinks();

    dAlbumHolder.innerHTML += `        
    <a class="col-sm-3 col-3 p-1" data-bs-toggle="modal" data-bs-target="#modal-album" data-bs-slide-to="${i}">
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
        thumbImgs[i+1] = `images/gallery/${i+1}.jpg`;
    }

    return thumbImgs;
}

var dModalHolder = document.getElementById('modal-holder');
for (var i = 0; i < albumImgCount; i++) {
    var modalImgs = modalImgLinks();

    dModalHolder.innerHTML += `        
    <div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-dismiss="modal">
        <img class="modal-img lazy" data-src="${modalImgs[i+1]}" id="modal-img-${i+1}">
    </div>
    `;
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

///
// modal img load
var lazyloadmodal = document.querySelector("#modal-album");
lazyloadmodal.addEventListener('show.bs.modal', function() {
    loadModalImg();
});

var myCarousel = document.querySelector('#album-ctrls')
myCarousel.addEventListener('slid.bs.carousel', function() {
    loadModalImg();
})

function loadModalImg() {
    var lazyloadImages = lazyloadmodal.querySelectorAll("img.modal-img");
    var prevImg;
    var nextImg;
    lazyloadImages.forEach(function(img) {
        if (img.parentElement.classList.contains('active')) {
            if (img.classList.contains('lazy')) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            }

            prevImg = document.querySelector("#modal-img-" + (Number(img.id.replace("modal-img-", "")) - 1))
            nextImg = document.querySelector("#modal-img-" + (Number(img.id.replace("modal-img-", "")) + 1))
        }
    })
    if (prevImg != null && prevImg.classList.contains('lazy')) {
        prevImg.src = prevImg.dataset.src;
        prevImg.classList.remove('lazy');
    }

    if (nextImg != null && nextImg.classList.contains('lazy')) {
        nextImg.src = nextImg.dataset.src;
        nextImg.classList.remove('lazy');
    }
}
///


var myCarousel = document.querySelector('#album-ctrls')
var myModalEl = document.getElementById('modal-album')

myModalEl.addEventListener('show.bs.modal', function(event) {
    const trigger = event.relatedTarget
    var bsCarousel = bootstrap.Carousel.getInstance(myCarousel)
    bsCarousel.to(trigger.dataset.bsSlideTo)
})



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

function modalImgLinks() {
    var modalImgs = {};

    for (var i = 0; i < albumImgCount; i++) {
        modalImgs[i+1] = `images/gallery/${i+1}.jpg`;
    }

    return modalImgs;
}