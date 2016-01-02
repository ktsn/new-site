;(function(window, document, $){
"use strict";

var rnt = $.rnt = (() => {

  // ---------------------------------
  // variables
  // 
  const UA     = navigator.userAgent,
        domain = location.hostname;

  // ---------------------------------
  // functions
  //     
  let isMobile = () => {
    let useragents = [
          "iPhone",          //  Apple iPhone
          "iPod",            //  Apple iPod touch
          "Android.*Mobile", //  1.5+ Android
          "dream",           //  Pre 1.5 Android
          "CUPCAKE",         //  1.5+ Android
          "blackberry9500",  //  Storm
          "blackberry9530",  //  Storm
          "blackberry9520",  //  Storm v2
          "blackberry9550",  //  Storm v2
          "blackberry9800",  //  Torch
          "webOS",           //  Palm Pre Experimental
          "incognito",       //  Other iPhone browser
          "webmate"          //  Other iPhone browser
        ],
        pattern = new RegExp(useragents.join("|"), "i");
        
    return pattern.test(UA);
  };

  let isIE = () => {
    return /MSIE\s[0-9]+(\.[0-9])+/i.test(UA);
  };

  let rollOver = option => {
    let param = $.extend({
          "fixClass"  : "current",
          "onName"    : "_on",
          "offName"   : "_off",
          "overClass" : null
        }, option),
        $img = $( (!param["overClass"]? "." + param["overClass"] + ", " : "") + "img[src*=" + param["offName"] + "], input[src*=" + param["offName"] + "]" ),
        i = -1,
        len = $img.length,
        $focus,
        defaultSrc,
        imgType,
        rollOverSrc,
        rollOverImg;

    for( ; ++i < len; ){

      $focus = $img.eq(i),
      defaultSrc = $focus.attr("src"),
      imgType = defaultSrc.match(/(\.gif|\.jpe?g|\.png)$/);

      if(imgType){
        imgType = imgType[0];

        if(param["offName"] == "") {
          rollOverSrc = defaultSrc.replace(imgType, param["onName"] + imgType);
        } else {
          rollOverSrc = defaultSrc.replace(param["offName"] + imgType, param["onName"] + imgType);
        }

        rollOverImg = new Image();
        rollOverImg.src = rollOverSrc;

        $focus.data("src", {
          "defaultSrc" : defaultSrc,
          "rollOverSrc" : rollOverSrc
        })
        .on({
          "mouseenter": function(){
            var $this = $(this);
            $this.attr("src", $this.data("src").rollOverSrc);
          },
          "mouseleave": function(){
            var $this = $(this);
            $this.not( "." + param.fixClass ).attr("src", $this.data("src").defaultSrc);
          }
        });
      }
    }
    $focus = null;
    return $img;
  },// rollOver
      
  scroll = function(option){
    var param = $.extend({
          "scrollClass" : "pageTop",
          "duration"    : "slow",
          "easing"      : "swing"
        }, option),
        $scroller = $( (/safari/i.test(UA))? "body" : "html" ),
        $pageTop = $("p." + param["scrollClass"] + " a, a." + param["scrollClass"] + ', a[href^="#"]'),
        i = -1,
        len = $pageTop.length;

    for( ; ++ i < len; ){
      $pageTop.eq(i).on("click tap", function(){
        var href = $(this).attr("href"),
            $target = $((href == "#" || href == "" || !href)? "html" : href),
            position;

        if(!$target.offset()){
          return;
        }

        position = $target.offset().top;
        $scroller.animate({
          "scrollTop" : position
        }, {
          "duration" : param["duration"],
          "easing" : param["easing"]
        });
        return false;
      });
    }
    return $pageTop;
  },// scroll
      
  blank = function(option){
    var param = $.extend({
          "blankClass"    : "external",
          "selfClass"     : "_self",
          "anotherDomain" : false
        }, option),
        $blankLink = $("a[href^='http://'], a[href^='https://']").not("a[href*=" + domain + "], a[href*=" + domain + "]");

        i = -1,
        len = $blankLink.length;

    for( ; ++ i < len; ){
      $blankLink.eq(i).on("click tap", function(){
        window.open(this.href, "_blank");
        return false;
      });
    }
    return $blankLink;
  };// blank

  return {
    "isMobile"  : isMobile,
    "isIE"      : isIE,
    "rollOver"  : rollOver,
    "blank"     : blank,
    "scroll"    : scroll
  };
})();

// ---------------------------------
// document.ready
//     
$(function(){
  rnt.rollOver();
  rnt.scroll();
  rnt.blank();
});
})(window, window.document, jQuery);