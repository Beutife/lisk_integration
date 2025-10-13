import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * This deployment script deploys both MyToken (ERC20) and MyNFT (ERC721) contracts.
 * It uses the deployer account defined in hardhat.config.ts namedAccounts.
 */
const deployContracts: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("🚀 Deploying contracts with the account:", deployer);

  // Deploy ERC20 token
  const tokenDeployment = await deploy("MyToken", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log("✅ MyToken deployed to:", tokenDeployment.address);

  // Deploy ERC721 NFT
  const nftDeployment = await deploy("MyNFT", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log("✅ MyNFT deployed to:", nftDeployment.address);

  // Interact with deployed contracts (optional)
  const myToken: Contract = await ethers.getContract("MyToken", deployer);
  const myNFT: Contract = await ethers.getContract("MyNFT", deployer);

  console.log("💰 Token contract address:", await myToken.getAddress());
  console.log("🖼️ NFT contract address:", await myNFT.getAddress());
};

export default deployContracts;

// Tags allow running specific deploy scripts like: yarn hardhat deploy --tags Tokens
deployContracts.tags = ["MyToken", "MyNFT"];
