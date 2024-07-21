import { ethers } from "hardhat";
import * as fs from 'fs';
async function main(){
    const [deployer] = await ethers.getSigners();

    const logic1 = await ethers.deployContract("UUPSLogic");

    const Proxy = await ethers.getContractFactory("MyUUPSProxy",deployer);
    // const data = Proxy.interface.encodeFunctionData("initialize",[deployer]);
    const proxy = await Proxy.deploy(logic1.target,"0x");
    console.log("Proxy deployed to:", proxy.target);
    const json = JSON.stringify({
        proxy: proxy.target
    });
    fs.writeFileSync('address.json', json,'utf-8');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
