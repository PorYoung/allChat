'use strict';
//删除关于圆点切换的事件
//poryoung:修改52行及next和prev方法中this.length为this.images.length
//poryoung:修改41行通过标签img获取为通过类名获取
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  More about this function - 
  https://codepen.io/rachsmith/post/animation-tip-lerp
*/
function lerp(_ref, _ref2) {
  var x = _ref.x;
  var y = _ref.y;
  var targetX = _ref2.x;
  var targetY = _ref2.y;

  var fraction = 0.2;

  x += (targetX - x) * fraction;
  y += (targetY - y) * fraction;

  return { x: x, y: y };
}

var Slider = function () {
  function Slider(el) {
    _classCallCheck(this, Slider);

    var imgClass = this.IMG_CLASS = 'slider__images-item';
    var textClass = this.TEXT_CLASS = 'slider__text-item';
    var activeImgClass = this.ACTIVE_IMG_CLASS = imgClass + '--active';
    var activeTextClass = this.ACTIVE_TEXT_CLASS = textClass + '--active';

    this.el = el;
    this.contentEl = document.getElementById('slider-content');
    this.onMouseMove = this.onMouseMove.bind(this);

    // taking advantage of the live nature of 'getElement...' methods
    this.activeImg = el.getElementsByClassName(activeImgClass);
    this.activeText = el.getElementsByClassName(activeTextClass);
    this.images = el.getElementsByClassName(imgClass+'-img');
    document.getElementById('left').addEventListener('click', this.prev.bind(this));

    document.getElementById('right').addEventListener('click', this.next.bind(this));

    window.addEventListener('resize', this.onResize.bind(this));

    this.onResize();
    this.length = this.images.length;
    this.lastX = this.lastY = this.targetX = this.targetY = 0;
  }

  Slider.prototype.onResize = function onResize() {
    var htmlStyles = getComputedStyle(document.documentElement);
    var mobileBreakpoint = htmlStyles.getPropertyValue('--mobile-bkp');

    var isMobile = this.isMobile = matchMedia('only screen and (max-width: ' + mobileBreakpoint + ')').matches;

    this.halfWidth = innerWidth / 2;
    this.halfHeight = innerHeight / 2;
    this.zDistance = htmlStyles.getPropertyValue('--z-distance');

    if (!isMobile && !this.mouseWatched) {
      this.mouseWatched = true;
      this.el.addEventListener('mousemove', this.onMouseMove);
      this.el.style.setProperty('--img-prev', 'url(' + this.images[+this.activeImg[0].dataset.id - 1].src + ')');
      this.contentEl.style.setProperty('transform', 'translateZ(' + this.zDistance + ')');
    } else if (isMobile && this.mouseWatched) {
      this.mouseWatched = false;
      this.el.removeEventListener('mousemove', this.onMouseMove);
      this.contentEl.style.setProperty('transform', 'none');
    }
  };

  Slider.prototype.getMouseCoefficients = function getMouseCoefficients() {
    var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var pageX = _ref3.pageX;
    var pageY = _ref3.pageY;

    var halfWidth = this.halfWidth;
    var halfHeight = this.halfHeight;
    var xCoeff = ((pageX || this.targetX) - halfWidth) / halfWidth;
    var yCoeff = (halfHeight - (pageY || this.targetY)) / halfHeight;

    return { xCoeff: xCoeff, yCoeff: yCoeff };
  };

  Slider.prototype.onMouseMove = function onMouseMove(_ref4) {
    var pageX = _ref4.pageX;
    var pageY = _ref4.pageY;
    this.targetX = pageX;
    this.targetY = pageY;

    if (!this.animationRunning) {
      this.animationRunning = true;
      this.runAnimation();
    }
  };

  Slider.prototype.runAnimation = function runAnimation() {
    if (this.animationStopped) {
      this.animationRunning = false;
      return;
    }

    var maxX = 10;
    var maxY = 10;

    var newPos = lerp({
      x: this.lastX,
      y: this.lastY
    }, {
      x: this.targetX,
      y: this.targetY
    });

    var _getMouseCoefficients = this.getMouseCoefficients({
      pageX: newPos.x,
      pageY: newPos.y
    });

    var xCoeff = _getMouseCoefficients.xCoeff;
    var yCoeff = _getMouseCoefficients.yCoeff;

    this.lastX = newPos.x;
    this.lastY = newPos.y;

    this.positionImage({ xCoeff: xCoeff, yCoeff: yCoeff });

    this.contentEl.style.setProperty('transform', '\n      translateZ(' + this.zDistance + ')\n      rotateX(' + maxY * yCoeff + 'deg)\n      rotateY(' + maxX * xCoeff + 'deg)\n    ');

    if (this.reachedFinalPoint) {
      this.animationRunning = false;
    } else {
      requestAnimationFrame(this.runAnimation.bind(this));
    }
  };

  Slider.prototype.positionImage = function positionImage(_ref5) {
    var xCoeff = _ref5.xCoeff;
    var yCoeff = _ref5.yCoeff;
    var maxImgOffset = 1;
    var currentImage = this.activeImg[0].children[0];

    currentImage.style.setProperty('transform', '\n      translateX(' + maxImgOffset * -xCoeff + 'em)\n      translateY(' + maxImgOffset * yCoeff + 'em)\n    ');
  };

  Slider.prototype.transitionItem = function transitionItem(nextId) {
    var _this = this;

    function onImageTransitionEnd(e) {
      e.stopPropagation();

      nextImg.classList.remove(transitClass);

      self.inTransit = false;

      this.className = imgClass;
      this.removeEventListener('transitionend', onImageTransitionEnd);
    }

    var self = this;
    var el = this.el;
    var currentImg = this.activeImg[0];
    var currentId = currentImg.dataset.id;
    var imgClass = this.IMG_CLASS;
    var textClass = this.TEXT_CLASS;
    var activeImgClass = this.ACTIVE_IMG_CLASS;
    var activeTextClass = this.ACTIVE_TEXT_CLASS;
    var subActiveClass = imgClass + '--subactive';
    var transitClass = imgClass + '--transit';

    var nextImg = el.querySelector('.' + imgClass + '[data-id=\'' + nextId + '\']');
    var nextText = el.querySelector('.' + textClass + '[data-id=\'' + nextId + '\']');
    var outClass = '';
    var inClass = '';

    this.animationStopped = true;

    nextText.classList.add(activeTextClass);

    el.style.setProperty('--from-left', nextId);
    currentImg.classList.remove(activeImgClass);
    currentImg.classList.add(subActiveClass);
    if (currentId < nextId) {
      outClass = imgClass + '--next';
      inClass = imgClass + '--prev';
    } else {
      outClass = imgClass + '--prev';
      inClass = imgClass + '--next';
    }

    nextImg.classList.add(outClass);
    
    requestAnimationFrame(function () {
      nextImg.classList.add(transitClass, activeImgClass);
      nextImg.classList.remove(outClass);
      _this.animationStopped = false;
      _this.positionImage(_this.getMouseCoefficients());
      currentImg.classList.add(transitClass, inClass);
      currentImg.addEventListener('transitionend', onImageTransitionEnd);
    });

    if (!this.isMobile) this.switchBackgroundImage(nextId);
  };

  Slider.prototype.startTransition = function startTransition(nextId) {
    function onTextTransitionEnd(e) {
      if (!e.pseudoElement) {
        e.stopPropagation();

        requestAnimationFrame(function () {
          self.transitionItem(nextId);
        });

        this.removeEventListener('transitionend', onTextTransitionEnd);
      }
    }

    if (this.inTransit) return;

    var activeText = this.activeText[0];
    var backwardsClass = this.TEXT_CLASS + '--backwards';
    var self = this;

    this.inTransit = true;

    activeText.classList.add(backwardsClass);
    activeText.classList.remove(this.ACTIVE_TEXT_CLASS);
    activeText.addEventListener('transitionend', onTextTransitionEnd);

    requestAnimationFrame(function () {
      activeText.classList.remove(backwardsClass);
    });
  };

  Slider.prototype.next = function next() {
    if (this.inTransit) return;
    var nextId = +this.activeImg[0].dataset.id + 1;
    if (nextId > this.images.length) nextId = 1;
    if(nextId != this.activeImg[0].dataset.id)
      this.startTransition(nextId);
  };

  Slider.prototype.prev = function prev() {
    if (this.inTransit) return;
    var nextId = +this.activeImg[0].dataset.id - 1;
    if (nextId < 1) nextId = this.images.length;
    if(nextId != this.activeImg[0].dataset.id)
      this.startTransition(nextId);
  };

  Slider.prototype.switchBackgroundImage = function switchBackgroundImage(nextId) {
    function onBackgroundTransitionEnd(e) {
      if (e.target === this) {
        this.style.setProperty('--img-prev', imageUrl);
        this.classList.remove(bgClass);
        this.removeEventListener('transitionend', onBackgroundTransitionEnd);
      }
    }

    var bgClass = 'slider--bg-next';
    var el = this.el;
    var imageUrl = 'url(' + this.images[+nextId - 1].src + ')';

    el.style.setProperty('--img-next', imageUrl);
    el.addEventListener('transitionend', onBackgroundTransitionEnd);
    el.classList.add(bgClass);
  };

  _createClass(Slider, [{
    key: 'reachedFinalPoint',
    get: function get() {
      var lastX = ~ ~this.lastX;
      var lastY = ~ ~this.lastY;
      var targetX = this.targetX;
      var targetY = this.targetY;

      return (lastX == targetX || lastX - 1 == targetX || lastX + 1 == targetX) && (lastY == targetY || lastY - 1 == targetY || lastY + 1 == targetY);
    }
  }]);

  return Slider;
}();

