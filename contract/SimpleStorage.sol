pragma solidity ^0.5.0;
contract SimpleStorage {
    uint data;
    
    event  onSetData (uint x);
    
    function setData(uint x) public{
        
        data = x;
        emit onSetData(x);
    }
    
    function getData() public view returns (uint) {
        
        return data;
    }

}