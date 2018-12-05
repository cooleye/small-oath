pragma solidity ^0.5.0;
contract SmallOath {
    
    
    event OnWriteArticle(string content);
     struct  Article{
        uint id;
        string content;
        address author;
    }
    
    Article[] public articles;

    /*根据参数显示固定数量文字*/
    function showSomeArticles(uint page) public view returns(
        address a1,string memory c1,
        address a2,string memory c2,
        address a3,string memory c3,
        address a4,string memory c4,
        address a5,string memory c5,
        uint len
        ) {
            
        len = articles.length;
        if(len/5 < page){
            page = uint(len/5);
        }
            
        
        a1 = articles[len-1-(page-1)*5].author;
        c1 = articles[len-1-(page-1)*5].content;
        
        a2 = articles[len-2-(page-1)*5].author;
        c2 = articles[len-2-(page-1)*5].content;
        
        a3 = articles[len-3-(page-1)*5].author;
        c3 = articles[len-3-(page-1)*5].content;
        
        a4 = articles[len-4-(page-1)*5].author;
        c4 = articles[len-4-(page-1)*5].content;
        
        a5 = articles[len-5-(page-1)*5].author;
        c5 = articles[len-5-(page-1)*5].content;
        
        return (a1,c1,a2,c2,a3,c3,a4,c4,a5,c5,len);
    }
    
    

    /*写入文章*/
    function writeArticleIntoChain (string memory content) public {
        articles.push(Article(articles.length,content,msg.sender));
        emit OnWriteArticle(content);
    }

}