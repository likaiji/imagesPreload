var imgArr = [
    'https://www.ftjubao.com/uploadfile//p2p/slide/5873C6D83CA749C6A045B245076D95E2.jpg',
    'https://www.ftjubao.com/uploadfile//p2p/slide/41F1AD0F1067407C9C67D36F67D2F13B.jpg',
    'https://www.ftjubao.com/uploadfile//p2p/slide/10EF9F8553C046CC8902E8835D087B97.jpg',
    'https://www.ftjubao.com/uploadfile//p2p/slide/ED02090E478F48D09B4369168A79660C.jpg'
];

var index = 0;
var len = imgArr.length;
var count = 0;
var $progress = $('.progress');

//无序加载
$.each(imgArr, function(index, src) {
    // 实例化一个 Image对象，<img> 标签每出现一次，一个 Image 对象就会被创建。
    var imgObj = new Image();
    console.log(imgObj) //此时会打出   <img>

    // 将上面实例化生成的 <img> 添加src属性
    imgObj.src = src;

    $(imgObj).on('load error', function() {
        $progress.html(Math.round((count + 1) / len * 100) + '%');
        if (count >= len - 1) {
            $('.loading').hide();
            document.title = "1/" + len;
        }
        count++;
    });
})

//点击上下切换
$(".btn").click(function() {
    if ($(this).data('control') === 'prev') { //上一张
        // 运用 Math.max 返回 参数 里面的最大值
        // 先把index--以后，再判断此时index和0的大小
        // 要是变为 Math.max(0, index--) 就是先把判断index和0的大小，然后再--
        index = Math.max(0, --index)
    } else { // 下一张
        // 假设点击下一张 此时 index=0，len=4
        // 就判断 3和1的大小，返回1
        // 继续
        // 此时 index=1，len=4
        // 就判断 3和2的大小，返回2
        // 继续
        // 此时 index=2，len=4
        // 就判断 3和3的大小，返回3
        // 继续
        // 此时 index=3，len=4
        // 就判断 3和4的大小，返回3
        index = Math.min(len - 1, ++index)
    }

    // 设置title
    document.title = (index + 1) + '/' + len

    // 设置图片
    $("#img").attr('src', imgArr[index])
})