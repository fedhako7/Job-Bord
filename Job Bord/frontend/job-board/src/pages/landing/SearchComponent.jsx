import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SearchIcon from '@mui/icons-material/Search';

function SearchComponent({ handleSearch, searchRefs }) {
  const [dateFilter, setDateFilter] = useState(false)
  const [experienceFilter, setExperienceFilter] = useState(false)
  const [applicantNumberFilter, setApplicantNumberFilter] = useState(false)

  return (
    <div className=' max-w-[1000px] flex flex-col bg-[#4F7942] m-4 p-3'>

      {/* Search input */}
      <div className=' max-w-[800px] flex justify-center'>
        <div className='flex self-center'>
          <input
            type="text"
            placeholder='Search...'
            ref={searchRefs?.searchRef}
            className=' min-w-60 pl-2  rounded-md md:w-96 md:min-h-10'
          />
          <button
            onClick={handleSearch}
            className=' w-8 bg-gray-800 -ml-8 text-white rounded-e-md md:w-10 md:-ml-10'>
            <SearchIcon />
          </button>
        </div>
      </div>

      <hr className=' h-[2px] bg-black mt-3 border-black ' />

      {/* Filters */}
      <div className=' p-3 '>
        <p className='mb-4'>FILTER RESULTS</p>
        <div className=' max-w-[600px] sm:flex sm:justify-between'>
          {/* Date filter */}
          <FilterComponent
            name='Date'
            type='date'
            ref={searchRefs?.dateRef}
            filter={dateFilter}
            setfilter={setDateFilter}
            from={new Date().toISOString().split('T')[0]}
          />

          {/* Experience filter */}
          <FilterComponent
            name='Experience'
            type='number'
            ref={searchRefs?.experienceRef}
            filter={experienceFilter}
            setfilter={setExperienceFilter}
            from={0}
          />

          {/* Applicant number filter */}
          <FilterComponent name='Applicant number'
            type='number'
            ref={searchRefs?.applicantNumberRef}
            filter={applicantNumberFilter}
            setfilter={setApplicantNumberFilter}
            from={0}
            to={100}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchComponent


const FilterComponent = ({ name, type, from, to, filter, setfilter, ref }) => {
  return (
    <div className=' mb-3 gap-3'>

      <div>
        <button
          className=' flex min-w-32 bg-[#555D50] mb-2 p-2 pl-1 items-center rounded-md'
          onClick={() => setfilter(!filter)}
        >
          {filter ?
            <CheckCircleIcon /> : <CircleOutlinedIcon />
          }
          {name}
        </button>
      </div>

      <div className={` ${!filter && 'hidden'} flex flex-col max-w-44 pl-2 items-end gap-3 `}>
        <div>
          <span className=' w-14 mr-2 italic '>
            from:
          </span>
          <input
            type={type}
            ref={ref || undefined}
            min={type === 'number' ? 0 : '2025-01-01'}
            max={type === 'number' ? 20 : '2035-01-01'}
            defaultValue={from}
          />
        </div>
        <div>
          <span className='w-14 mr-2 italic '>
            to:
          </span>
          <input
            type={type}
            ref={ref || undefined}
            min={type === 'number' ? 0 : '2025-01-01'}
            max={type === 'number' ? 20 : '2035-01-01'}
            defaultValue={to ? to : from}

          />
        </div>
      </div>
    </div>
  )
}
