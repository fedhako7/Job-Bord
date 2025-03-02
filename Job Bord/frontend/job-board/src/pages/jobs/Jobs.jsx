import React, { useEffect } from 'react'
import JobList from '../../components/job/JobList'
import PagesHeader from '../../components/pagesHeader/PagesHeader'

function Jobs() {

  return (
      <div>
        <PagesHeader pageHeader={'Jobs'} />
        <JobList />
      </div>
  )
}
export default Jobs
