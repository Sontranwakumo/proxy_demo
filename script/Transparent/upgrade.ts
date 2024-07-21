import {ethers,upgrades}from "hardhat";

const json = require("../../address.json");
const proxyad = json.proxy;

async function main(){
    const [deployer] = await ethers.getSigners();
    // deploy logic contract
    const Logicv2 = await ethers.getContractFactory("Logicv2",deployer);
    const logicv2 = await Logicv2.deploy();
    console.log("Logicv2 deployed to:", logicv2.target);
    const st = await upgrades.erc1967.getAdminAddress(proxyad);
    console.log(st);
    const admin = await ethers.getContractAt("MyAdmin",st,deployer);
    await admin.upgradeAndCall(proxyad,logicv2.target,"0x");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
