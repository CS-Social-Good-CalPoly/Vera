import React, { useEffect, useState } from 'react';
import {Banner,
  IndividualResourceTileGroup,
  CategoryButtonGroup, TextBlock,
} from "../../components/components";
import mockSchoolResources from './mockSchoolResources.json';
import mockCommunityResources from './mockCommunityResources.json';
import mockNationalResources from './mockNationalResources.json';

function IndividualResourcePage() {

  const [subresources, setSubresources] = useState([]);
  const [currentSubresource, setCurrentSubresource] = useState({});
  const [currentSubresourceIDList, setCurrentSubresourceIDList] = useState([]);

  useEffect(() => {
      fetch('http://localhost:3001/resources/subrsrcs')
        .then(response => response.json())
        .then(data => {
          setSubresources(data);
          if (data.length > 0) {
            setCurrentSubresource(data[1]);
            setCurrentSubresourceIDList(data[1]?.ResourceIDList || []);
          }
        })
        .catch(error => console.error(error));
    }, []);

  const [schoolResources, setSchoolResources] = useState([]);
  const [communityResources, setCommunityResources] = useState([]);
  const [nationalResources, setNationalResources] = useState([]);

  useEffect(() => {
      fetch('http://localhost:3001/resources/School')
        .then(response => response.json())
        .then(data => {
          const filteredResources = data.filter(resource => 
            currentSubresourceIDList.includes(resource._id));
          setSchoolResources(filteredResources);
        })
        .catch(error => console.error(error));
    }, [currentSubresourceIDList]);

  useEffect(() => {
    fetch('http://localhost:3001/resources/Community')
      .then(response => response.json())
      .then(data => {
        const filteredResources = data.filter(resource => 
          currentSubresourceIDList.includes(resource._id))
        setCommunityResources(filteredResources);
      })
      .catch(error => console.error(error));
  }, [currentSubresourceIDList]);

  useEffect(() => {
    fetch('http://localhost:3001/resources/National')
      .then(response => response.json())
      .then(data => {
        const filteredResources = data.filter(resource => 
          currentSubresourceIDList.includes(resource._id))
        setNationalResources(filteredResources);
      })
      .catch(error => console.error(error));
  }, [currentSubresourceIDList]);

  const categorNames = ["School", "Community", "National"];
  const categorLocs = ["School", "Community", "National"];

  console.log(schoolResources)
  console.log(communityResources)
  console.log(nationalResources)
  return (
    <div>
      <Banner imageUrl={currentSubresource?.ImageURL} />

      <CategoryButtonGroup
        title={currentSubresource?.Title}
        names={categorNames}
        locations={categorLocs}
      />

      <TextBlock text={currentSubresource.LongDescription} />
      {schoolResources.length > 0 && (
        <IndividualResourceTileGroup
          id="School"
          title="School"
          resources={schoolResources}
        />
      )}
      {communityResources.length > 0 && (
        <IndividualResourceTileGroup
          id="Community"
          title="Community"
          resources={communityResources}
        />
      )}
      {nationalResources.length > 0 && (
        <IndividualResourceTileGroup
          id="National"
          title="National"
          resources={nationalResources}
        />
      )}
    </div>
  );
}

export default IndividualResourcePage;
