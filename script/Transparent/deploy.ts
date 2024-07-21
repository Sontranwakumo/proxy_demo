import { ethers } from "hardhat";
import * as fs from 'fs';
async function main(){
    const [deployer] = await ethers.getSigners();

    // Deploy Logicv1
    const Logicv1 = await ethers.getContractFactory("Logicv1",deployer);
    const logicv1 = await Logicv1.deploy();
    console.log("Logicv1 deployed to:", logicv1.target);

    // Initialize data for proxy
    const initData = Logicv1.interface.encodeFunctionData("initialize", [42]);

    // Deploy TransparentUpgradeableProxy
    const MyTransparentProxy = await ethers.getContractFactory("MyTransparentProxy");
    const proxy = await MyTransparentProxy.deploy(logicv1.target, deployer, initData);
    console.log("MyTransparentProxy deployed to:", proxy.target);

    const json = JSON.stringify({
        logicv1: logicv1.target,
        proxy: proxy.target
    });
    fs.writeFileSync('address.json', json,'utf-8');
    // Interact with the proxy contract
    // const proxiedLogic = await ethers.getContractAt("Logicv1", proxy.address);
    // console.log("Initial value:", (await proxiedLogic.value()).toString());

    // // Upgrade to Logicv2
    // const Logicv2 = await ethers.getContractFactory("Logicv2");
    // const logicv2 = await Logicv2.deploy();
    // await logicv2.deployed();
    // console.log("Logicv2 deployed to:", logicv2.address);

    // await myAdmin.upgrade(proxy.address, logicv2.address);
    // console.log("Proxy upgraded to Logicv2");

    // // Interact with the upgraded proxy contract
    // const proxiedLogicv2 = await ethers.getContractAt("Logicv2", proxy.address);
    // await proxiedLogicv2.setValue(10);
    // console.log("Updated value:", (await proxiedLogicv2.value()).toString());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
