import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axios/Axios'
import JList from './JList'

function FeaturedJobs() {  
  const [featuredJobs, setFeaturedJobs] = useState([])

  const fetchFeaturedJobs = async () => {
    try {
      const response = await axiosInstance.get("guest/featured")
      setFeaturedJobs(response?.data?.featured_jobs)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchFeaturedJobs()
  }, [])

  return (
      <div>
        {
          <JList jobs={featuredJobs} />
        }
      </div>
  )
}

export default FeaturedJobs