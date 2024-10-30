"use client"

import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <div className=''>
            <hr className="border-none bg-slate-400 h-1 opacity-15 mt-20"></hr>
            <footer className="flex flex-col py-10 justify-center text-sm text-gray-700">
                <p className="cursor-default self-center">Licensed under <strong> Custom Academic License </strong></p>
                
                <div className="m-2 self-center space-y-2">
                        <div className="group flex flex-col rounded-lg" tabIndex="1">
                            <div className="flex cursor-pointer font-bold items-center justify-between">
                                <span className='text-xl'> Developer </span>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
                                    className="ml-3 invert h-2 w-3 transition-all duration-500 group-focus:-rotate-180" />
                            </div>
                            <div
                                className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
                                <ul className=" mt-5">
                              
                                    <Link href='https://yashdeepsingh2006.vercel.app/'><li className='mt-1 hover:text-blue-700'>Yashdeep singh</li></Link>
                                </ul>
                            </div>
                        </div>
                    </div>

            </footer>
        </div>
    )
}
