import { log } from "console";
import {ethers,upgrades}from "hardhat";

const json = require("../../address.json");
const proxyad = json.proxy;

async function main(){
    const [deployer] = await ethers.getSigners();
    // deploy logic contract
    console.log(proxyad);
    const logic2 = await ethers.deployContract("UUPSLogicV2",deployer);
    console.log("Logicv2 deployed to:", logic2.target);
    const proxy = await ethers.getContractAt("UUPSLogic",proxyad);
    console.log("Proxy address:", proxy.target);
    console.log("Upgrading proxy...");
    await proxy.connect(deployer).upgradeToAndCall(logic2.target,"0x");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
