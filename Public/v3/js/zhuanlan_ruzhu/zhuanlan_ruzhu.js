// 选择侧边栏
$(".left_select_tab_item").on("click", function () {
    $(".left_select_tab_item").removeClass("cur");
    $(this).addClass("cur");
    for (var i = 0; i < $(".select_content").length; i++) {
        $($(".select_content")[i]).hide();
        $($(".select_content")[$(this).index()]).show();
    }
});

// 认证类型点击
$(".type_btn").on("click",function () {
    $(".type_btn").removeClass("cur");
    $(this).addClass("cur");
});

/**
 * 上传图片方法
 * @param btnDom     点击图片按钮元素名 input
 * @param imgDom     图片显示元素名
 */
function selectPic(btnDom,imgDom) {
    $(btnDom).change(function (e) {
        //获取目标文件
        var file = e.target.files || e.dataTransfer.files;
        //如果目标文件存在
        if (file) {
            //定义一个文件阅读器
            var reader = new FileReader();
            //文件装载后将其显示在图片预览里
            reader.onload = function () {
                $(imgDom).attr("src", this.result);
            };
            //装载文件
            reader.readAsDataURL(file[0]);
        }
    });
}