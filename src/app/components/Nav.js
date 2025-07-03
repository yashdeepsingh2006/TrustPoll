"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAccount } from '../context/AccountContext';
import Loader from './Loader';

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [connectedAccount, setConnectedAccount] = useState("");
    const { account, connectAccount } = useAccount();
    const [loading, setLoading] = useState(false);

    const handleConnectAccount = async () => {
        setLoading(true);
        await connectAccount();
        setConnectedAccount(account);
        setLoading(false);
    };

    // Helper function to format the account address
    const formatAccount = (account) => {
        if (account != "none") {
            return account ? `${account.slice(0, 5)}...${account.slice(-5)}` : "none";
        }else{
            return "none"
        }
    };

    useEffect(() => {
        setConnectedAccount(formatAccount(account));
    }, [account]);

    // Toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle')) {
                setIsMenuOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    // Show Loading component if loading, otherwise show Nav
    if (loading) {
        return <Loader />;
    } else {
        return (
            <>
                {/* Backdrop Overlay */}
                {isMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}

                {/* Fixed Navigation Bar */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg">
                    <div className="flex justify-between items-center px-6 md:px-12 py-4">
                        {/* Logo Section */}
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl libertinus-mono-regular font-bold text-white bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                                TrustPoll
                            </h1>
                        </div>

                        {/* Menu Toggle Button */}
                        <button
                            onClick={toggleMenu}
                            className="menu-toggle w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className={`w-6 h-6 text-white transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Dropdown Menu */}
                <div className={`nav-menu fixed top-20 right-6 z-50 transition-all duration-300 ${
                    isMenuOpen 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                }`}>
                    <div className="w-80 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                        {/* Header Section */}
                        <div className="relative h-24 bg-gradient-to-r from-purple-500 to-blue-500 overflow-hidden">
                            {/* Animated Background Elements */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
                            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full animate-pulse animation-delay-2000"></div>
                            
                            {/* Header Content */}
                            <div className="relative z-10 flex items-center justify-center h-full">
                                <div className="text-center">
                                    <h3 className="text-white font-bold text-lg">Wallet Connection</h3>
                                    <p className="text-white/80 text-sm">Manage your account</p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Section */}
                        <div className="p-6 space-y-6">
                           

                            {/* Connection Status */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-white/90 font-medium">Connection Status</span>
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-2 h-2 rounded-full ${
                                            connectedAccount !== "none" ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                                        }`}></div>
                                        <span className="text-white/70 text-sm">
                                            {connectedAccount !== "none" ? 'Connected' : 'Disconnected'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="text-center">
                                    <p className="text-white/60 text-sm mb-1">Account Address</p>
                                    <p className="text-white font-mono text-lg bg-white/10 rounded-lg px-3 py-2 border border-white/20">
                                        {connectedAccount}
                                    </p>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 text-white/80">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm">Blockchain Powered</span>
                                </div>
                                <div className="flex items-center space-x-3 text-white/80">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm">Decentralized Voting</span>
                                </div>
                                <div className="flex items-center space-x-3 text-white/80">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm">Transparent Results</span>
                                </div>
                            </div>

                            {/* Connect Button */}
                            <button
                                onClick={handleConnectAccount}
                                disabled={loading}
                                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${
                                    connectedAccount !== "none"
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                                        : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Connecting...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                                            />
                                        </svg>
                                        <span>
                                            {connectedAccount !== "none" ? 'Reconnect Wallet' : 'Connect Wallet'}
                                        </span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
