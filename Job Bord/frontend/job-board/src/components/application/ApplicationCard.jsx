import React, { useState } from 'react';

function ApplicationCard({ app }) {
    const { title, fname, location, status, applied_at, email, salary, created_at, cv } = app;
    const dateApplied = new Date(applied_at);
    const datePosted = new Date(created_at);
    const formattedAppliedAt = `${dateApplied.toLocaleString('default', { month: 'short' })}-${dateApplied.getDate()}`;
    const formattedPostedAt = `${datePosted.toLocaleString('default', { month: 'short' })}-${datePosted.getDate()}`;
    const [show, setShow] = useState(false);

    const handleDetailToggle = () => {
        setShow((prev) => !prev);
    };

    return (
        <section className=" ">
            <div
                className={`flex w-5/6 h-36 justify-between bg-white ml-auto mr-auto mt-8 p-8
                    border-gray-400 border-2 rounded-md ${!show && 'shadow-[3px_3px_7px_blue]'} text-xl 
                    ${show && "shadow-[1px_0px_0px_blue] rounded-bl-none rounded-br-none border-b-0"} lg:w-3/4`}
            >
                {/* Application Info */}
                <div className="flex flex-col gap-1">
                    <p className="text-blue-700 text-2xl font-bold font-mono lg:text-3xl">{title}</p>
                    <p className="text-lg font-bold font-mono lg:text-xl">{fname}</p>
                </div>

                <p className="text-lg font-mono font-bold self-center lg:text-xl">{location}</p>
                <p className="text-lg font-mono font-bold self-center lg:text-xl">{status}</p>
                <p className="text-lg font-mono font-bold self-center lg:text-xl">{formattedAppliedAt}</p>
                <p className="text-lg font-mono font-bold self-center lg:text-xl">{email}</p>

                {/* Buttons */}
                <div className="flex flex-col h-32 relative bottom-3 gap-5 lg:flex-row lg:gap-8 lg:pt-8 ">
                    <button
                        onClick={handleDetailToggle}
                        className="min-w-28 h-10 bg-blue-800 rounded-md lg:w-36 lg:h-12"
                    >
                        {show ? "Show Less" : "Detail"}
                    </button>
                </div>
            </div>

            {/* Detail Section */}
            {<div
                className={`w-5/6 bg-white ml-auto mr-auto -mt-1 p-8 border-gray-400 border-2 border-t-0
                    rounded-bl-md rounded-br-md shadow-[1px_1px_0px_blue] ${!show && 'hidden'} text-xl lg:w-3/4`}
            >
                <p className="text-xl font-mono mb-3">
                    <strong>Salary:</strong> ${salary}
                </p>
                <p className="text-xl font-mono mb-3">
                    <strong>Posted At:</strong> {formattedPostedAt}
                </p>
                <p className="text-xl font-mono mb-3">
                    <strong>Resume:</strong> resume
                </p>
                <p className="text-xl font-mono mb-3">
                    <strong>CV:</strong> {cv}
                </p>
            </div>}
        </section>
    );
}

export default ApplicationCard;
