import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axiosInstance from '../../axios/Axios';


function Post() {
    const token = localStorage.getItem("token")
    const [fieldError, setFieldError] = useState('');
    const [dbError, setDbError] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const titleRef = useRef();
    const descriptionRef = useRef();
    const locationRef = useRef();
    const salaryRef = useRef();
    const responsibilitiesRef = useRef();
    const criteriaRef = useRef();
    const deadlineRef = useRef();
    const navigate = useNavigate();
    const empl_id = parseInt(localStorage.getItem('user_id'));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const location = locationRef.current.value || '';
        const deadline = deadlineRef.current.value || '';
        const salary = salaryRef.current.value || '';
        const responsibilities = responsibilitiesRef.current.value || '';
        const criteria = criteriaRef.current.value || '';

        if (!title || !description || !location || !deadline) {
            return setFieldError('Fill all requered fields.');
        }

        setIsLoading(true)
        try {
            await axiosInstance.post('/jobs', {
                employer_id: empl_id,
                title,
                description,
                location,
                deadline,
                salary,
                responsibilities,
                criteria,
            }, { headers: { authorization: "Bearer " + token } });

            setIsLoading(true)
            alert('Job posted successfully!');
            navigate('/job/my');
        } catch (error) {
            setIsLoading(false)
            console.log(error);
            setDbError(error.response?.data?.msg || error.message);
        }
    };

    
    return (
        <form
            className="flex flex-col w-3/4 bg-gray-100 ml-auto mr-auto mt-16 p-6 gap-5 items-center border-2 border-gray-400 rounded-xl font-medium lg:text-lg"
            onSubmit={handleSubmit}
        >
            <p className="mb-4 text-2xl text-gray-800">Post a New Job</p>
            <p className="text-red-600 font-medium italic pr-28 lg:text-xl">* Required fields</p>

            <div>
                <span className="text-red-600 text-xl font-bold">*</span>
                <input
                    className="w-72 h-12 ml-1 border-2 border-gray-400 rounded-md pl-3 lg:w-80 lg:h-14"
                    type="text"
                    placeholder="Job Title"
                    ref={titleRef}
                />
            </div>


            <div>
                <span className="text-red-600 text-xl font-bold">*</span>
                <input
                    className="w-72 h-12 ml-1 border-2 border-gray-400 rounded-md pl-3 lg:w-80 lg:h-14"
                    type="text"
                    placeholder="Location/ Remote"
                    ref={locationRef}
                />
            </div>

            <div>
                <input
                    className="w-72 h-12 ml-1 border-2 border-gray-400 rounded-md pl-3 lg:w-80 lg:h-14"
                    type="text"
                    placeholder="Salary (Optional)"
                    ref={salaryRef}
                />
            </div>

            <div className="relative w-fit">
                <span className="text-red-600 text-xl font-bold">*</span>
                <input
                    className="w-72 h-12 ml-1 pl-10 border-2 border-gray-400 rounded-md text-right lg:w-80 lg:h-14"
                    type="date"
                    ref={deadlineRef}
                    
                    title="Select the deadline"
                />
                <span className="absolute left-3 top-1/2 pl-1 transform -translate-y-1/2 text-gray-500">
                    🗓 Deadline
                </span>
            </div>


            <div>
                <span className="text-red-600 text-xl font-bold">*</span>
                <textarea
                    className="w-80 h-32 p-3 border-2 border-gray-400 rounded-xl focus:h-40 focus:w-96 lg:w-96"
                    placeholder="Job Description"
                    ref={descriptionRef}
                ></textarea>
            </div>

            <div>
                <textarea
                    className="w-80 h-32 p-3 border-2 border-gray-400 rounded-xl focus:h-40 focus:w-96 lg:w-96"
                    placeholder="Responsibilities (Optional)"
                    ref={responsibilitiesRef}
                ></textarea>
            </div>

            <div>
                <textarea
                    className="w-80 h-32 p-3 border-2 border-gray-400 rounded-xl focus:h-40 focus:w-96 lg:w-96"
                    placeholder="criteria (Optional)"
                    ref={criteriaRef}
                ></textarea>
            </div>

            {fieldError && <p className="text-red-600 italic animate-bounce">{fieldError}</p>}
            {dbError && <p className="text-red-600 italic animate-bounce">{dbError}</p>}

            <button className="w-40 h-10 bg-blue-800 rounded-md ">
                {
                    isLoading ?
                    <> <ClipLoader size={20} /> Please wait...</>
                    : <>Post Job</>
                }
            </button>
        </form>
    );
}

export default Post;
