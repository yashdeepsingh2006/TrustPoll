"use client";

import Loader from '@/app/components/Loader';
import { getQuestion, vote } from '@/app/utils/ether';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function QuestionPage() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [author, setAuthor] = useState(null);
    const [totalVotes, setTotalVotes] = useState(0)
    const [optionCount, setOptionCount] = useState([])
    const [loading, setLoading] = useState(true); // Initially loading
    const [successNotification, setSuccessNotification] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const result = await getQuestion(id);
    
            setQuestion(result[0]);
            setOptions(result[1]);
            setAuthor(result[2]);
            const total = result[3].reduce((sum, val) => sum + Number(val), 0);
            setTotalVotes(total);
            setOptionCount(result[3])
        } catch (error) {
            console.error("Error fetching question:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleOptionChange = (option) => setSelectedOption(option);

    const addVote = async () => {
        if (selectedOption == null) return; // Ensure an option is selected
        setLoading(true);
        setSuccessNotification(false);

        try {
            const index = options.findIndex(option => option === selectedOption);
            await vote(id, index);
            setSuccessNotification(true);
        } catch (error) {
            console.error("Error casting vote:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Success Notification */}
            {successNotification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideInDown">
                    <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs">
                        <div className="success-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 px-[10px] shadow-lg backdrop-blur-md border border-green-300/20">
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
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-bold">Success ✅</p>
                                    <p className="text-white/90">Vote cast successfully!</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSuccessNotification(false)} 
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
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center min-h-screen pt-32 pb-20 px-4">
                {/* Poll Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-4xl border border-white/20">
                    {/* Question Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                            Poll #{id}
                        </h1>
                        <p className="text-2xl font-semibold text-white/90 leading-relaxed">
                            {question}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-4 mb-8">
                        {options.map((option, index) => {
                            const percentage = totalVotes > 0 ? ((Number(optionCount[index]) / totalVotes) * 100).toFixed(1) : 0;
                            const isSelected = selectedOption === option;
                            
                            return (
                                <label
                                    key={index}
                                    htmlFor={`option-${index}`}
                                    className={`relative block cursor-pointer transition-all duration-300 ${
                                        isSelected 
                                            ? 'bg-white/20 border-purple-400 transform scale-105' 
                                            : 'bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50'
                                    } backdrop-blur-sm rounded-2xl border-2 p-6 group`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                                                {index + 1}
                                            </div>
                                            <span className="text-white font-medium text-lg">{option}</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <div className="text-white/90 font-semibold">{percentage}%</div>
                                                <div className="text-white/60 text-sm">{Number(optionCount[index])} votes</div>
                                            </div>
                                            <input
                                                type="radio"
                                                name="poll-option"
                                                id={`option-${index}`}
                                                value={option}
                                                checked={isSelected}
                                                onChange={() => handleOptionChange(option)}
                                                className="w-5 h-5 text-purple-500 bg-white/20 border-white/30 focus:ring-purple-400 focus:ring-2"
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-1000 ease-out"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </label>
                            );
                        })}
                    </div>

                    {/* Selected Option Display */}
                    {selectedOption && (
                        <div className="mb-6 text-center">
                            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                                <span className="text-white/70 text-sm">Selected: </span>
                                <span className="text-white font-semibold">{selectedOption}</span>
                            </div>
                        </div>
                    )}

                    {/* Vote Button */}
                    <div className="text-center mb-8">
                        <button
                            onClick={addVote}
                            disabled={!selectedOption || loading}
                            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg transform ${
                                selectedOption && !loading
                                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover:shadow-xl hover:scale-105 active:scale-95'
                                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Casting Vote...</span>
                                </div>
                            ) : (
                                'Cast Your Vote'
                            )}
                        </button>
                    </div>

                    {/* Poll Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Total Votes */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth="2" 
                                        stroke="currentColor" 
                                        className="w-5 h-5 text-white"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm">Total Votes</p>
                                    <p className="text-white font-bold text-2xl">{totalVotes}</p>
                                </div>
                            </div>
                        </div>

                        {/* Author */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth="2" 
                                        stroke="currentColor" 
                                        className="w-5 h-5 text-white"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm">Created by</p>
                                    <p className="text-white font-mono text-sm break-all">{author}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
