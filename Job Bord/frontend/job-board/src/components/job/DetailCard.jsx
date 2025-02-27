import React from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../pages/landing/smallComponents/ButtonComponent';


function DetailCard({ job, emp, has_applied }) {
  const navigate = useNavigate()
  const { job_id, title, fname, lname, description, location, deadline, } = job
  const { salary, company, applicants: tot_app, created_at, responsibilities, criteria } = job
  const date = new Date(deadline);
  const month = date.toLocaleString('default', { month: 'short' });
  const formattedDate = `${month}-${date.getDate()}`;

  const handleApply = (e) => {
    has_applied ?
      alert("You have already applied to this job. Update feature will be implemented soon!") :
      navigate("/apply", { state: { job_id, title } });
  }

  return (
    <section className='  '>
      <div className={` flex flex-col w-5/6 max-w-[900px] bg-gray-400/40 mx-auto my-4 p-6 gap-3 rounded-md border-[1px] border-black/50 `}>

        <TitleAndDetails title='Title' detail={title} />
        <TitleAndDetails title='Company' detail={company} />
        <TitleAndDetails title='Location' detail={location} />
        <TitleAndDetails title='Deadline' detail={formattedDate} />
        <TitleAndDetails title='Applicants' detail={tot_app} />
        <TitleAndDetails title='Created At' detail={formattedDate} />
        <TitleAndDetails title='Salary' detail={`$${salary}`} />
        <TitleAndDetails title='Employer' detail={`${fname} ${lname}`} />

        <div className='my-4'></div>
        <TitleAndDetails title='Description' detail={description} flex_col={true} />
        <TitleAndDetails title='Responsibilities' detail={responsibilities} flex_col={true} />
        <TitleAndDetails title='Criterias' detail={criteria} flex_col={true} />
        <div className={` flex ${emp && 'hidden'} justify-center `}>
          <ButtonComponent buttonName='Apply Now' onClick={handleApply} />
        </div>
      </div>
    </section>
  )
}

const TitleAndDetails = ({ title, detail, flex_col }) => {
  return (
    <>
      <div className={` flex ${flex_col && 'flex-col gap-3'} gap-2 `}>
        <p className={` whitespace-nowrap font-bold `}>{title} {!flex_col && ':'} </p>
        <p className='  '>{detail}</p>
      </div>
      <hr className=' -mx-6 border-[0.25px] border-black/5 ' />
    </>
  )
}

export default DetailCard

