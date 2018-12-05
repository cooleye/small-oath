pragma solidity ^0.5.0;
contract StructArr {
    
    struct Person {
        uint age;
        string name;
    }

    Person[] public people;
    
    function saveUser(uint age,string memory name) public {
        // 创建一个新的Person:
        Person memory satoshi = Person(age, name);

        // 将新创建的satoshi添加进people数组:
        people.push(satoshi);

        //两步并一步，用一行代码更简洁:
        //people.push(Person(age, name));
    }
}