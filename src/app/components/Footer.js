"use client"

import React, { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative bg-blue-900">
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

            <footer className="relative overflow-hidden py-12 px-6">
                {/* Background Elements - Same as Body */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto">


                    {/* Main Content */}
                    <div className="flex flex-col items-center space-y-8">

                        {/* Status Indicators */}
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <div className="flex items-center space-x-2 text-white/70 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>Blockchain Powered</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white/70 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                <span>Decentralized</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white/70 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <span>Transparent</span>
                            </div>
                        </div>

                        {/* Developer Section */}
                        <div className="w-full max-w-md">
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:bg-white/20 shadow-2xl">
                                {/* Header */}
                                <div
                                    className="cursor-pointer p-6 flex items-center justify-between select-none"
                                    onClick={toggleDropdown}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-5 h-5 text-white"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-xl font-bold text-white">Developer</span>
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        className={`w-5 h-5 text-white/60 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                        />
                                    </svg>
                                </div>

                                {/* Dropdown Content */}
                                <div className={`overflow-hidden transition-all duration-500 ${isDropdownOpen
                                        ? 'max-h-96 opacity-100'
                                        : 'max-h-0 opacity-0'
                                    }`}>
                                    <div className="px-6 pb-6 border-t border-white/20">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4">
                                            {/* Profile Section */}
                                            <div className="flex items-center space-x-4 mb-4">
                                                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        className="w-6 h-6 text-white"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <Link href="https://yashdeepsingh.vercel.app/" className="text-white font-semibold text-lg hover:text-purple-300 transition-colors duration-300">
                                                        Yashdeep Singh
                                                    </Link>
                                                    <p className="text-white/70 text-sm">Full Stack Developer</p>
                                                </div>
                                            </div>

                                            {/* Skills/Technologies */}
                                            <div className="space-y-2 mb-4">
                                                <p className="text-white/80 text-sm font-medium">Technologies Used:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs">Next.js</span>
                                                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs">React</span>
                                                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs">Ethereum</span>
                                                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs">Solidity</span>
                                                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs">Tailwind CSS</span>
                                                </div>
                                            </div>

                                            {/* Visit Portfolio Button */}
                                            <Link href="https://yashdeepsingh2006.vercel.app/" className="block">
                                                <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="2"
                                                            stroke="currentColor"
                                                            className="w-4 h-4"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                                            />
                                                        </svg>
                                                        <span>Visit Portfolio</span>
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* Copyright */}
                        <div className="text-center pt-8 border-t border-white/20">
                            <p className="text-white/60 text-sm">
                                © 2024 TrustPoll. Built with{" "}
                                <span className="text-red-400">❤️</span> for transparency.
                            </p>
                        </div>

                        {/* License Section */}
                        <div className="text-center mb-8">
                            <p className="text-white/70 text-sm">
                                Licensed under{" "}
                                <span className="font-bold text-white bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                                    Custom Academic License
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
