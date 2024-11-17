// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyContractV2 is Initializable {
    uint256 public myValue;
    string public newValue;

    function initialize(uint256 _value) public initializer {
        myValue = _value;
    }

    function setNewValue(string memory _newValue) public {
        newValue = _newValue;
    }
}
