"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-full px-8 py-4 shadow-2xl">
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Lisk Builder DApp
              </h1>
            </div>
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the power of Web3 with our token claiming and NFT minting platform on Lisk Sepolia
          </p>

          {connectedAddress ? (
            <div className="inline-flex items-center gap-3 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded-full px-6 py-3 shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-green-800 dark:text-green-200">Connected:</span>
              <Address address={connectedAddress} />
            </div>
          ) : (
            <div className="inline-flex items-center gap-3 bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500 rounded-full px-6 py-3 shadow-lg">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold text-yellow-800 dark:text-yellow-200">
                Connect your wallet to get started
              </span>
            </div>
          )}
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Token Card */}
          <Link href="/token" className="group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    <span className="text-5xl">🪙</span>
                  </div>
                  <svg
                    className="w-8 h-8 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                <h2 className="text-3xl font-black mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LSEA Token
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                  Claim your free LSEA tokens! Get up to 100 tokens per wallet. One-time claim only.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Free token claiming</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Transfer to any address</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Max 100 tokens per wallet</span>
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold group-hover:gap-4 transition-all">
                  <span>Claim Tokens</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* NFT Card */}
          <Link href="/NFT" className="group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-1 shadow-2xl transition-all duration-300 hover:shadow-pink-500/50 hover:scale-105">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl shadow-lg">
                    <span className="text-5xl">🏆</span>
                  </div>
                  <svg
                    className="w-8 h-8 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-2 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                <h2 className="text-3xl font-black mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Builder Badge
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                  Mint your exclusive Lisk Builder Badge NFT. Unlimited free minting for all builders!
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Free NFT minting</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Mint to any address</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Unlimited minting</span>
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold group-hover:gap-4 transition-all">
                  <span>Mint NFT Badge</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 text-gray-800 dark:text-white">Why Use This DApp?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card bg-white dark:bg-gray-800 shadow-xl p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400">Built on Lisk Sepolia for fast and cheap transactions</p>
            </div>

            <div className="card bg-white dark:bg-gray-800 shadow-xl p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Secure & Safe</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Smart contracts verified on Blockscout for transparency
              </p>
            </div>

            <div className="card bg-white dark:bg-gray-800 shadow-xl p-6">
              <div className="text-4xl mb-4">🆓</div>
              <h3 className="text-xl font-bold mb-2">Completely Free</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No hidden fees. Just connect your wallet and start claiming!
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="card bg-base-200 dark:bg-gray-800 shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Developer Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/debug" className="btn btn-outline btn-lg">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Debug Contracts
              </Link>
              <Link href="/blockexplorer" className="btn btn-outline btn-lg">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Block Explorer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
