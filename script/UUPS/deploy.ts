import { ethers } from "hardhat";
import * as fs from 'fs';
async function main(){
    const [deployer] = await ethers.getSigners();

    const Logic1 = await ethers.getContractFactory("UUPSLogic");
    const logic1 = await Logic1.deploy();
    console.log("Logic1 build at", logic1.target)
    const Proxy = await ethers.getContractFactory("MyUUPSProxy",deployer);
    // const data = Proxy.interface.encodeFunctionData("initialize",[deployer]);
    const proxy = await Proxy.deploy(logic1.target,"0x");
    
    console.log("Proxy deployed to:", proxy.target);

    console.log("Proxy anh xa ", await proxy.impte());
    const json = JSON.stringify({
        logic1: logic1.target,
        proxy: proxy.target
    });
    const newProxy = Logic1.attach(proxy.target);
    await newProxy.initialize(deployer);

    fs.writeFileSync('address.json', json,'utf-8');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
