// 图片预加载
(function($) {

    function PreLoad(imgs, options) {
        // 判断传递进来的imgs参数是什么类型，如果是字符串，就代表只传递进来一张图片
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs

        // 将options覆盖PreLoad.DEFAULTS，生成一个新的对象，然后返回给this.opts（$.extend（）的使用）
        this.opts = $.extend({}, PreLoad.DEFAULTS, options);

        //通过参数判断执行无序加载还是有序加载方法
        if (this.opts.order === 'ordered') { //有序预加载
            this._ordered();
        } else { //无序预加载
            this._unoredered();
        }
    }

    // 如果没有传递第二个参数，使用这个默认参数
    PreLoad.DEFAULTS = {
        order: 'unordered', //默认无序预加载
        each: null, //每张图片加载完毕执行方法
        all: null //所有图片加载完毕执行方法
    }


    //将_unoredered写在原型上（无序预加载）
    PreLoad.prototype._unoredered = function() {
        var imgArr = this.imgs;
        var opts = this.opts;
        var count = 0;
        var len = this.imgs.length;

        //无序加载
        $.each(imgArr, function(index, src) {
            // 判断这个src是否为字符串,是的话直接终止
            if (typeof src != 'string') return;


            // 实例化一个 Image对象，<img> 标签每出现一次，一个 Image 对象就会被创建。
            var imgObj = new Image();
            console.log(imgObj) //此时会打出   <img>

            // 将上面实例化生成的 <img> 添加src属性
            imgObj.src = src;

            $(imgObj).on('load error', function() {
                // opts.each存在才执行这个each（）
                opts.each && opts.each(count);

                // $progress.html(Math.round((count + 1) / len * 100) + '%');

                if (count >= len - 1) {
                    // $('.loading').hide();
                    // document.title = "1/" + len;
                    // opts.all存在才执行这个all（）
                    opts.all && opts.all();
                }
                count++;
            });
        })
    }


    //将_unoredered写在原型上（有序预加载）
    PreLoad.prototype._ordered = function() {
        var opts = this.opts,
            imgArr = this.imgs,
            count = 0,
            len = this.imgs.length;

        load();

        //有序预加载图片
        function load() {
            var imgObj = new Image();

            //每次图片加载完成或者失败时候执行的代码
            $(imgObj).on('load error', function() {
                opts.each && opts.each(count);

                if (count >= len) { //所有图片已经加载完毕
                    opts.all && opts.all();
                } else {
                    load(); //自调用
                }
                count++;
            });

            imgObj.src = imgArr[count];
            console.log(imgObj)
        }

    }


    $.extend({
        preload: function(imgs, opts) {
            new PreLoad(imgs, opts);
        }
    });

})(jQuery)