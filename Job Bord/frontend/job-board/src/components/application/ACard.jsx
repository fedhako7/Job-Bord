import React from 'react'
import ApiIcon from '@mui/icons-material/ApiOutlined';
import ButtonComponent from '../../pages/landing/smallComponents/ButtonComponent';
import { useNavigate } from 'react-router-dom';

function ACard({ job, emp, has_applied, from_detail }) {
  const navigate = useNavigate()
  const { job_id, title, fname, lname, description, location, deadline, } = job
  const { salary, company, applicants: tot_app, created_at, responsibilities, criteria } = job
  const date = new Date(deadline);
  const month = date.toLocaleString('default', { month: 'short' });
  const formattedDate = `${month}-${date.getDate()}`;
  const formatted_created_at = created_at.slice(0, 10);
  const status = 'status'
  const applicants = 'appl'

  const handleApply = (e) => {
    has_applied ?
      alert("You have already applied to this job. Update feature will be implemented soon!") :
      navigate("/apply", { state: { job_id, title } });
  }
 
  const handleDetails = (e) => {
    navigate("/application/detail", { state: { title, job_id, emp } });
}
  return (
    <section className={` flex flex-col min-w-72 max-w-80 bg-gray-400 mx-auto px-6 py-4 text-sm font-serif rounded-md shadow-md sm:min-w-80`}>
      <div className={` flex mb-6 gap-3 items-center`}>
        {/* icon  */}
        <div className='flex w-9 h-9 bg-yellow-500 justify-center items-center rounded-md text-4xl'>
          <ApiIcon />
        </div>
        <div className='texts '>
          <h2 className=' font-bold '>{formattedDate}</h2>
          <div className={` flex gap-3`}>
            <p>{status? status : "Status"} </p>
            <p>{applicants || 'applicants'} applied</p>
          </div>
        </div>
      </div>

      {/* title and company  */}
      <p className='mb-2 italic '>{title}</p>
      <p >Deadline: {company || 'company'}</p>

    {/* Deadline and salary  */}
      <div className={` flex w-3/4 mb-3 justify-between `}>
        <p>{formattedDate};</p>
        <p>${salary}</p>
      </div>


      {/* buttons  */}
      <div className={`flex justify-around font-sans `}>
        {
          <ButtonComponent
            buttonName={'Detail'}
            handleClick={handleDetails} />
        }
      </div>
    </section>

  )
}

export default ACard