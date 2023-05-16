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

  useEffect(() => {
      fetch('http://localhost:3001/resources/subrsrcs')
        .then(response => response.json())
        .then(data => {
          setSubresources(data);
          if (data.length > 0) {
            setCurrentSubresource(data[1]);
          }
        })
        .catch(error => console.error(error));
    }, []);

  const categorNames = ["School", "Community", "National"];
  const categorLocs = ["School", "Community", "National"];


  return (
    <div>
      <Banner imageUrl={currentSubresource?.ImageURL} />

      <CategoryButtonGroup
        title={currentSubresource?.Title}
        names={categorNames}
        locations={categorLocs}
      />

      <TextBlock text = {currentSubresource?.LongDescription}/>

      <IndividualResourceTileGroup
        id="School"
        title="School"
        resources={mockSchoolResources}
      />
      <IndividualResourceTileGroup
        id="Community"
        title="Community"
        resources={mockCommunityResources}
      />
      <IndividualResourceTileGroup
        id="National"
        title="National"
        resources={mockNationalResources}
      />
    </div>
  );
}

export default IndividualResourcePage;
