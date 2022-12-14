const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config.js")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 Link per req
const GAS_PRICE_LINK = 1e9

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks deplpoyed")
        log("_______________________________________")
    }
}

module.exports.tags = ["all", "mocks"]