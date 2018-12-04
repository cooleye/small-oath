var oathContract;
var userAccount;
var page = 1;



$(".md-close").click(function () {
    var ac = $("#articleContent").val();
    console.log(ac)
    if (ac) {
        writeArticle(ac)
        $("#articleContent").val("");
    }

})

$(".next-page").click(function(){
    page++;
    showArticles(page)
})
$(".last-page").click(function(){
    page--;
    showArticles(page)
})

function startApp() {
    var contractAddress = "0x99D28A468bA3fB210358Fa1D1e7AB8293dD65508";
    oathContract = web3.eth.contract(ABI).at(contractAddress);

    console.log('oathContract', oathContract)
    userAccount = web3.eth.accounts[0];
    var accountInterval = setInterval(function () {
        // Check if account has changed
        if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0];
        }
    }, 100);
    showArticles(page)

    var imgData = new Identicon(userAccount, 30).toString();
    var imgurl = 'data:image/png;base64,' + imgData;
    $(".user-avatar").attr({src:imgurl})
}

/*根据数据返回页面html结构*/
function articleFactory(article){
    console.log(article)
    let item = `<div class="item">
                    <div class="item-author">
                    <img src="${article.imgurl}" class="avatar"/>
                    author：<span>${article.author}</span>
                    </div>
                    <div class="item-content">
                    ${article.content}
                    </div>
                </div>`
    return item;
}
//字符串转对象数组
function string2objarr(str){
    console.log(str)
    let arr = str.split(",");
    let articles = [];
 
    for(let i = 0;i < arr.length;){
       
        let art = {};
        art.author = arr[i];
        art.content = arr[i+1];
        var imgData = new Identicon(art.author, 30).toString();
        art.imgurl = 'data:image/png;base64,' + imgData;
        articles.push(art);
        i+=2;

    }
    return articles;
}

/**显示文章 */
function showArticles(page) {
    oathContract.showSomeArticles(page,function (err, result) {
        if (err) {
            console.log('数据请求错误...', err)
        } else {
            if(result){
                let articles = string2objarr(result.toString());
                console.log('---->',articles)
                let articlesHtml = [];
                for(let i = 0;i<articles.length;i++){
                    articlesHtml.push(articleFactory(articles[i]))
                }
                console.log(articlesHtml)

                //把最后的结果显示在页面
                $(".main").html(articlesHtml.join(""))

            }

        }
    })

}

/*写入文章*/
function writeArticle(content) {

    console.log('正在保存数据，请稍等。。。。')
    oathContract.writeArticleIntoChain(content, function (err, res) {
        if (err) {
            console.log('数据请求错误...', err)
        } else {
            var events = oathContract.allEvents();
            events.watch(function (error, result) {
                if (!err)
                    console.log(result)
                showArticles(1)
                $(".loading-bar").css("width","0%")
            });
            loading();
        }

    })
}

function loading(){
    console.log('loading...')
    let t = 0;
    let w = 0;
    let timer = setInterval(function(){
        t++;

        $(".loading-bar").css("width",t*50/15000*100+"%");
        if(t*50>= 18000){
            clearInterval(timer)
        }
    },50)

    
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