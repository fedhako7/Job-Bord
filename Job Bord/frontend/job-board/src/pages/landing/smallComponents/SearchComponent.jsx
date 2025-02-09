import React, { useRef, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SearchIcon from '@mui/icons-material/Search';

function SearchComponent(
  { handleSearch,
    searchRefs,
    searchRef,
    filterHidden,
    setFilters,
    filters
  }
) {

  // Return 
  return (
    <div className=' max-w-[1000px] flex flex-col bg[#4F7942] m-4 p-3'>

      {/* Search input */}
      <div className=' max-w-[800px] flex justify-center'>
        <div className='flex self-center'>
          <input
            type="text"
            placeholder='Search...'
            ref={searchRef}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className=' min-w-60 pl-2  rounded-md md:w-96 md:min-h-10'
          />
          <button
            onClick={handleSearch}
            className=' w-8 bg-gray-800 -ml-8 text-white rounded-e-md md:w-10 md:-ml-10'>
            <SearchIcon />
          </button>
        </div>
      </div>

      <hr className={` hidden max-w-ful -ml-3 -mr-3 h-[1px] bg-black mt-3 border-black `} />

      {/* Filters */}
      <div className={`${filterHidden && 'hidden'} p-3 `}>
        <p className='mb-4'>FILTER RESULTS</p>
        <div className=' flex flex-col max-w-[600px]  gap-2 sm:flex-row '>
          {/* Date filter */}
          <FilterComponent
            name='Date'
            type='date'
            filterName='dateFilter'
            ref={searchRefs?.dateRef}
            from={new Date().toISOString().split('T')[0]}
            setFilters={setFilters}
            filter={filters.dateFilter}
          />

          {/* Experience filter */}
          <FilterComponent
            name='Experience'
            type='number'
            filterName='experienceFilter'
            from={0}
            setFilters={setFilters}
            filter={filters.experienceFilter}

          />

          {/* Applicant number filter */}
          <FilterComponent name='Applicant number'
            type='number'
            filterName='applicantNumberFilter'
            from={0}
            to={100}
            setFilters={setFilters}
            filter={filters.applicantNumberFilter}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchComponent


const FilterComponent = ({ name, type, from, to, filter, setFilters, filterName, ref }) => {
  // Constants 
  const fromRef = useRef()
  const toRef = useRef()

  // handleFilter
  const handleFilter = (e) => {
    const filter = e.target.dataset.filter
    console.log(fromRef.current.value)
    setFilters((prevFilters) => (
      {
        ...prevFilters, [filter]: prevFilters[filter] ? false : {
          from: fromRef.current.value,
          to: toRef.current.value
        }
      }
    ))
  }

  const handleFrom = (e) => {
    if (e.key == 'Enter'){
      
    }
  }
  const handleTo = (e) => {
    if (e.key == 'Enter'){
      
    }
  }

  // Return 
  return (
    <div className=' mb-3 gap-3'>

      <div>
        <button
          onClick={handleFilter}
          data-filter={filterName}
          className=' flex min-w-32 bg-[#555D50] mb-2 p-2 pl-1 items-center rounded-md'
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
            onKeyDown={handleFrom}
            type={type}
            ref={fromRef}
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
            onKeyDown={handleTo}
            type={type}
            ref={toRef}
            min={type === 'number' ? 0 : '2025-01-01'}
            max={type === 'number' ? 20 : '2035-01-01'}
            defaultValue={to ? to : from}

          />
        </div>
      </div>
    </div>
  )
}
