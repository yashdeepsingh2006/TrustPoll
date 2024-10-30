import { ethers } from "ethers";
import contractABI from "../abi/voting.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// Connect to wallet function
const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const provider = new ethers.BrowserProvider(window.ethereum); // Updated to BrowserProvider
      const signer = await provider.getSigner(); // Await getSigner in v6
      return signer;
    } catch (error) {
      console.error("User rejected the request or an error occurred:", error);
      throw error;
    }
  } else {
    alert("Please install MetaMask or another Ethereum wallet.");
    throw new Error("Ethereum wallet not found");
  }
};

// Get contract instance
const getContract = async () => {
  const signer = await connectWallet();
  if (!signer) {
    throw new Error("No signer available. Please connect to your wallet.");
  }
  return new ethers.Contract(contractAddress, contractABI, signer);
};

// Adding a question
export const addQuestion = async (question, options) => {
  try {
    const contract = await getContract();
    const tx = await contract.addQuestion(question, options);
    await tx.wait(); // Wait for transaction to be mined
  } catch (error) {
    console.error("Error adding question:", error);
  }
};

// Voting on a question
export const vote = async (id, index) => {
  try {
    const contract = await getContract();
    const tx = await contract.vote(id, index);
    await tx.wait();
  } catch (error) {
    console.error("Error voting:", error);
  }
};

// Get question by ID
export const getQuestion = async (id) => {
  try {
    const contract = await getContract();
    const result = await contract.getQuestion(id);
    return result;
  } catch (error) {
    console.error("Error fetching question:", error);
  }
};

// Get counter from contract
export const getCounter = async () => {
  try {
    const contract = await getContract();
    const counter = await contract.getCounter(); // Call getCounter function from contract
    return counter.toString(); // Return counter as a string for easier handling
  } catch (error) {
    console.error("Error fetching counter:", error);
    throw error;
  }
};


// Export all functions from this file
export default {
  connectWallet,
  getContract,
  addQuestion,
  vote,
  getQuestion,
  getCounter
};
