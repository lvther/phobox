$(function () {

    initPhoList()

    // 根据顶部搜索框获取图片
    $('#top-seo').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            type: "POST",
            url: "/api/author",
            data:$(this).serialize(),
            success: function (res) {

                var htmlStr = template('pholist', res)

                $('#img-list').html(htmlStr);
            }
        });
    });


    // 左侧查询按钮绑定
    $('#left-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            type: "POST",
            url: "/api/phoitem",
            data:$(this).serialize(),
            success: function (res) {

                var htmlStr = template('pholist', res)

                $('#img-list').html(htmlStr);
            }
        });
    });

    // 获取图片列表
    function initPhoList() {
        $.ajax({
            type: "GET",
            url: "/api/pholist",
            success: function (res) {

                var htmlStr = template('pholist', res)

                $('#img-list').html(htmlStr);
            }
        });
    }
})