"use client";

import { useEffect, useState } from "react";
import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { getSignersForDataServiceId } from "@redstone-finance/sdk";
import { ethers } from "ethers";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

interface PriceDisplayProps {
  symbol: "ETH" | "BTC";
}

export const PriceDisplay = ({ symbol }: PriceDisplayProps) => {
  // State to track price and loading status
  const [price, setPrice] = useState<string>("0.00");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Get deployed PriceFeed contract info
  const { data: deployedContractData } = useDeployedContractInfo("PriceFeed");

  // TODO: Part C - Add fetchPrice function
    const fetchPrice = async () => {
    // Check if contract is deployed
    if (!deployedContractData) {
      setError("PriceFeed contract not deployed. Run: yarn deploy");
      setIsLoading(false);
      return;
    }

    // Check if wallet extension exists
    if (typeof window === "undefined" || !window.ethereum) {
      setError("Please connect your wallet to view prices");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Step 1: Create ethers provider from MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);

      // Step 2: Create ethers contract instance
      const contract = new ethers.Contract(
        deployedContractData.address, 
        deployedContractData.abi, 
        provider
      );

      // Step 3: Wrap contract with RedStone oracle data
      const wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
        dataPackagesIds: [symbol],  // Which price feed (ETH or BTC)
        authorizedSigners: getSignersForDataServiceId("redstone-main-demo"),  // Authorized oracle nodes
      });

      // Step 4: Call the contract function to get price
      const priceData = symbol === "ETH" 
        ? await wrappedContract.getEthPrice() 
        : await wrappedContract.getBtcPrice();

      if (!priceData) {
        throw new Error("No price data returned from oracle");
      }

      // Step 5: Format price (convert from 8 decimals to 2 decimals)
      const formattedPrice = (Number(priceData) / 1e8).toFixed(2);
      setPrice(formattedPrice);
      setLastUpdate(new Date());
      
    } catch (error) {
      console.error("Error fetching price:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch price");
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Part D - Add useEffect hook
  
  useEffect(() => {
    // Fetch price when component mounts
    fetchPrice();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchPrice, 60000);
    
    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, [deployedContractData, symbol]);

  // TODO: Part E - Add return JSX

  return (
    <div className="card bg-white dark:bg-gray-800 shadow-2xl border-t-4 border-green-500 hover:shadow-green-500/50 transition-all duration-300 hover:-translate-y-1">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-2xl">
            {symbol === "ETH" ? "💎" : "₿"} {symbol}/USD
          </h2>
          <span className="badge badge-success badge-lg">LIVE</span>
        </div>

        {error ? (
          <div className="alert alert-error">
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="loading loading-spinner loading-lg text-success"></span>
            <span className="mt-4 text-gray-500">Fetching live price...</span>
          </div>
        ) : (
          <div>
            <div className="text-center py-6">
              <div className="text-5xl font-black text-green-600 dark:text-green-400 mb-2">
                ${price}
              </div>
              <div className="text-sm text-gray-500">
                Updated: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Powered by RedStone</span>
              <button 
                className="btn btn-sm btn-outline btn-success" 
                onClick={fetchPrice} 
                disabled={isLoading}
              >
                {isLoading ? "Refreshing..." : "🔄 Refresh"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};