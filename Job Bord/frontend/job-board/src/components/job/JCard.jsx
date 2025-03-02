import React from 'react';
import ApiIcon from '@mui/icons-material/ApiOutlined';
import ButtonComponent from '../smallComponents/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function JCard({ job, emp: isEmployer, has_applied, from_detail }) {
  const navigate = useNavigate();
  const {
    job_id, title, description, location, deadline,
    salary, company, applicants: tot_app, created_at
  } = job;

  const formattedDate = format(new Date(deadline), 'MMM-dd');
  const formattedCreatedAt = format(new Date(created_at), 'yyyy-MM-dd');

  const handleApply = () => {
    if (has_applied) {
      alert("You have already applied. Update feature coming soon!");
    } else {
      navigate("/apply", { state: { job_id, title } });
    }
  };

  const handleDetails = () => {
    navigate("/job/detail", { state: { title, job_id, emp: isEmployer } });
  };

  return (
    <article className="w-72 bg-gray-400 sm:w-80 mx-auto px-6 py-4 text-sm font-serif rounded-md shadow-md">
      <div className="flex mb-6 gap-3 items-center">
        <div className="flex w-9 h-9 bg-yellow-500 justify-center items-center rounded-md">
          <ApiIcon aria-label="Job icon" />
        </div>
        <div>
          <h2 className="font-bold">{title}</h2>
          <div className="flex gap-3">
            <p>{company || "Private Client"}:</p>
            <p>{location}</p>
          </div>
        </div>
      </div>

      <p className="mb-2 italic">${salary}</p>
      <div className="flex w-3/4 mb-3 justify-between">
        <p>{formattedCreatedAt}</p>
        <p>{tot_app} applicants</p>
      </div>
      <p>Deadline: {formattedDate}</p>

      <div className="flex justify-around font-sans mt-4">
        {!isEmployer && (
          <ButtonComponent
            buttonName={has_applied ? 'Applied' : 'Apply'}
            handleClick={handleApply}
            has_applied={has_applied}
          />
        )}
        {!from_detail && (
          <ButtonComponent
            buttonName="Detail"
            handleClick={handleDetails}
          />
        )}
      </div>
    </article>
  );
}

export default React.memo(JCard);
