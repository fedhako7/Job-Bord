import React from 'react'
import JCard from './JCard'

function JList({ jobs, emp, from_detail, appliedList }) {

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4 gap-y-6 my-4 px-4 justify-items-start sm:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] ">
      {jobs.map((job) => (
        <JCard job={job} key={job.job_id} emp={emp} from_detail={from_detail} has_applied={appliedList?.has(job.job_id)} />
      ))}
    </div>
  )
}

export default JList
