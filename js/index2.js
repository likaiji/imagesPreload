var $btn = $('#face-btn'),
    $panel = $('.panel');

var imgs = [];
// 组合一下imgs数组
for (var i = 0; i < 14; i++) {
    if (i >= 0 && i <= 9) {
        imgs[i] = 'img/face/qq/0' + (i) + '.gif';
    } else {
        imgs[i] = 'img/face/qq/' + (i) + '.gif';
    }
}

var len = imgs.length;

$btn.click(function() {
    $panel.css('display', 'block');
    $.preload(imgs, {
        //所有图片加载完成执行方法
        all: function() {
            var html = '';
            html += '<ul class="list">';
            for (var i = 0; i < len; i++) {
                html += '<li><img src="' + imgs[i] + '" alt=""></li>';
            }
            html += '</ul>';
            $panel.html(html)
        }
    })
})