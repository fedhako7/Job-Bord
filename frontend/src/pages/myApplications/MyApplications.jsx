import React from 'react'
import ApplicationList from '../../components/application/ApplicationList'
import PagesHeader from '../../components/pagesHeader/PagesHeader'

function MyApplications() {
    return (
        <>
            <div>
                <PagesHeader pageHeader={'My Applications '} />
                <ApplicationList />
            </div>
        </>
    )
}

export default MyApplications
