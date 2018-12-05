pragma solidity ^0.5.0;

contract MultipleReturns{
    
    
    function multipleReturns() internal pure returns(uint a, uint b, uint c) {
         return (1, 2, 3);
    }

    function processMultipleReturns() external pure {
      uint a;
      uint b;
      uint c;
      (a, b, c) = multipleReturns();   // 这样来做批量赋值:
    }

    function getLastReturnValue() external pure{
      uint c;
      // 可以对其他字段留空:
      (,,c) = multipleReturns();  // 或者如果我们只想返回其中一个变量:
    }


}