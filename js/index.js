$(function () {

    var webindex = 1

    var pager = {
        page: 1
    }
    initPhoList()

    // 根据顶部搜索框获取图片
    $('#top-seo').on('submit', function (e) {
        e.preventDefault()

        if(webindex!=3){
            pager.page = 1;     
            }
        var data=$(this).serializeArray()
        data.push({name:"page",value:pager.page})
        webindex = 3
        $.ajax({
            type: "POST",
            url: "/api/author",
            data: $.param(data),
            success: function (res) {

                var htmlStr = template('pholist', res)

                $('#img-list').html(htmlStr);
                $('#pageinfo').html(res.varpage.page + "/" + res.varpage.total);
            }
        });
    });



    $('#left-form').on('submit', function (e) {
        e.preventDefault()

        if(webindex!=2){
            pager.page = 1;     
            }
        var data=$(this).serializeArray()
        data.push({name:"page",value:pager.page})
        webindex = 2
        $.ajax({
            type: "POST",
            url: "/api/phoitem",
            data: $.param(data),
            success: function (res) {

                var htmlStr = template('pholist', res)

                $('#img-list').html(htmlStr);
                $('#pageinfo').html(res.varpage.page + "/" + res.varpage.total);
            }
        });
    });

    // 为分页绑定函数
    $('#prepage').click(function (e) {
        e.preventDefault();

        var infostr = $('#pageinfo').html().split("/")
        if (parseInt(infostr[0]) > 1) {
            let tempcurrent = parseInt(infostr[0]) - 1
            infostr[0] = tempcurrent
            pager.page=infostr[0]
            var changestr = infostr[0] + "/" + infostr[1]
            $('#pageinfo').html(changestr)

            switch (webindex) {
                case 1:
                    initPhoList()
                    break;
                case 2:
                    $('#left-form').submit()
                    break;
                case 3:
                    $('#top-seo').submit()
                    break;
                default:
                    break;
            }

        }
    });


    $('#nextpage').click(function (e) {
        e.preventDefault();

        var infostr = $('#pageinfo').html().split("/")
        var tempmax = parseInt(infostr[1])
        if (parseInt(infostr[0]) < tempmax) {
            let temp = parseInt(infostr[0]) + 1
            infostr[0] = temp
            pager.page=infostr[0]
            var changestr = infostr[0] + "/" + infostr[1]
            $('#pageinfo').html(changestr)
            switch (webindex) {
                case 1:
                    initPhoList()
                    break;
                case 2:
                    $('#left-form').submit()
                    break;
                case 3:
                    $('#top-seo').submit()
                    break;
                default:
                    break;
            }
        }

    });

    // 获取初始化图片列表
    function initPhoList() {

        if(webindex!=1){
        pager.page = 1;     
        }
        webindex = 1

        $.ajax({
            type: "POST",
            url: "/api/pholist",
            data: pager,
            success: function (res) {

                var htmlStr = template('pholist', res)

                $('#img-list').html(htmlStr);
                $('#pageinfo').html(res.varpage.page + "/" + res.varpage.total);
            }
        });
    }
})