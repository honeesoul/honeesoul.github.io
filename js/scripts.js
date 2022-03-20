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

    thumbImgs[1] = `images/thumbnail/14.jpg`;
    thumbImgs[2] = `images/thumbnail/15.jpg`;
    thumbImgs[3] = `images/thumbnail/16.jpg`;
    thumbImgs[4] = `images/thumbnail/17.jpg`;

    thumbImgs[5] = `images/thumbnail/18.jpg`;
    thumbImgs[6] = `images/thumbnail/9.jpg`;
    thumbImgs[7] = `images/thumbnail/10.jpg`;
    thumbImgs[8] = `images/thumbnail/11.jpg`;

    thumbImgs[9] = `images/thumbnail/19.jpg`;
    thumbImgs[10] = `images/thumbnail/12.jpg`;
    thumbImgs[11] = `images/thumbnail/13.jpg`;
    thumbImgs[12] = `images/thumbnail/20.jpg`;

    thumbImgs[13] = `images/thumbnail/4.jpg`;
    thumbImgs[14] = `images/thumbnail/1.jpg`;
    thumbImgs[15] = `images/thumbnail/3.jpg`;
    thumbImgs[16] = `images/thumbnail/2.jpg`;

    thumbImgs[17] = `images/thumbnail/6.jpg`;
    thumbImgs[18] = `images/thumbnail/7.jpg`;
    thumbImgs[19] = `images/thumbnail/8.jpg`;
    thumbImgs[20] = `images/thumbnail/5.jpg`;

    thumbImgs[21] = `images/thumbnail/23.jpg`;
    thumbImgs[22] = `images/thumbnail/22.jpg`;
    thumbImgs[23] = `images/thumbnail/24.jpg`;
    thumbImgs[24] = `images/thumbnail/25.jpg`;

    thumbImgs[25] = `images/thumbnail/21.jpg`;
    thumbImgs[26] = `images/thumbnail/26.jpg`;
    thumbImgs[27] = `images/thumbnail/27.jpg`;
    thumbImgs[28] = `images/thumbnail/28.jpg`;


    // for (var i = 0; i < albumImgCount; i++) {
    //     thumbImgs[i+1] = `images/thumbnail/${i+1}.jpg`;
    // }

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

    modalImgs[1] = `images/gallery/14.jpg`;
    modalImgs[2] = `images/gallery/15.jpg`;
    modalImgs[3] = `images/gallery/16.jpg`;
    modalImgs[4] = `images/gallery/17.jpg`;

    modalImgs[5] = `images/gallery/18.jpg`;
    modalImgs[6] = `images/gallery/9.jpg`;
    modalImgs[7] = `images/gallery/10.jpg`;
    modalImgs[8] = `images/gallery/11.jpg`;

    modalImgs[9] = `images/gallery/19.jpg`;
    modalImgs[10] = `images/gallery/12.jpg`;
    modalImgs[11] = `images/gallery/13.jpg`;
    modalImgs[12] = `images/gallery/20.jpg`;

    modalImgs[13] = `images/gallery/4.jpg`;
    modalImgs[14] = `images/gallery/1.jpg`;
    modalImgs[15] = `images/gallery/3.jpg`;
    modalImgs[16] = `images/gallery/2.jpg`;

    modalImgs[17] = `images/gallery/6.jpg`;
    modalImgs[18] = `images/gallery/7.jpg`;
    modalImgs[19] = `images/gallery/8.jpg`;
    modalImgs[20] = `images/gallery/5.jpg`;

    modalImgs[21] = `images/gallery/23.jpg`;
    modalImgs[22] = `images/gallery/22.jpg`;
    modalImgs[23] = `images/gallery/24.jpg`;
    modalImgs[24] = `images/gallery/25.jpg`;

    modalImgs[25] = `images/gallery/21.jpg`;
    modalImgs[26] = `images/gallery/26.jpg`;
    modalImgs[27] = `images/gallery/27.jpg`;
    modalImgs[28] = `images/gallery/28.jpg`;

    // for (var i = 0; i < albumImgCount; i++) {
    //     modalImgs[i+1] = `images/gallery/${i+1}.jpg`;
    // }

    return modalImgs;
}