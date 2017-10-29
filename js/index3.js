var imgArr = [
    'http://img3.u17i.com/16/05/5553/29137_1462676045_ZSeuXpGuaq5B.0ce1d_svol.jpg',
    'http://img3.u17i.com/10/06/5553/29137_1277655020_I3Z0fhi0TPtr.c568e_svol.jpg',
    'http://img3.u17i.com/10/06/5553/29137_1277655023_pjbih5HPPsIY.e4cbd_svol.jpg',
    'http://img3.u17i.com/10/06/5553/29137_1277655025_I6TXs6A7rSWx.55acd_svol.jpg',
    'http://img3.u17i.com/10/06/5553/29137_1277655027_6M5JWK2qKTWq.813d8_svol.jpg',
    'http://img3.u17i.com/10/06/5553/29137_1277655030_waa00ALZ0fgj.6d150_svol.jpg',
    'http://img3.u17i.com/10/06/5553/29137_1277655033_uk66hh3JAhk1.60f16_svol.jpg'
];

var len = imgArr.length;
var count = 0; /*加载到第几张图片*/
var index = 0; //当前浏览到第几张图片

/*思路：先加载第一张图片，第一张加载完再继续加载第二章，以此内推*/

//有序预加载图片
function load() {
    var imgObj = new Image();

    //每次图片加载完成或者失败时候执行的代码
    $(imgObj).on('load error', function() {
        if (count >= len) { //所有图片已经加载完毕

        } else {
            load(); //自调用
        }
        count++;
    });

    imgObj.src = imgArr[count];
    console.log(imgObj)
}
load();


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