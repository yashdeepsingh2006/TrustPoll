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

    // Show Loading component if loading, otherwise show Nav
    if (loading) {
        return <Loader />;
    } else {
        return (
            <>
                <div className='flex flex-row justify-between px-3 md:px-9 py-3 shadow-md'>
                    <div>
                        <Image height={100} width={100} className='w-auto h-9' src='/images/Logo.png' alt='Logo' />
                    </div>
                    <div className='mt-1 mr-7'>
                        <svg onClick={toggleMenu} className='self-center hover:cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="rgb(46 16 101)" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                    </div>
                </div>

                {/* Menu */}
                <div className={`${isMenuOpen ? 'absolute' : 'hidden'} right-4`}>
                    <div className="w-52 mt-2 left-0 rounded-xl overflow-hidden flex flex-col items-center shadow-lg bg-white font-Roboto-light">
                        <div className="h-24 w-full bg-purple-400"></div>
                        <div className="top-16 z-50 flex items-center flex-col gap-4 px-5 py-5">
                            <div className="-mt-20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                            </div>

                            <div className="flex items-center flex-col">
                                <p className="text-black font-Roboto-md">Connected account</p>
                                <p className="text-xs text-gray-500 font-medium">
                                    {formatAccount(connectedAccount)} {/* Display formatted account */}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleConnectAccount}
                                    className="bg-purple-700 transition-all gradient text-[15px] text-white px-3 py-[6px] rounded-full flex items-center gap-1"
                                >
                                    Connect
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }


}
