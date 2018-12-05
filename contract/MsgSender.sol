pragma solidity ^0.5.0;
contract MsgSender {
    
    mapping (address => uint) favoriteNumber;

    function setMyNumber(uint _myNumber) public {
        // 更新我们的 `favoriteNumber` 映射来将 `_myNumber`存储在 `msg.sender`名下
        favoriteNumber[msg.sender] = _myNumber;
        // 存储数据至映射的方法和将数据存储在数组相似
    }

    function whatIsMyNumber() public view returns (uint) {
        // 拿到存储在调用者地址名下的值
        // 若调用者还没调用 setMyNumber， 则值为 `0`
        return favoriteNumber[msg.sender];
    }

}