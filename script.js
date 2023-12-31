let bars1 = document.querySelector('.bars1');
let bars2 = document.querySelector('.bars2');
let bars3 = document.querySelector('.bars3');
let burger = document.querySelector('.burger');
let sidebarSci = document.querySelector('.sidebarSci')
let sidebar = document.querySelector('.sidebar')
let navbar = document.querySelector('.navbar')
let sidebarCard1 = document.querySelector('.card1')

burger.addEventListener('click', function () {
    bars1.classList.toggle('change')
    bars2.classList.toggle('change')
    bars3.classList.toggle('change')
    sidebarSci.classList.toggle('change')
    sidebar.classList.toggle('change')
    navbar.classList.toggle('change')
    sidebarCard1.classList.add('active')
});

let swiper = new Swiper(".mySwiper",{
    slidesPerView:"auto",
    spaceBetween:30,
    loop:true,
    centeredSlides:true,
    autoplay:{
        delay:2000,
        disbledonInteraction:true,
    },
    
})

var crsr = document.querySelector("#cursor");
var blur = document.querySelector("#cursor-blur");

document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + "px";
  crsr.style.top = dets.y + "px";
  blur.style.left = dets.x - 250 + "px";
  blur.style.top = dets.y - 250 + "px";
});


// Typed JS
var typed = new Typed("#typed1", {
    strings: ["Web Developer"],
    typeSpeed: 70,
    startDelay: 90,
    loop: true
});

var typed = new Typed("#typed2", {
    strings: ["Task Jokey"],
    typeSpeed: 70,
    startDelay: 90,
    loop: true
});




(function(){

	"use strict";
	
	$(".tabs").each(function(){
		var tabs = $(this);
		var panes = tabs.find(".tab-pane");

		var nav = tabs.find(".tabs-nav button");
		
		nav.click(function(e){
			e.preventDefault();
			var target = $(this).val();
			var tab = tabs.find(".tab-pane#"+target);
			nav.removeClass("active");
			panes.removeClass("active");
			tab.addClass("active");
			$(this).addClass("active");
		});
		
		var mobileLayout = function() {
			tabs.removeClass("wrapped");
			var nav_top = false;
			var wrapped = false;
			$.each(nav, function(){
				var this_top = $(this).offset().top;
				if(nav_top && nav_top != this_top) {
					wrapped = true;
					return false;
				}
				nav_top = this_top;
			});
			
			console.log(wrapped);
			
			if(wrapped) {
				tabs.addClass("wrapped");
			} else {
				tabs.removeClass("wrapped");
			}
		};
		
		mobileLayout();
		$(window).resize(function(){
			mobileLayout();
		});
	});

})();



var radius = 130; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 50; // width of images (unit: px)
var imgHeight = 50; // height of images (unit: px)


// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// add background music
if (bgMusicURL) {
  document.getElementById('music-container').innerHTML += `
<audio src="${bgMusicURL}" ${bgMusicControls? 'controls': ''} autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`;
}

// setup events
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function(e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};


