(function(){
    function w() {
        var r = document.documentElement;
        var a = r.getBoundingClientRect().width;
        // var b=window.devicePixelRatio;
        // 判断屏幕有没有大于750，如果大于750px，
        if (a >=640 ){
            a =640;
        }
        //750/w = 100/font-size
        rem =(a / 6.4);//屏幕的宽度比例设置
        r.style.fontSize = rem + "px";
    }
    var t;
    w();
    window.addEventListener("resize", function() {
        clearTimeout(t);
        t = setTimeout(w, 300);
    }, false);
})();
