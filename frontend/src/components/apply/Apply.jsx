import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from '../../axios/Axios';
import ButtonComponent from '../smallComponents/ButtonComponent';

function Apply() {
  const token = localStorage.getItem("token");
  const fname = localStorage.getItem("fname");
  const seeker_id = parseInt(localStorage.getItem('user_id'));
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const letterRef = useRef();
  const resumeRef = useRef();
  const location = useLocation();
  const job_id = location?.state?.job_id;
  const title = location?.state?.title;

  // Resume validation rules
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  // Validation Functions
  const validateCoverLetter = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Cover letter is required.";
    if (trimmed.length < 10) return "Cover letter must be at least 10 characters long.";
    if (trimmed.length > 1000) return "Cover letter cannot exceed 1000 characters.";
    return '';
  };

  const validateResume = (file) => {
    if (!file) return "Please upload a resume.";
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Only PDF or Word documents (.doc, .docx) are allowed.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 10MB limit.";
    }
    return '';
  };

  // Real-time validation handlers
  const handleLetterChange = (e) => {
    const error = validateCoverLetter(e.target.value);
    setErrors((prev) => ({ ...prev, coverLetter: error }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    const error = validateResume(file);
    setErrors((prev) => ({ ...prev, resume: error }));
  };

  // Form submission validation
  const validateForm = () => {
    const newErrors = {
      coverLetter: validateCoverLetter(letterRef.current.value),
      resume: validateResume(resumeRef.current.files[0]),
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

    const letter = letterRef.current.value;
    const resume = resumeRef.current.files[0];
    const formData = new FormData();
    formData.append("job_id", job_id);
    formData.append("title", title);
    formData.append("seeker_id", seeker_id);
    formData.append("resume", resume);
    formData.append("cover_letter", letter);
    setIsLoading(true);

    try {
      await axiosInstance.post("jobs/apply", formData, {
        headers: { authorization: "Bearer " + token }
      });
      setErrors({}); // Clear errors on success
      setTimeout(() => {
        alert("Application sent successfully!");
        navigate("/apply/my");
      }, 350);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrors((prev) => ({
        ...prev,
        general: error.response?.data?.msg || 'An error occurred while submitting the application.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/80 shadow-lg rounded-2xl p-8 mt-12 mb-12 transition-all duration-300 hover:shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Apply as <span className="text-indigo-600">{fname}</span>
        </h2>

        <div className="space-y-6">
          {/* Cover Letter Section */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter <span className="text-red-500">*</span>
            </label>
            <textarea
              ref={letterRef}
              className={`w-full p-3 border ${errors.coverLetter ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y min-h-[120px] hover:border-gray-400`}
              placeholder="Write your cover letter here..."
              onChange={handleLetterChange}
            />
            {errors.coverLetter && (
              <p className="text-red-500 text-xs mt-1">{errors.coverLetter}</p>
            )}
          </div>

          {/* Resume Upload Section */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Your Resume <span className="text-red-500">*</span>
            </label>
            <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors duration-200 ${errors.resume ? 'border-red-500' : 'border-gray-300 hover:border-indigo-500'}`}>
              <div className="space-y-1 text-center">
                <input
                  ref={resumeRef}
                  name="resume"
                  type="file"
                  className="sr-only"
                  id="resume-upload"
                  onChange={handleResumeChange}
                />
                <label
                  htmlFor="resume-upload"
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                >
                  <span>Upload a file</span>
                </label>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </div>
            {errors.resume && (
              <p className="text-red-500 text-xs mt-1">{errors.resume}</p>
            )}
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="text-red-600 text-sm italic text-center animate-pulse">
              {errors.general}
            </div>
          )}

          {/* Submit Button */}
          <ButtonComponent
            handleClick={handleSubmit}
            buttonName={isLoading ? 'Please wait...' : 'Submit'}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
}

export default Apply;
