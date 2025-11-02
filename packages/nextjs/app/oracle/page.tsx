"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { PriceDisplay } from "../../components/example-ui/PriceDisplay";

const Oracle: NextPage = () => {
  const { isConnected } = useAccount();

  // TODO: Step 2 - Add wallet connection check
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-green-900 dark:to-teal-900 flex items-center justify-center p-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl">
          <div className="card-body text-center">
            <div className="text-6xl mb-4">🔮</div>
            <h2 className="card-title text-3xl justify-center mb-2">Oracle Price Feeds</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please connect your wallet to view live cryptocurrency prices
            </p>
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
              <span>Connect to see real-time prices powered by RedStone Oracle</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // TODO: Step 3 - Add main content

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-green-900 dark:to-teal-900 p-4">
      <div className="container mx-auto max-w-6xl py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-full px-8 py-4 shadow-2xl">
              <span className="text-5xl">🔮</span>
              <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Live Price Feeds
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-time cryptocurrency prices powered by RedStone Oracle
          </p>
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PriceDisplay symbol="ETH" />
          <PriceDisplay symbol="BTC" />
        </div>

        {/* Info Section */}
        <div className="card bg-base-200 dark:bg-gray-800 shadow-xl max-w-4xl mx-auto mt-12">
          <div className="card-body">
            <h3 className="text-2xl font-bold mb-4">💡 How It Works</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="badge badge-success badge-lg">1</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>RedStone Oracle:</strong> Fetches live prices from multiple exchanges
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="badge badge-success badge-lg">2</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Data Verification:</strong> Prices are cryptographically signed for security
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="badge badge-success badge-lg">3</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Smart Contract:</strong> Reads and validates price data on-chain
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="badge badge-success badge-lg">4</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Auto-Refresh:</strong> Prices update every 30 seconds automatically
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oracle;