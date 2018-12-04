pragma solidity ^0.5.0;
contract SmallOath {
    
     struct  Article{
        uint id;
        string content;
        address author;
    }
    
    Article[] public articles;

    /*根据参数显示固定数量文字*/
    function showSomeArticles() public view returns(
        address a1,string memory c1,
        address a2,string memory c2
        ) {
        a1 = articles[0].author;
        c1 = articles[0].content;
        a2 = articles[1].author;
        c2 = articles[1].content;
        
        return (a1,c1,a2,c2);
    }

    /*写入文章*/
    function writeArticleIntoChain (string memory content) public {
        articles.push(Article(articles.length,content,msg.sender));
    }

}