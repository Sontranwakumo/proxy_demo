import { ethers } from "hardhat";

const json = require("../../address.json");
const proxyad = json.proxy;

async function main(){
    const [deployer] = await ethers.getSigners();
    // deploy logic contract
    const logicv1 = await ethers.getContractAt("Logicv2",proxyad);
    await logicv1.setValue(30);
    const val = await logicv1.value();
    console.log(val);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
