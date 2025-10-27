"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Events: NextPage = () => {
  const { isConnected, address: connectedAddress } = useAccount();
  const [eventType, setEventType] = useState<"token" | "nft">("token");

  // Get token transfer events
  const { data: tokenEvents, isLoading: tokenLoading } = useScaffoldEventHistory({
    contractName: "MyToken",
    eventName: "Transfer",
    fromBlock: 0n,
    watch: true,
  });

  // Get NFT transfer events
  const { data: nftEvents, isLoading: nftLoading } = useScaffoldEventHistory({
    contractName: "MyNFT",
    eventName: "Transfer",
    fromBlock: 0n,
    watch: true,
  });

  const currentEvents = eventType === "token" ? tokenEvents || [] : nftEvents || [];
  const isLoading = eventType === "token" ? tokenLoading : nftLoading;

  // Search and pagination state
  const [searhAddress, setSearchAddress] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter events based on search
  const filteredEvents = currentEvents.filter(event => {
    if (!searhAddress) return true;
    const search = searhAddress.toLowerCase();
    return event.args.from?.toLowerCase().includes(search) || event.args.to?.toLowerCase().includes(search);
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  // Show connection prompt if wallet not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500 rounded-full px-6 py-3 shadow-lg">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold text-yellow-800 dark:text-yellow-200">
                Connect your wallet to view events
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-full px-8 py-4 shadow-2xl">
              <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Transaction Events
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            View the transaction history for LSEA tokens and LBB NFTs on Lisk Sepolia
          </p>
        </div>

        {/* Tabs */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-teal-600 p-1 shadow-2xl mb-8 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6">
            <div className="flex justify-center">
              <div className="tabs tabs-boxed">
                <button
                  className={`tab text-lg font-semibold ${
                    eventType === "token"
                      ? "tab-active bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "text-gray-600"
                  }`}
                  onClick={() => {
                    setEventType("token");
                    setCurrentPage(1);
                    setSearchAddress("");
                  }}
                >
                  🪙 Token Transfers ({tokenEvents?.length || 0})
                </button>
                <button
                  className={`tab text-lg font-semibold ${
                    eventType === "nft"
                      ? "tab-active bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white"
                      : "text-gray-600"
                  }`}
                  onClick={() => {
                    setEventType("nft");
                    setCurrentPage(1);
                    setSearchAddress("");
                  }}
                >
                  🏆 NFT Activity ({nftEvents?.length || 0})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*Add search control */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">🔍 Search by Address</span>
              </label>
              <input
                type="text"
                placeholder="Enter address to filter (0x...)"
                value={searhAddress}
                onChange={e => {
                  setSearchAddress(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {searhAddress && (
                <label className="label">
                  <span className="label-text-alt">
                    Found {filteredEvents.length} events matching &quot;{searhAddress}
                  </span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              {eventType === "token" ? "🪙 Token Transfer Events" : "🎨 NFT Transfer Events"}
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
                <span className="ml-4">Loading events...</span>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-xl mb-2">No events found</p>
                <p className="text-sm">
                  {searhAddress
                    ? `No events match "${searhAddress}"`
                    : eventType === "token"
                    ? "Transfer some tokens to see events here"
                    : "Mint some NFTs to see events here"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>{eventType === "token" ? "Amount" : "Token ID"}</th>
                      <th>Block</th>
                      <th>Transaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEvents.map((event, index) => (
                      <tr key={`${event.log.transactionHash}-${index}`}>
                        <td>
                          <Address address={event.args.from} size="sm" />
                        </td>
                        <td>
                          <Address address={event.args.to} size="sm" />
                        </td>
                        <td>
                          {eventType === "token" ? (
                            <span className="font-mono font-bold">
                              {Number(formatEther(event.args[2] || 0n)).toFixed(2)} LSEA
                            </span>
                          ) : (
                            <span className="badge badge-primary badge-lg">#{event.args[2]?.toString()}</span>
                          )}
                        </td>
                        <td>
                          <span className="text-sm font-mono">{event.log.blockNumber.toString()}</span>
                        </td>
                        <td>
                          <a
                            href={`https://sepolia-blockscout.lisk.com/tx/${event.log.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-xs btn-outline"
                          >
                            View →
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/**Adding pagination controls */}
        {filteredEvents.length > itemsPerPage && (
          <div className="flex justify-center mt-6">
            <div className="join">
              <button
                className="join-item btn"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                « Previous
              </button>
              <button
                className="join-item btn"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next »
              </button>
            </div>
          </div>
        )}

        {/* Wallet Info */}
        <div className="card bg-base-200 dark:bg-gray-800 shadow-xl max-w-2xl mx-auto mt-8">
          <div className="card-body">
            <h3 className="text-2xl font-bold mb-6">Connected Wallet</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-600 dark:text-gray-300">Network:</span>
                <span>Lisk Sepolia Testnet</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-600 dark:text-gray-300">Your Address:</span>
                <Address address={connectedAddress} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
