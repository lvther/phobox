    // 调用$.get(),$.post(),$.ajax()时都秘密调用该函数，作用是url字符串的拼接。
    $.ajaxPrefilter(function (options) {
        // options是ajax提供给我们的配置对象
        options.url = 'http://127.0.0.1:3008' + options.url;
    })