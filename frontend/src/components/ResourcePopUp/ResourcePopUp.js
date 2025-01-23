import React, { useEffect, useState } from 'react'
import {
    Banner,
    IndividualResourceTileGroup,
    CategoryButtonGroup,
    TextBlock,
} from '../../components/components.js'
import URL_PATH from '../../links.js'

function ResourcePopUp({ id }) {
    const [currResource, setCurrResource] = useState(null)
    const [resourceMapper, setResourceMapper] = useState({})
    const [resourceList, setResourceList] = useState([])

    useEffect(() => {
        const subdirectory = '/resources/subrsrcs'
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((allResources) => {
                setCurrResource(
                    allResources.find((resource) => resource._id === id),
                )
            })
            .catch((error) => console.error(error))
    }, [])

    useEffect(() => {
        if (!currResource || !currResource.ResourceIDList) return

        const individualIDsQueryParam = new URLSearchParams({
            listOfResourceIDs: JSON.stringify(currResource.ResourceIDList),
        }).toString()

        const subdirectory = `/resources/individualResources?${individualIDsQueryParam}`
        fetch(URL_PATH + subdirectory)
            .then((response) => response.json())
            .then((json) => {
                let tempDict = {}
                let tempList = []

                json.forEach((resource) => {
                    tempDict[resource.Category] = resource
                    tempList.push(resource)
                })

                setResourceMapper(tempDict)
                setResourceList(tempList)

                window.scrollTo(0, 0)
            })
            .catch((error) => console.error(error))
    }, [currResource])

    if (!currResource) {
        return <div>Loading ...</div>
    }

    return (
        <div>
            <Banner imageUrl={currResource.ImageURL} />

            <CategoryButtonGroup
                title={currResource.Title}
                names={Object.keys(resourceMapper)}
                locations={Object.keys(resourceMapper)}
            />

            <TextBlock text={currResource.LongDescription} />

            {Object.keys(resourceMapper).map((categoryName) => {
                let result = resourceList.filter(
                    (resource) => categoryName === resource.Category,
                )
                return (
                    <IndividualResourceTileGroup
                        key={categoryName}
                        id={categoryName}
                        title={categoryName}
                        resources={result}
                    />
                )
            })}
        </div>
    )
}

export default ResourcePopUp
