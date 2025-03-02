import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axiosInstance from '../../axios/Axios';

function Post() {
    const token = localStorage.getItem("token");
    const [fieldError, setFieldError] = useState('');
    const [dbError, setDbError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
        const location = locationRef.current.value;
        const deadline = deadlineRef.current.value;
        const salary = salaryRef.current.value || '';
        const responsibilities = responsibilitiesRef.current.value || '';
        const criteria = criteriaRef.current.value || '';

        if (!title || !description || !location || !deadline) {
            return setFieldError('Please fill all required fields.');
        }

        setIsLoading(true);
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

            setTimeout(() => {
                alert('Job posted successfully!');
                navigate('/job/my');
            }, 350);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setDbError(error.response?.data?.msg || error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 my-12 transition-all duration-300 hover:shadow-xl"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Post a New Job
                </h2>

                <div className="space-y-6">
                    {/* Job Title */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            ref={titleRef}
                            type="text"
                            placeholder="Enter job title"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-400"
                        />
                    </div>

                    {/* Location */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location <span className="text-red-500">*</span>
                        </label>
                        <input
                            ref={locationRef}
                            type="text"
                            placeholder="Location or 'Remote'"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-400"
                        />
                    </div>

                    {/* Salary */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Salary per month in $ (Optional)
                        </label>
                        <input
                            ref={salaryRef}
                            type="text"
                            placeholder="e.g., 5000 - 6000"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-400"
                        />
                    </div>

                    {/* Deadline */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deadline <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                📅
                            </span>
                            <input
                                ref={deadlineRef}
                                type="date"
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-400 appearance-none"
                            />
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            ref={descriptionRef}
                            placeholder="Describe the job role and requirements"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y min-h-[120px] hover:border-gray-400"
                        />
                    </div>

                    {/* Responsibilities */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Responsibilities (Optional)
                        </label>
                        <textarea
                            ref={responsibilitiesRef}
                            placeholder="List key responsibilities"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y min-h-[120px] hover:border-gray-400"
                        />
                    </div>

                    {/* Criteria */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Criteria (Optional)
                        </label>
                        <textarea
                            ref={criteriaRef}
                            placeholder="Specify required qualifications or skills"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y min-h-[120px] hover:border-gray-400"
                        />
                    </div>

                    {/* Error Messages */}
                    {(fieldError || dbError) && (
                        <div className="text-red-600 text-sm italic text-center animate-pulse">
                            {fieldError || dbError}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        disabled={isLoading}
                        className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold transition-all duration-200
              ${isLoading
                                ? 'opacity-75 cursor-not-allowed'
                                : 'hover:bg-indigo-700 hover:shadow-lg active:bg-indigo-800'}`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <ClipLoader size={20} color="#ffffff" />
                                <span>Posting...</span>
                            </div>
                        ) : (
                            'Post Job'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Post;
