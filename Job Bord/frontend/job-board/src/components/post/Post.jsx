import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/Axios';
import ButtonComponent from '../smallComponents/ButtonComponent';

function Post() {
    const token = localStorage.getItem("token");
    const [errors, setErrors] = useState({});
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
    const date = new Date();
    const today = date.toISOString().split('T')[0];

    // Validation Functions
    const validateTitle = (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "Job title is required.";
        if (trimmed.length < 3) return "Title must be at least 3 characters long.";
        if (trimmed.length > 100) return "Title cannot exceed 100 characters.";
        if (!/^(?=(.*[A-Za-z]){2})[A-Za-z0-9.,&()\-\/\s]+$/.test(trimmed)) {
            return "Title must contain at least 2 letters.";
        }
        return '';
    };

    const validateDescription = (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "Description is required.";
        if (trimmed.length < 20) return "Description must be at least 20 characters long.";
        if (trimmed.length > 5000) return "Description cannot exceed 5000 characters.";
        return '';
    };

    const validateLocation = (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "Location is required.";
        if (trimmed.length < 2) return "Location must be at least 2 characters long.";
        if (trimmed.length > 100) return "Location cannot exceed 100 characters.";
        return '';
    };

    const validateDeadline = (value) => {
        if (!value) return "Deadline is required.";
        const deadlineDate = new Date(value);
        const todayDate = new Date(today);
        const oneYearFromToday = new Date(todayDate);
        oneYearFromToday.setFullYear(todayDate.getFullYear() + 1);

        if (isNaN(deadlineDate.getTime())) return "Please enter a valid date.";
        if (deadlineDate <= todayDate) return "Deadline must be a future date.";
        if (deadlineDate > oneYearFromToday) return "Deadline cannot be more than 1 year from today.";
        return '';
    };

    const validateSalary = (value) => {
        const trimmed = value.trim();
        if (!trimmed) return ''; // Optional field
        const salaryPattern = /^(\d{1,7}(?:-\d{1,7})?)$/;
        if (!salaryPattern.test(trimmed)) {
            return "Please enter a valid salary (e.g., 50000 or 40000-60000).";
        }
        if (trimmed.includes('-')) {
            const [min, max] = trimmed.split('-').map(Number);
            if (min >= max) return "Minimum salary must be less than maximum.";
            if (min < 1000 || max > 9999999) return "Salary must be between 1000 and 9999999.";
        } else if (Number(trimmed) < 1000 || Number(trimmed) > 9999999) {
            return "Salary must be between 1000 and 9999999.";
        }
        return '';
    };

    const validateResponsibilities = (value) => {
        const trimmed = value.trim();
        if (!trimmed) return ''; // Optional field
        if (trimmed.length < 10) return "Responsibilities must be at least 10 characters long if provided.";
        if (trimmed.length > 2000) return "Responsibilities cannot exceed 2000 characters.";
        return '';
    };

    const validateCriteria = (value) => {
        const trimmed = value.trim();
        if (!trimmed) return ''; // Optional field
        if (trimmed.length < 10) return "Criteria must be at least 10 characters long if provided.";
        if (trimmed.length > 2000) return "Criteria cannot exceed 2000 characters.";
        return '';
    };

    // Real-time validation handler
    const handleChange = (field, value) => {
        let error = '';
        switch (field) {
            case 'title': error = validateTitle(value); break;
            case 'description': error = validateDescription(value); break;
            case 'location': error = validateLocation(value); break;
            case 'deadline': error = validateDeadline(value); break;
            case 'salary': error = validateSalary(value); break;
            case 'responsibilities': error = validateResponsibilities(value); break;
            case 'criteria': error = validateCriteria(value); break;
            default: break;
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    // Form submission validation
    const validateForm = () => {
        const newErrors = {
            title: validateTitle(titleRef.current.value),
            description: validateDescription(descriptionRef.current.value),
            location: validateLocation(locationRef.current.value),
            deadline: validateDeadline(deadlineRef.current.value),
            salary: validateSalary(salaryRef.current.value),
            responsibilities: validateResponsibilities(responsibilitiesRef.current.value),
            criteria: validateCriteria(criteriaRef.current.value),
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear general error before validation
        setErrors((prev) => ({ ...prev, general: '' }));

        if (!validateForm()) {
            setErrors((prev) => ({ ...prev, general: 'Please fix the errors before submitting.' }));
            return;
        }

        setIsLoading(true);
        try {
            await axiosInstance.post(
                '/jobs',
                {
                    employer_id: empl_id,
                    title: titleRef.current.value.trim(),
                    description: descriptionRef.current.value.trim(),
                    location: locationRef.current.value.trim(),
                    deadline: deadlineRef.current.value,
                    salary: salaryRef.current.value.trim() || '',
                    responsibilities: responsibilitiesRef.current.value.trim() || '',
                    criteria: criteriaRef.current.value.trim() || '',
                },
                { headers: { authorization: "Bearer " + token } }
            );

            // Clear errors on success
            setErrors({});
            setTimeout(() => {
                alert('Job posted successfully!');
                navigate('/job/my');
            }, 350);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setErrors((prev) => ({
                ...prev,
                general: error.response?.data?.msg || 'An error occurred while posting the job.',
            }));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-white/90 shadow-lg rounded-2xl p-8 my-12 transition-all duration-300 hover:shadow-xl"
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
                            onChange={(e) => handleChange('title', e.target.value)}
                            className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-400`}
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
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
                            onChange={(e) => handleChange('location', e.target.value)}
                            className={`w-full p-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-400`}
                        />
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
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
                            onChange={(e) => handleChange('salary', e.target.value)}
                            className={`w-full p-3 border ${errors.salary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-400`}
                        />
                        {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
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
                                onChange={(e) => handleChange('deadline', e.target.value)}
                                className={`w-full p-3 pl-10 border ${errors.deadline ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-400 appearance-none`}
                            />
                        </div>
                        {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>}
                    </div>

                    {/* Job Description */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            ref={descriptionRef}
                            placeholder="Describe the job role and requirements"
                            onChange={(e) => handleChange('description', e.target.value)}
                            className={`w-full p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y min-h-[120px] hover:border-gray-400`}
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Responsibilities */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Responsibilities (Optional)
                        </label>
                        <textarea
                            ref={responsibilitiesRef}
                            placeholder="List key responsibilities"
                            onChange={(e) => handleChange('responsibilities', e.target.value)}
                            className={`w-full p-3 border ${errors.responsibilities ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y min-h-[120px] hover:border-gray-400`}
                        />
                        {errors.responsibilities && <p className="text-red-500 text-xs mt-1">{errors.responsibilities}</p>}
                    </div>

                    {/* Criteria */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Criteria (Optional)
                        </label>
                        <textarea
                            ref={criteriaRef}
                            placeholder="Specify required qualifications or skills"
                            onChange={(e) => handleChange('criteria', e.target.value)}
                            className={`w-full p-3 border ${errors.criteria ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y min-h-[120px] hover:border-gray-400`}
                        />
                        {errors.criteria && <p className="text-red-500 text-xs mt-1">{errors.criteria}</p>}
                    </div>

                    {/* General Error */}
                    {errors.general && (
                        <div className="text-red-600 text-sm italic text-center animate-pulse">
                            {errors.general}
                        </div>
                    )}

                    {/* Submit Button */}
                    <ButtonComponent
                        isLoading={isLoading}
                        buttonName={isLoading ? 'Please wait..' : 'Post'}
                        handleClick={handleSubmit}
                    />
                </div>
            </form>
        </div>
    );
}

export default Post;
