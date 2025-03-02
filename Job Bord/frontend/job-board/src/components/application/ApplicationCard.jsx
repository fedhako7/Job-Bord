import React, { useState } from 'react';
import axiosInstance from '../../axios/Axios';

function ApplicationCard({ app }) {
  const {
    title,
    fname,
    lname,
    location,
    status,
    company,
    applicants: tot_app,
    salary,
    applied_at,
    created_at,
    resume,
    cover_letter: cv,
  } = app;

  const dateApplied = new Date(applied_at);
  const datePosted = new Date(created_at);
  const formattedAppliedAt = `${dateApplied.toLocaleString('default', { month: 'short' })}-${dateApplied.getDate()}`;
  const formattedPostedAt = `${datePosted.toLocaleString('default', { month: 'short' })}-${datePosted.getDate()}`;
  const [show, setShow] = useState(false);
  const resumePath = `${axiosInstance.defaults.baseURL}/${resume.replace(/\\/g, '/')}`;

  return (
    <section className="container mx-auto px-4 py-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Collapsed View: Key Info */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-blue-700 truncate">{title}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                  status === 'Accepted'
                    ? 'bg-green-100 text-green-800'
                    : status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {status}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-700">
              <p className="text-sm font-serif">{company}</p>
              <span className="hidden sm:block text-gray-400">•</span>
              <p className="text-sm font-serif">{location}</p>
            </div>
          </div>
          <button
            onClick={() => setShow((prev) => !prev)}
            className="w-full sm:w-auto px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            {show ? 'Hide Details' : 'See Details'}
          </button>
        </div>

        {/* Expanded View: Full Details */}
        <div
          className={`bg-gray-50 border-t border-gray-200 transition-all duration-300 ${
            show ? 'block p-5' : 'hidden'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wide">Employer</p>
                <p className="text-base text-gray-800">{`${fname} ${lname}`}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wide">Salary</p>
                <p className="text-base text-gray-800">${salary}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wide">Applied</p>
                <p className="text-base text-gray-800">{formattedAppliedAt}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wide">Posted</p>
                <p className="text-base text-gray-800">{formattedPostedAt}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wide">Applicants</p>
                <p className="text-base text-gray-800">{tot_app}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wide">Cover Letter</p>
                <p className="text-base text-gray-700 break-words line-clamp-3">{cv}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wide">Resume</p>
            <a
              href={resumePath}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mt-1"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApplicationCard;
