// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Logicv1 is Initializable{
    uint256 public value;

    function initialize(uint256 _value) public initializer{
        value = _value;
    }

    function setValue(uint256 a) public virtual{
        value = a;
    }
}
contract Logicv2 is Logicv1{

    function setValue(uint256 a) public override virtual{
        value = 2*a;
    }
}
