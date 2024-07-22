// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract MyAdmin is ProxyAdmin {

    constructor() ProxyAdmin(msg.sender) {

    }
}

contract MyTransparentProxy is TransparentUpgradeableProxy{
    
    constructor(address _logic, address _admin, bytes memory _data) TransparentUpgradeableProxy(_logic, _admin, _data) {
        
    }
    receive() external payable{}
}
