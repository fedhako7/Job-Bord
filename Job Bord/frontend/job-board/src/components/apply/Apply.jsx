import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from '../../axios/Axios';
import ButtonComponent from '../smallComponents/ButtonComponent';

function Apply() {
  const token = localStorage.getItem("token");
  const fname = localStorage.getItem("fname");
  const seeker_id = parseInt(localStorage.getItem('user_id'));
  const navigate = useNavigate();
  const [fieldError, setFieldError] = useState('');
  const [resumeError, setResumeError] = useState('');
  const [dbError, setDbError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const letterRef = useRef();
  const resumeRef = useRef();
  const location = useLocation();
  const job_id = location?.state?.job_id;
  const title = location?.state?.title;

  // Resume validation rules
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const validateResume = (file) => {
    if (!file) {
      setResumeError('Please upload a resume.');
      return false;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setResumeError('Only PDF or Word documents (.doc, .docx) are allowed.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setResumeError('File size exceeds 10MB limit.');
      return false;
    }
    setResumeError('');
    return true;
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    validateResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const letter = letterRef.current.value;
    const resume = resumeRef.current.files[0];

    // Validate inputs
    if (!letter) {
      setFieldError("Please fill in all required fields.");
      return;
    }
    if (!validateResume(resume)) {
      return;
    }

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
      setTimeout(() => {
        alert("Application sent successfully!");
      }, 350);
      setIsLoading(false);
      navigate("/apply/my");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setDbError(error.response?.data?.msg || error.message);
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y min-h-[120px] hover:border-gray-400"
              placeholder="Write your cover letter here..."
            />
          </div>

          {/* Resume Upload Section */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Your Resume <span className="text-red-500">*</span>
            </label>
            <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors duration-200 ${resumeError ? 'border-red-500' : 'border-gray-300 hover:border-indigo-500'}`}>
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
          </div>

          {/* Error Messages */}
          {(fieldError || resumeError || dbError) && (
            <div className="text-red-600 text-sm italic text-center animate-pulse">
              {fieldError || resumeError || dbError}
            </div>
          )}

          {/* Submit Button */}
          <ButtonComponent
            handleClick={handleSubmit}
            buttonName={'Submit'}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
}

export default Apply;
