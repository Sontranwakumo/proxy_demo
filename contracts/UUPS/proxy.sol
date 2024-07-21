// contracts/MyContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "hardhat/console.sol";

contract MyUUPSProxy is ERC1967Proxy{
    constructor(address add, bytes memory data) ERC1967Proxy(add,data){}
}