import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/Axios';

function Post() {
    const token = localStorage.getItem("token")
    const [fieldError, setFieldError] = useState('');
    const [dbError, setDbError] = useState('');
    const titleRef = useRef();
    const descriptionRef = useRef();
    const locationRef = useRef();
    const salaryRef = useRef();
    const companyRef = useRef();
    const navigate = useNavigate();
    const empl_id = parseInt(localStorage.getItem('user_id')); // Get empl_id from local storage

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const location = locationRef.current.value || '';
        const salary = salaryRef.current.value || '';
        const company = companyRef.current.value || '';

        if (!title || !description) {
            return setFieldError('Title and Description are required fields.');
        }

        try {
            await axiosInstance.post('/jobs', {
                employer_id: empl_id,
                title,
                description,
                location,
                salary,
                company,
            }, {headers: { authorization: "Bearer " + token }});

            setTimeout(() => {
                alert('Job posted successfully!');
            }, 350);
            navigate('/job/my');
        } catch (error) {
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
                <textarea
                    className="w-80 h-32 p-3 border-2 border-gray-400 rounded-xl focus:h-40 focus:w-96 lg:w-96"
                    placeholder="Job Description"
                    ref={descriptionRef}
                ></textarea>
            </div>

            <div>
                <input
                    className="w-72 h-12 ml-1 border-2 border-gray-400 rounded-md pl-3 lg:w-80 lg:h-14"
                    type="text"
                    placeholder="Location (Optional)"
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

            <div>
                <input
                    className="w-72 h-12 ml-1 border-2 border-gray-400 rounded-md pl-3 lg:w-80 lg:h-14"
                    type="text"
                    placeholder="Company (Optional)"
                    ref={companyRef}
                />
            </div>

            {fieldError && <p className="text-red-600 italic animate-bounce">{fieldError}</p>}
            {dbError && <p className="text-red-600 italic animate-bounce">{dbError}</p>}

            <button className="w-32 h-10 bg-blue-800 rounded-md">Post Job</button>
        </form>
    );
}

export default Post;
