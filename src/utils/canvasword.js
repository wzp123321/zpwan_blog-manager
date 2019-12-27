//鼠标点击出现爱心特效
(function (window, document, undefined) {
    var hearts = [];
    window.requestAnimationFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          setTimeout(callback, 1000 / 60);
        }
    })();
    init();
  
    function init() {
      css(".heart{width: 13px;height: 13px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
      attachEvent();
      gameloop();
    }
  
    function gameloop() {
      for (var i = 0; i < hearts.length; i++) {
        if (hearts[i].alpha <= 0) {
          document.body.removeChild(hearts[i].el);
          hearts.splice(i, 1);
          continue;
        }
        hearts[i].y--;
        hearts[i].scale += 0.004;
        hearts[i].alpha -= 0.013;
        hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ") rotate(45deg);background:" + hearts[i].color;
      }
      requestAnimationFrame(gameloop);
    }
  
    function attachEvent() {
      var old = typeof window.onclick === "function" && window.onclick;
      window.onclick = function (event) {
        old && old();
        createHeart(event);
      }
    }
    // 生成爱心
    function createHeart(event) {
      const slogans = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善']
      var d = document.createElement("div");
      const word_child = document.createElement("span");
      word_child.innerText = slogans[parseInt(Math.random() * 12)];
      word_child.style.cssText = "color:#06a5ff;z-index:999;display:inline-block;width:30px;position:absolute;top:-6px;left:-7px;font-size:9px;transform:rotate(-45deg)"
      d.appendChild(word_child)
      d.className = "heart";
      hearts.push({
        el: d,
        x: event.clientX - 5,
        y: event.clientY - 5,
        scale: 1,
        alpha: 1,
        color: randomColor(),
      });
      document.body.appendChild(d);
    }
    // 样式
    function css(css) {
      var style = document.createElement("style");
      style.type = "text/css";
      try {
        style.appendChild(document.createTextNode(css));
      } catch (ex) {
        style.styleSheet.cssText = css;
      }
      document.getElementsByTagName('head')[0].appendChild(style);
    }
    // 颜色
    function randomColor() {
      return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
    }
  })(window, document);
  