"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addQuestion, getCounter } from "../utils/ether";
import Loader from "./Loader";

export default function Body() {
    const router = useRouter();
    const [options, setOptions] = useState(["", ""]);
    const [errorNotification, setErrorNotification] = useState(false);
    const [sucessNotification, setSucessNotification] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const textRef = useRef(null);
    const [counter, setCounter] = useState(null);

    useEffect(() => {
        // Fetch counter on component mount
        const fetchCounter = async () => {
            const currentCounter = await getCounter();
            setCounter(currentCounter - 1); // Initialize counter
        };
        fetchCounter();
    }, []);

    // toggle functions
    const toggleErrorNotification = () => {
        setErrorNotification(false);
    };

    const toggleSucessNotification = () => {
        setSucessNotification(false);
    };

    const addOption = () => {
        setOptions([...options, ""]); // Add an empty string to represent a new option
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value; // Update the specific option's value
        setOptions(updatedOptions);
    };

    // SEARCH 
    // Get question by id
    const handleSearch = () => {
        const id = inputRef.current.value;
        if (id) {
            router.push(`/routes/question/${id}`); // Navigate to the dynamic route with the input value as the id
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            handleSearch(); // Call handleSearch when Enter is pressed
        }
    };

    // Get counter and update after question submission
    const counterValue = async () => {
        const updatedCounter = await getCounter();
        setCounter(updatedCounter);
    };

    // ADD QUESTION 
    const handleNewQuestion = async () => {
        // Reset notifications
        setErrorNotification(false);
        setSucessNotification(false);
        setLoading(true);
    
        try {
            if (textRef.current?.value.trim() && options.length >= 2) { // Check for non-empty question
                const questionId = await addQuestion(textRef.current.value, options); // Retrieve the question ID
                setSucessNotification(true);
                await counterValue(); // Update counter
                alert(`Question added successfully! ID: ${counter+1}`); // Display the question ID in an alert
            } else {
                setErrorNotification(true);
            }
        } catch (error) {
            console.error("Error adding question:", error);
            alert("Failed to add question. Check console for details.");
        }
        setLoading(false);
    }; 

    if (loading) {
        return (<Loader />);
    } else {
        return (
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-blue-900 relative overflow-hidden pb-20">

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
                </div>

                {/* Notifications  */}
                <div className="absolute self-center z-50 top-4">
                    {/* Success */}
                    <div className={`${sucessNotification === true ? 'flex animate-slideInDown' : 'hidden'} flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs`}>
                        <div
                            className="success-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 px-[10px] shadow-lg backdrop-blur-md border border-green-300/20"
                        >
                            <div className="flex gap-2">
                                <div className="text-white bg-white/20 backdrop-blur-xl p-2 rounded-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m4.5 12.75 6 6 9-13.5"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-bold">Success</p>
                                    <p className="text-white/90">Question added successfully</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleSucessNotification}
                                className="text-white/80 hover:bg-white/10 p-2 rounded-lg transition-all duration-200 hover:scale-105"
                            >
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
                                        d="M6 18 18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    <div className={`${errorNotification === true ? 'flex animate-slideInDown' : 'hidden'} flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs`}>
                        <div
                            className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-[10px] shadow-lg backdrop-blur-md border border-red-300/20"
                        >
                            <div className="flex gap-2">
                                <div className="text-white bg-white/20 backdrop-blur-xl p-2 rounded-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-bold">Error ❌</p>
                                    <p className="text-white/90">Please fill all the fields</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleErrorNotification}
                                className="text-white/80 hover:bg-white/10 p-2 rounded-lg transition-all duration-200 hover:scale-105"
                            >
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
                                        d="M6 18 18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>



                </div>

                {/* Search */}
                <div className="relative z-10 flex flex-col items-center mt-32">
                    <div className="mb-8 text-center">
                        <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                            TrustPoll
                        </h1>
                        <p className="text-white/70 text-lg">Create and discover polls with blockchain transparency</p>
                    </div>
                    
                    <form className="flex flex-row form self-center rounded-full shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 group" onSubmit={(e) => e.preventDefault()}>
                        <input
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            className="input rounded-full px-8 py-4 bg-transparent focus:outline-none placeholder-white/60 text-white transition-all duration-300 w-60 lg:w-80 "
                            placeholder="Search for a poll by ID..."
                            type="text"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* OR Divider */}
                <div className="flex items-center my-16 px-7 relative z-10">
                    <div className="flex-grow border-t border-white/30"></div>
                    <span className="mx-6 text-2xl font-bold text-white bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                        OR
                    </span>
                    <div className="flex-grow border-t border-white/30"></div>
                </div>

                {/* New Question Section */}
                <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-11/12 max-w-2xl border border-white/20">
                        <h1 className="text-center text-3xl font-bold text-white mb-8 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                            Create New Poll
                        </h1>

                        <div className="flex flex-col space-y-6">
                            <div>
                                <label className="block text-white/90 font-medium mb-3 text-lg">Question Statement</label>
                                <input
                                    ref={textRef}
                                    className="w-full rounded-2xl h-12 px-4 bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                    placeholder="What would you like to ask?"
                                    type="text"
                                    required
                                />
                            </div>

                            {/* Options */}
                            <div className="space-y-4">
                                <label className="block text-white/90 font-medium text-lg">Poll Options</label>
                                {options.map((option, index) => (
                                    <div key={index} className="relative group">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                                                {index + 1}
                                            </div>
                                            <input
                                                className="flex-1 rounded-2xl h-12 px-4 bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                                type="text"
                                                placeholder={`Option ${index + 1}`}
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Option Button */}
                            <button
                                onClick={addOption}
                                className="self-center flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
                            >
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
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                <span>Add Option</span>
                            </button>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    onClick={handleNewQuestion}
                                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 text-lg"
                                >
                                    Create Poll
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
