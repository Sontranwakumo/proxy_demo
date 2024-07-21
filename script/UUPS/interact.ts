import { ethers } from "hardhat";

const json = require("../../address.json");
const proxyad = json.proxy;

async function main(){
    const [deployer,user1] = await ethers.getSigners();
    // deploy logic contract
    const logicv1 = await ethers.getContractAt("UUPSLogic",proxyad);
    await logicv1.setValue(30);
    const val = await logicv1.getValue();
    console.log(val);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
