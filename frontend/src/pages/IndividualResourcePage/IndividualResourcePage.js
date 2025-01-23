import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ResourcePopUp } from '../../components/components.js'

function IndividualResourcePage({ setActiveLink }) {
    const location = useLocation()
    const pathSegments = location.pathname.split('/')
    const id = pathSegments[pathSegments.length - 1]

    useEffect(() => {
        setActiveLink('/Resources')
    }, [])

    return (
        <div>
            <ResourcePopUp id={id} />
        </div>
    )
}

export default IndividualResourcePage
