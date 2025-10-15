"use client";

import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export default function TokenPage() {
  const { address: connectedAddress } = useAccount();
  const [claimAmount, setClaimAmount] = useState("100");
  const [recipient, setRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  // Read contract data
  const { data: tokenName } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "name",
  });

  const { data: tokenSymbol } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "symbol",
  });

  const { data: totalSupply } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "totalSupply",
  });

  const { data: userBalance } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  // Write functions
  const { writeAsync: claimTokens } = useScaffoldContractWrite({
    contractName: "MyToken",
    functionName: "mint",
    args: [parseEther(claimAmount || "0")],
  });

  const { writeAsync: transferTokens } = useScaffoldContractWrite({
    contractName: "MyToken",
    functionName: "transfer",
    args: [recipient, parseEther(transferAmount || "0")],
  });

  const handleClaim = async () => {
    if (!claimAmount) {
      notification.error("Please enter claim amount");
      return;
    }

    try {
      await claimTokens({
        args: [parseEther(claimAmount)],
      });
      notification.success("🎉 Tokens claimed successfully! Check your wallet balance.");
      notification.info("💡 Add token to MetaMask: 0x09b3606f3e0A1b371d53983B4f2Fb38088f47C23");
      setClaimAmount("100");

      // Refresh the page after 3 seconds to update balance
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error: any) {
      console.error("Claim failed:", error);
      if (error.message?.includes("Already claimed")) {
        notification.error("⚠️ You have already claimed your tokens!");
      } else if (error.message?.includes("Cannot mint more than 100")) {
        notification.error("⚠️ Maximum claim amount is 100 tokens!");
      } else {
        notification.error("Claim failed. Please try again.");
      }
    }
  };

  const handleTransfer = async () => {
    if (!recipient || !transferAmount) {
      notification.error("Please fill in all fields");
      return;
    }

    try {
      await transferTokens({
        args: [recipient, parseEther(transferAmount)],
      });
      notification.success(" Transfer successful!");
      setRecipient("");
      setTransferAmount("");
    } catch (error) {
      console.error("Transfer failed:", error);
      notification.error("Transfer failed. Please try again.");
    }
  };

  if (!connectedAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl">
          <div className="card-body text-center">
            <div className="text-6xl mb-4">🪙</div>
            <h2 className="card-title text-3xl justify-center mb-2">Lisk SEA Token</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please connect your wallet to claim and transfer tokens
            </p>
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
              <span>Connect your wallet to continue</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4">
      <div className="container mx-auto max-w-6xl py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-xl">
            <span className="text-6xl">🪙</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Lisk SEA Token
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Claim your free tokens • Max 100 LSEA per wallet</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card bg-white dark:bg-gray-800 shadow-xl border-t-4 border-blue-500">
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-gray-500 uppercase">Token Info</h2>
              </div>
              <p className="text-3xl font-black text-blue-600">{tokenName || "..."}</p>
              <p className="text-lg font-medium text-blue-600">{tokenSymbol || "..."}</p>
            </div>
          </div>

          <div className="card bg-white dark:bg-gray-800 shadow-xl border-t-4 border-purple-500">
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-gray-500 uppercase">Total Supply</h2>
              </div>
              <p className="text-3xl font-black text-purple-600">
                {totalSupply ? Number(formatEther(totalSupply)).toLocaleString() : "0"}
              </p>
              <p className="text-lg font-medium text-purple-600">{tokenSymbol}</p>
            </div>
          </div>

          <div className="card bg-white dark:bg-gray-800 shadow-xl border-t-4 border-green-500">
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-gray-500 uppercase">Your Balance</h2>
              </div>
              <p className="text-3xl font-black text-green-600">
                {userBalance ? Number(formatEther(userBalance)).toLocaleString() : "0"}
              </p>
              <p className="text-lg font-medium text-green-600">{tokenSymbol}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Claim Card */}
          <div className="card bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl text-white">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="card-title text-2xl">Claim Free Tokens</h2>
              </div>
              <p className="mb-4 text-blue-100">Get up to 100 LSEA tokens • One-time claim</p>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-white font-bold">Claim Amount</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="100"
                  className="input input-bordered input-lg w-full bg-white text-gray-900 font-bold text-xl"
                  value={claimAmount}
                  onChange={e => setClaimAmount(e.target.value)}
                />
                <label className="label">
                  <span className="label-text-alt text-white/70">Min: 1 LSEA</span>
                  <span className="label-text-alt text-white/70">Max: 100 LSEA</span>
                </label>
              </div>

              <button className="btn btn-lg bg-white text-blue-600 hover:bg-blue-50 font-bold" onClick={handleClaim}>
                Claim Now!
              </button>

              <div className="alert bg-white/10 mt-4">
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">You can only claim once per wallet!</span>
              </div>

              <button
                onClick={async () => {
                  try {
                    await (window as any).ethereum?.request({
                      method: "wallet_watchAsset",
                      params: {
                        type: "ERC20",
                        options: {
                          address: "0x6c94Ac3D01e2f185Fcd8338dFa86e929af968Bd0",
                          symbol: "LSEA",
                          decimals: 18,
                        },
                      },
                    });
                    notification.success("Token added to MetaMask!");
                  } catch (error) {
                    notification.error("Failed to add token to MetaMask");
                  }
                }}
                className="btn btn-sm btn-outline bg-white/20 border-white/40 hover:bg-white/30 text-white mt-2"
              >
                ➕ Add LSEA to MetaMask
              </button>
            </div>
          </div>

          {/* Transfer Card */}
          <div className="card bg-white dark:bg-gray-800 shadow-2xl">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="card-title text-2xl text-green-600">Transfer Tokens</h2>
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-bold">Recipient Address</span>
                </label>
                <input
                  type="text"
                  placeholder="0x..."
                  className="input input-bordered w-full font-mono"
                  value={recipient}
                  onChange={e => setRecipient(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-bold">Amount</span>
                  <span className="label-text-alt">
                    Balance: {userBalance ? formatEther(userBalance) : "0"} {tokenSymbol}
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="10"
                  className="input input-bordered w-full font-bold text-xl"
                  value={transferAmount}
                  onChange={e => setTransferAmount(e.target.value)}
                />
              </div>

              <button
                className="btn btn-lg  btn-primary font-bold text-blue-600"
                onClick={handleTransfer}
                disabled={!recipient || !transferAmount}
              >
                Send Tokens
              </button>
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
                <Address address="0x6c94Ac3D01e2f185Fcd8338dFa86e929af968Bd0" />
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Standard:</span>
                <span className="badge badge-primary">ERC20</span>
              </div>
              <div className="flex justify-between">
                <a
                  href="https://sepolia-blockscout.lisk.com/address/0x6c94Ac3D01e2f185Fcd8338dFa86e929af968Bd0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  View on Blockscout →
                </a>
                <button
                  onClick={async () => {
                    try {
                      await (window as any).ethereum?.request({
                        method: "wallet_watchAsset",
                        params: {
                          type: "ERC20",
                          options: {
                            address: "0x6c94Ac3D01e2f185Fcd8338dFa86e929af968Bd0",
                            symbol: "LSEA",
                            decimals: 18,
                          },
                        },
                      });
                      notification.success("✅ Token added to MetaMask!");
                    } catch (error) {
                      notification.error("Failed to add token");
                    }
                  }}
                  className="btn btn-sm btn-primary"
                >
                  ➕ Add to Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
