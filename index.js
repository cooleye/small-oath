var oathContract;
var userAccount;



$(".md-close").click(function () {
    var ac = $("#articleContent").val();
    console.log(ac)
    if (ac) {
        saveData(ac)
    }

})

function startApp() {
    var contractAddress = "0xe72dd631b0a9202c59f9cdb9233777d702a1c01b";
    oathContract = web3.eth.contract(ABI).at(contractAddress);

    console.log('oathContract', oathContract)
    var accountInterval = setInterval(function () {
        // Check if account has changed
        if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0];

            console.log(userAccount)

            showArticles()
        }
    }, 100);

    // Start here
}

function showArticles() {
    var r = oathContract.getData(function (err, result) {
        console.log(result.toString())
        if (err) {
            console.log('数据请求错误...', err)
        } else {
            console.log(result)
        }
    })

}

function writeArticle(content) {

    console.log('正在保存数据，请稍等。。。。')
    oathContract.setData(num, function (err, res) {
        if (err) {
            console.log('数据请求错误...', err)
        } else {
            var events = oathContract.allEvents();
            events.watch(function (error, result) {
                if (!err)
                    console.log(result)
                showArticles()
            });

        }

    })
}




window.addEventListener('load', function () {

    // 检查web3是否已经注入到(Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // 使用 Mist/MetaMask 的提供者
        web3js = new Web3(web3.currentProvider);
    } else {
        // 处理用户没安装的情况， 比如显示一个消息
        // 告诉他们要安装 MetaMask 来使用我们的应用
        alert("请先安装Metamask插件")
    }

    console.log(web3.eth.accounts)
    // 现在你可以启动你的应用并自由访问 Web3.js:
    startApp()

})


$("textarea[maxlength]").keyup(function () {
    var area = $(this);
    var max = parseInt(area.attr("maxlength"), 10); //获取maxlength的值 
    if (max > 0) {
        $("#remainWord").html(max - area.val().length);
        if (area.val().length > max) { //textarea的文本长度大于maxlength 
            area.val(area.val().substr(0, max)); //截断textarea的文本重新赋值 
        }
    }
});

//复制的字符处理问题 
$("textarea[maxlength]").blur(function () {
    var area = $(this);
    var max = parseInt(area.attr("maxlength"), 10); //获取maxlength的值 
    if (max > 0) {
        if (area.val().length > max) { //textarea的文本长度大于maxlength 
            area.val(area.val().substr(0, max)); //截断textarea的文本重新赋值 
        }
    }
});