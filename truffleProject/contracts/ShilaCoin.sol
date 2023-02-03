// SPDX-License-Identifier: non
pragma solidity ^0.8.0;


contract ShilaCoin {
    
    mapping (address => uint) balances;
    address owner;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() {
        owner = msg.sender;
        balances[msg.sender] = 1000000;
    }

    function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Transfer(msg.sender, receiver, amount);
        return true;
    }


    function getBalance() public view returns(uint) {
        return balances[msg.sender];
    }


    function sendPoint(address receiver, uint amount) public {
        require(msg.sender == owner, "You don't have the authority.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }
}
