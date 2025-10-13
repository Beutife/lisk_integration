"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export default function NFTPage() {
  const { address: connectedAddress } = useAccount();
  const [mintToAddress, setMintToAddress] = useState("");
  const [tokenIdToCheck, setTokenIdToCheck] = useState("");

  // Read contract data
  const { data: nftName } = useScaffoldContractRead({
    contractName: "MyNFT",
    functionName: "name",
  });

  const { data: nftSymbol } = useScaffoldContractRead({
    contractName: "MyNFT",
    functionName: "symbol",
  });

  const { data: totalSupply } = useScaffoldContractRead({
    contractName: "MyNFT",
    functionName: "totalSupply",
  });

  const { data: userBalance } = useScaffoldContractRead({
    contractName: "MyNFT",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: tokenOwner } = useScaffoldContractRead({
    contractName: "MyNFT",
    functionName: "ownerOf",
    args: [tokenIdToCheck ? BigInt(tokenIdToCheck) : BigInt(0)],
  });

  // Write function
  const { writeAsync: mintNFT } = useScaffoldContractWrite({
    contractName: "MyNFT",
    functionName: "mint",
    args: [mintToAddress || connectedAddress],
  });

  const handleMint = async () => {
    const recipient = mintToAddress || connectedAddress;
    if (!recipient) {
      notification.error("Please enter recipient address or connect wallet");
      return;
    }

    try {
      await mintNFT({
        args: [recipient],
      });
      notification.success("🎉 NFT minted successfully!");
      setMintToAddress("");
    } catch (error) {
      console.error("Minting failed:", error);
      notification.error("Minting failed. Please try again.");
    }
  };

  if (!connectedAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center p-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl">
          <div className="card-body text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="card-title text-3xl justify-center mb-2">Lisk Builder Badge</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Please connect your wallet to mint NFTs</p>
            <div className="alert alert-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Connect your wallet to continue</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 p-4">
      <div className="container mx-auto max-w-6xl py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full mb-4 shadow-xl">
            <span className="text-6xl">🏆</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Lisk Builder Badge
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Mint your exclusive NFT badge • Proof of Builder Status
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card bg-white dark:bg-gray-800 shadow-xl border-t-4 border-purple-500">
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-gray-500 uppercase">Collection</h2>
                <span className="text-2xl">🎨</span>
              </div>
              <p className="text-3xl font-black text-purple-600">{nftName || "..."}</p>
              <p className="text-lg font-medium text-purple-600">{nftSymbol || "..."}</p>
            </div>
          </div>

          <div className="card bg-white dark:bg-gray-800 shadow-xl border-t-4 border-pink-500">
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-gray-500 uppercase">Total Minted</h2>
                <span className="text-2xl">📈</span>
              </div>
              <p className="text-3xl font-black text-pink-600">{totalSupply?.toString() || "0"}</p>
              <p className="text-lg font-medium text-pink-600">NFTs Created</p>
            </div>
          </div>

          <div className="card bg-white dark:bg-gray-800 shadow-xl border-t-4 border-orange-500">
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-gray-500 uppercase">Your NFTs</h2>
                <span className="text-2xl">👤</span>
              </div>
              <p className="text-3xl font-black text-orange-600">{userBalance?.toString() || "0"}</p>
              <p className="text-lg font-medium text-orange-600">Badges Owned</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mint Card */}
          <div className="card bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 shadow-2xl text-white">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">⚡</span>
                <h2 className="card-title text-2xl">Mint Your Badge</h2>
              </div>
              <p className="mb-4 text-purple-100">Create a unique Builder Badge NFT</p>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-white font-bold">Mint to Address (Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder={connectedAddress || "0x... (Leave empty to mint to yourself)"}
                  className="input input-bordered input-lg w-full bg-white text-gray-900 font-mono"
                  value={mintToAddress}
                  onChange={e => setMintToAddress(e.target.value)}
                />
                <label className="label">
                  <span className="label-text-alt text-white/70">Default: Your wallet address</span>
                </label>
              </div>

              <button className="btn btn-lg bg-white text-purple-700 hover:bg-gray-100 font-bold" onClick={handleMint}>
                Mint NFT Badge
              </button>

              <div className="alert bg-white/10 mt-4">
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Free minting • Unlimited badges</span>
              </div>
            </div>
          </div>

          {/* Check Ownership Card */}
          <div className="card bg-white dark:bg-gray-800 shadow-2xl">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🔍</span>
                <h2 className="card-title text-2xl text-blue-600">Check NFT Owner</h2>
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-bold">Token ID</span>
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="Enter Token ID (e.g., 0, 1, 2...)"
                  className="input input-bordered w-full font-bold text-xl"
                  value={tokenIdToCheck}
                  onChange={e => setTokenIdToCheck(e.target.value)}
                />
              </div>

              {tokenIdToCheck && tokenOwner && (
                <div className="alert alert-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <div className="font-bold">NFT #{tokenIdToCheck} Found!</div>
                    <div className="text-sm flex items-center gap-2 mt-1">
                      <span>Owner:</span>
                      <Address address={tokenOwner} />
                    </div>
                  </div>
                </div>
              )}

              {tokenIdToCheck && !tokenOwner && (
                <div className="alert alert-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>Token #{tokenIdToCheck} does not exist yet</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contract Info */}
        <div className="card bg-base-200 dark:bg-gray-800 shadow-xl mt-8">
          <div className="card-body">
            <h3 className="card-title">📄 Contract Information</h3>
            <div className="divider"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span className="font-bold">Network:</span>
                <span>Lisk Sepolia</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Contract:</span>
                <Address address="0x37566a5C099E5b0e9D0C0De8A625bC702CF80Ca2" />
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Standard:</span>
                <span className="badge badge-secondary">ERC721</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Total Badges:</span>
                <span className="text-xl font-bold">{totalSupply?.toString() || "0"}</span>
              </div>
            </div>
            <a
              href="https://sepolia-blockscout.lisk.com/address/0x37566a5C099E5b0e9D0C0De8A625bC702CF80Ca2"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline mt-4"
            >
              View on Blockscout →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
