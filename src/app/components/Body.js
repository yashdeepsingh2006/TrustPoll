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
            <div className="flex flex-col">

                {/* Notifications  */}
                <div className="absolute self-center">
                    {/* Sucess */}
                    <div className={`${sucessNotification === true ? 'flex' : 'hidden'} flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50`}>
                        <div
                            className="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-green-100 px-[10px]"
                        >
                            <div className="flex gap-2">
                                <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
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
                                    <p className="text-black font-bold">Sucess :)</p>
                                    <p className="text-black">Question added sucessfully</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleSucessNotification}
                                className=" text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
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
                    <div className={`${errorNotification === true ? 'flex' : 'hidden'} flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50`}>
                        <div
                            className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]"
                        >
                            <div className="flex gap-2">
                                <div className="text-[#d65563] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
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
                                    <p className="text-white">Error</p>
                                    <p className="text-gray-500">Please fill all the feilds</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleErrorNotification}
                                className="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
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
                <form className="form self-center mt-28  rounded-full border border-b-0" onSubmit={(e) => e.preventDefault()}>
                    <input
                        ref={inputRef}
                        onKeyDown={handleKeyDown} // Add onKeyDown event to listen for Enter
                        className="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-500 transition-all duration-300 shadow-md"
                        placeholder="Search..."
                        type="text"
                    />
                </form>

                {/* OR Divider */}
                <div className="flex items-center my-10 px-7">
                    <div className="flex-grow border-t-2 border-gray-400"></div>
                    <span className="mx-2 text-xl font-bold text-purple-950">OR</span>
                    <div className="flex-grow border-t-2 border-gray-400"></div>
                </div>

                {/* New Question */}
                <h1 className="self-center text-2xl font-black text-purple-800 font-sans">New question</h1>

                <div className="mt-7 flex flex-col self-center justify-start w-9/12 md:w-3/5 lg:w-1/2">
                    <h2 className="text-purple-800 font-sans font-light">Question statement</h2>
                    <input
                        ref={textRef}
                        className="rounded-2xl h-8 mt-2 border border-gray-300 px-3 text-gray-500"
                        type="text"
                        required
                    />
                </div>

                {/* Options */}
                <div className="self-center w-9/12 md:w-3/5 lg:w-1/2">
                    {options.map((option, index) => (
                        <div key={index} className="mt-4">
                            <h2 className="text-purple-800 font-sans font-light">Option {index + 1}</h2>
                            <input
                                className="rounded-2xl w-full h-8 mt-2 border border-gray-300 px-3 text-gray-500"
                                type="text"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                required
                            />
                        </div>
                    ))}
                </div>

                {/* Add Option Button */}
                <Image className="self-center mt-7" onClick={addOption} height={40} width={40} src='/images/addOption.svg' alt="ADD more" />

                <div
                    onClick={handleNewQuestion}
                    className="self-center my-10 max-w-32 bg-transparent items-center justify-center flex border-2 border-purple-800 shadow-lg hover:bg-purple-800 text-purple-900 hover:text-white duration-300 cursor-pointer active:scale-[0.98] focus:border-purple-950"
                >
                    <button className="px-5 py-2">Submit</button>
                </div>
            </div>
        );
    }
}
