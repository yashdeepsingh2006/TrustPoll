"use client"

// context/AccountContext.js
import { createContext, useContext, useState } from 'react';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState(null);

    const connectAccount = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts && accounts.length > 0) {
                    setAccount(accounts[0]);
                    return accounts[0];
                } else {
                    console.log("No accounts found.");
                    return null;
                }
            } catch (error) {
                console.error("Failed to connect wallet:", error);
                return null;
            }
        } else {
            alert("Please install MetaMask to connect your wallet.");
            return null;
        }
    };

    return (
        <AccountContext.Provider value={{ account, connectAccount }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => useContext(AccountContext);