var sliderEl = document.getElementById('slider');
var slider = new Slider(sliderEl);
// ------------------ Demo stuff ------------------------ //
var slideTimer = 0;
function autoSlide() {
  requestAnimationFrame(function () {
    slider.next();
  });
  slideTimer = setTimeout(autoSlide, 15000);
}
function stopAutoSlide() {
  clearTimeout(slideTimer);
}

// sliderEl.addEventListener('mousemove', stopAutoSlide);
// sliderEl.addEventListener('touchstart', stopAutoSlide);
// timer = setTimeout(autoSlide,15000);


/*****guests carousel ******/
var clearAlertGuestsInfoPanel = null
var bindGuestsCarousel = function () {
  var carousels = document.querySelectorAll('.guestsCarousel');
  for (var i = 0; i < carousels.length; i++) carousel(carousels[i]);
  $('.guestsCarousel').children('figure').children('img').on('click',function(){
      clearTimeout(guestsCarouselTimer)
      var html = `<div class="alertGuestsInfoPanel">
          <p><img src="${$(this).attr('src')}"></p>
          <p>Name:${$(this).attr('title')}</p>
          <p>Title:${$(this).attr('data-title')}</p>
          <p>cotent:${$(this).attr('data-content')}</p>
      </div>`
      clearAlertGuestsInfoPanel = myLoading("INFO:",html)
      $('.alertGuestsInfoPanel').parent().parent().removeAttr('style').parent().css({
          display:'flex',
          'justify-content':'center',
          'align-items':'center'
      })
      $('.alertGuestsInfoPanel').parent().parent().parent().on('click',function(){
          clearAlertGuestsInfoPanel()
          setGuestsTimeoutRotate()
      })
  })
}
var offGuestsCarousel = function(){
  var carousels = document.querySelectorAll('.guestsCarousel');
  for (var i = 0; i < carousels.length; i++) {
    var figure = carousels[i].querySelector('figure'),
        images = figure.querySelectorAll('img'),
        iEle = figure.querySelectorAll('i'),
        n = images.length
    figure.removeAttribute("style")
    for (var i = 0; i < n; i++) {
        images[i].removeAttribute("style")
        iEle[i].removeAttribute("style")
    }
    clearTimeout(guestsCarouselTimer)
    setGuestsTimeoutRotate = null
    guestsCarouselTimer = null
    $('.guestsCarousel').children('figure').children('img').off()
  }
}
var setGuestsTimeoutRotate = null;
var guestsCarouselTimer = null;
function carousel(root) {
  var figure = root.querySelector('figure'),
      images = figure.querySelectorAll('img'),
      tags = figure.querySelectorAll('i'),
      n = images.length,
      gap = root.dataset.gap || 0,
      bfc = 'bfc' in root.dataset,
      theta = 2 * Math.PI / n,
      currImage = 0;
  setupCarousel(n, parseFloat(getComputedStyle(document.querySelector('.wallCon')).width));
  window.addEventListener('resize', function () {
    setupCarousel(n, parseFloat(getComputedStyle(document.querySelector('.wallCon')).width));
  });
  function setupCarousel(n, s) {
    var apothem = s / (2 * Math.tan(Math.PI / n));
    figure.style.transformOrigin = '50% 50% ' + -apothem + 'px';

    for (var i = 0; i < n; i++) {
      images[i].style.padding = gap + 'px';
    }
    for (i = 1; i < n; i++) {
      images[i].style.transformOrigin = '50% 50% ' + -apothem + 'px';
      images[i].style.transform = 'rotateY(' + i * theta + 'rad)';
      tags[i].style.transformOrigin = '50% 50% ' + -apothem + 'px';
      tags[i].style.transform = 'rotateY(' + i * theta + 'rad)';
    }
    if (bfc) for (i = 0; i < n; i++) {
      images[i].style.backfaceVisibility = 'hidden';
    }
    rotateCarousel(currImage);
  }
  function rotateCarousel(imageIndex) {
    figure.style.transform = 'rotateY(' + imageIndex * -theta + 'rad)';			
    if(imageIndex%n == 0) {
      images[images.length - 1].style.padding = '80px';
      if(n > 1) images[imageIndex%n + 1].style.padding = '80px';
      images[imageIndex%n].style.transition = 'all 1s';				
      images[imageIndex%n].style.padding = '0';
    }else{
      if(imageIndex%n < 0){
        images[imageIndex%n + images.length - 1].style.padding = '80px'
        if(imageIndex%n == -1) images[0].style.padding = '80px'
        else if(n > 1) images[imageIndex%n + images.length + 1].style.padding = '80px'	
        images[imageIndex%n + images.length].style.transition = 'all 1s';				
        images[imageIndex%n + images.length].style.padding = '0';
      }else{
        if(imageIndex%n == images.length - 1) images[0].style.padding = '80px'
        else if(n > 1) images[imageIndex%n + 1].style.padding = '80px'	
        images[imageIndex%n - 1].style.padding = '80px'
        images[imageIndex%n].style.transition = 'all 1s';				
        images[imageIndex%n].style.padding = '0';
      }
    }
    
  }
  if(!setGuestsTimeoutRotate) setGuestsTimeoutRotate = function(){
    clearTimeout(guestsCarouselTimer)
    currImage++;
    rotateCarousel(currImage);
    guestsCarouselTimer = setTimeout(setGuestsTimeoutRotate,3000)
  }
  if(!guestsCarouselTimer) guestsCarouselTimer = setTimeout(setGuestsTimeoutRotate,3000)
}