import React from 'react'
import ApiIcon from '@mui/icons-material/ApiOutlined';
import ButtonComponent from '../../pages/landing/smallComponents/ButtonComponent';

function JCard({ job, emp, has_applied, from_detail }) {
  const { job_id, title, fname, lname, description, location, deadline, } = job
  const { salary, company, applicants: tot_app, created_at, responsibilities, criteria } = job

  const date = new Date(deadline);
  const month = date.toLocaleString('default', { month: 'short' });
  const formattedDate = `${month}-${date.getDate()}`;
  const formatted_created_at = created_at.slice(0, 10);

  return (
    <section className={` flex flex-col min-w-80 max-w-80 bg-gray-400 mx-auto px-6 py-4 text-sm font-serif rounded-md shadow-md`}>
      <div className={` flex mb-6 gap-3 items-center`}>
        {/* icon  */}
        <div className='flex w-9 h-9 bg-yellow-500 justify-center items-center rounded-md text-4xl'>
          <ApiIcon/>
          </div>
        <div className='texts '>
          <h2 className=' font-bold '>{title}</h2>
          <div className={` flex gap-3`}>
            <p>{company} :</p>
            <p>{location}</p>
          </div>
        </div>
      </div>

      {/* slary  */}
      <p className='mb-2 italic '>${salary}</p>

      {/* post date an applicant no.  */}
      <div className={` flex w-3/4 mb-3 gap-8 justify-between  `}>
        <p>{formatted_created_at};</p>
        <p>{tot_app} applicants</p>
      </div>

      {/* deadline   */}
      <p >Deadline: {formattedDate}</p>

      {/* buttons  */}
      <div className={`flex justify-between font-sans `}>
        <ButtonComponent buttonName={'Apply'} />
        <ButtonComponent buttonName={'Details'} />
      </div>
    </section>

  )
}

export default JCard