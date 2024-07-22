// contracts/MyContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

import "hardhat/console.sol";

contract UUPSLogic is UUPSUpgradeable,Initializable {
    uint256 internal _value;
    address internal _owner;

    function initialize(address newowner) public initializer{
        _owner = newowner;
    }
    modifier onlyOwner() {
        require(msg.sender == _owner,"You are not my owner");
        _;
    }

    function setValue(uint256 newValue) public onlyOwner virtual {
        _value = newValue;
    }

    function getValue() public view returns (uint256) {
        return _value;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}

contract UUPSLogicV2 is UUPSLogic {
    // Add new functionality here
    function newFunction() public pure returns (string memory) {
        return "This is the new function in MyContractV2";
    }
    function setValue(uint256 newValue) public onlyOwner override virtual {
        _value = newValue*2;
    }
}