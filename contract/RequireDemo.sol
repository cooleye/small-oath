pragma solidity ^0.5.0;
contract RequireDemo {
    
    function sayHiToVitalik(string memory _name) public pure  returns (string memory) {

      // 比较 _name 是否等于 "Vitalik". 如果不成立，抛出异常并终止程序
      // (敲黑板: Solidity 并不支持原生的字符串比较, 我们只能通过比较
      // 两字符串的 keccak256 哈希值来进行判断)
      // 如果返回 true, 运行如下语句
      require(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked("Vitalik")));
      
      return "Hi!";
    }


}