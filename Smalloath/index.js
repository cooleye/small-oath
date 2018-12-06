var oathContract;
var userAccount;
var page = 1;
var total=0;



$(".md-close").click(function () {
    var ac = $("#articleContent").val();

    /**
     * 判断输入是否为空，不为空则把数据写入链上
     * 首先使用正则去除空格，再判断是否是空字符串
     */
    ac = ac.replace(/\s+/g,"");

    if (ac != "") {
        ac = ac.replace(/,/g,"&comm")
        writeArticle(ac)
        $("#articleContent").val("");
    }
})

//下一页
$(".next-page").click(function(){
    page++;
    //判断页数是否大于总页数，总页数为： 总文章数/每页显示数量
    page = page > total/5 ? Math.floor(total/5) : page;
    showArticles(page)
})
//上一页
$(".last-page").click(function(){
    page--;
    //判断页数是否小于1，页数从1开始
    page = page < 1 ? 1 : page;
    showArticles(page)
})

function startApp() {
    var contractAddress = "0xB9283725D14f8888A695F299CD67b767bCFE1EB5";
    oathContract = web3.eth.contract(ABI).at(contractAddress);

    userAccount = web3.eth.accounts[0];
    
    //使用定时器，检查用户账户是否切换
    var accountInterval = setInterval(function () {
        
        if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0];
        }
    }, 100);

    showArticles(page);

    //在header上显示用户头像
    var imgData = new Identicon(userAccount, 30).toString();
    var imgurl = 'data:image/png;base64,' + imgData;
    $(".user-avatar").attr({src:imgurl})
}

/*根据数据返回页面html结构*/
function articleFactory(article){

    let item = `<div class="item">
                    <div class="item-author">
                    <img src="${article.imgurl}" class="avatar"/>
                    author：<span>${article.author}</span>
                    </div>
                    <div class="item-content">
                    ${article.content.replace('/&comm/g',"，")}
                    </div>
                </div>`
    return item;
}

//字符串转对象数组
function string2objarr(str){

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
                // console.log('获取到数据：',result)
                let articles = string2objarr(result.toString());
                let articlesHtml = [];
                for(let i = 0;i<articles.length;i++){
                    articlesHtml.push(articleFactory(articles[i]))
                }
                // console.log(articlesHtml)
                
                $(".loading-bar").css("width","0%")
                //把最后的结果显示在页面
                $(".main").html(articlesHtml.join(""))
            }

        }
    })

    //更新总页数
    getArticleLength();
}

/*写入文章*/
function writeArticle(content) {

    console.log('正在保存数据，请稍等。。。。')
    oathContract.writeArticleIntoChain(content, function (err, res) {
        if (err) {
            console.log('数据请求错误...', err)
        } else {
            //事件监听，得知数据已经被写入链上
            var events = oathContract.allEvents();
            events.watch(function (error, result) {
                if (!err)
                    // console.log(result)
                showArticles(1)
                
            });
            loading();
        }

    })
}

/*获取文章数量*/
function getArticleLength(){
    oathContract.getArticleLength(function (err, result) {
        if(err){
            console.log('数据请求错误...', err)
        }else{
            total = result.toString();
        }
    })
}

/**
 * loading 
 */
let timer; 
function loading(){
    console.log('loading...')
    $(".loading-bar").css("width","0%");
    clearInterval(timer)
    let t = 0;
    let w = 0;
    timer = setInterval(function(){
        t++;

        $(".loading-bar").css("width",t*50/20000*100+"%");
        if(t*50>= 20000){
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

    // console.log(web3.eth.accounts)
    // 现在你可以启动你的应用并自由访问 Web3.js:
    startApp()
    getArticleLength();
})


/**
 * 保证文本域内文字输入不超过100个字。
 */
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