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
        <>
            <div className='flex flex-col justify-center'>
                {successNotification && (
                    <div className="mt-1 self-center flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
                        <div className="success-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-green-100 px-[10px]">
                            <div className="flex gap-2">
                                <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-black font-bold">Success :)</p>
                                    <p className="text-black">Vote added successfully (refresh once)</p>
                                </div>
                            </div>
                            <button onClick={() => setSuccessNotification(false)} className="text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                <div className='flex flex-col items-center text-black'>
                    <div className="w-9/12 mt-20 px-4 py-5 bg-white flex flex-col gap-3 rounded-md shadow-[0px_0px_15px_rgba(0,0,0,0.09)]">
                        <p className="text-xl font-semibold mb-3 text-wrap">{question}</p>
                        {options.map((option, index) => (
                            <label
                                key={index}
                                htmlFor={`option-${index}`}
                                className="border border-gray-100 font-medium h-14 relative hover:bg-zinc-100 flex items-center px-7 gap-3 rounded-lg"
                            >
                                <div className='flex flex-row'>
                                    <h1>{option}</h1>
                                    <h1 className='self-end ml-16'>{`${(Number(optionCount[index].toString()) / Number(totalVotes)) * 100} %`}</h1>
                                </div>
                                <input
                                    type="radio"
                                    name="status"
                                    className="peer/html w-4 h-4 absolute right-3"
                                    id={`option-${index}`}
                                    onChange={() => handleOptionChange(option)}
                                />
                            </label>
                        ))}
                    </div>
                    <p className="mt-5 text-gray-700">Selected Option: {selectedOption}</p>

                    <div onClick={addVote} className="self-center mt-10 max-w-32 bg-transparent items-center justify-center flex border-2 border-purple-800 shadow-lg hover:bg-purple-800 text-purple-900 hover:text-white duration-300 cursor-pointer active:scale-[0.98] focus:border-purple-950">
                        <button className="px-5 py-2">Submit</button>
                    </div>

                    <h1 className='mt-14'>Author:</h1>
                    <h1 className='text-xs'>{author}</h1>
                </div>
            </div>
        </>
    );
}
