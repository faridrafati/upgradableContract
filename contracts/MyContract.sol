// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyContract is Initializable {
    uint256 public myValue;

    function initialize(uint256 _value) public initializer {
        myValue = _value;
    }
}


contract MyContract2 is Initializable{
    uint256 public myValue;

    function Initialize(uint256 _myValue) public initializer {
        myValue = _myValue;
    }
}