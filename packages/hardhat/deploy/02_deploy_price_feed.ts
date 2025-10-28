import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployPriceFeed: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log(`👤 Deployer: ${deployer}`);

  const deployment = await deploy("PriceFeed", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log(`🏠 Deployed Address for p: ${deployment.address}`);
};
export default deployPriceFeed;
deployPriceFeed.tags = ["PriceFeed"];
