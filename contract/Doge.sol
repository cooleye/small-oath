pragma solidity ^0.5.0;

contract Doge{
    function showDog() public pure returns (string memory) {
        return "Wow Doge";
     }

}

contract BabyDoge is Doge {
  function anotherShowDog() public pure returns (string memory) {
    return "Such a BabyDoge";
  }
}
