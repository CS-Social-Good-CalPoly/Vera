import React from 'react';
import {Banner,
  IndividualResourceTileGroup,
  CategoryButtonGroup, TextBlock,
} from "../../components/components";
import mockSchoolResources from './mockSchoolResources.json';
import mockCommunityResources from './mockCommunityResources.json';
import mockNationalResources from './mockNationalResources.json';

function IndividualResourcePage() {


   const categorNames = ["School", "Community", "National"];
   const categorLocs = ["School", "Community", "National"];

  return (
    <div>
      <Banner imageUrl="https://cdn.pixabay.com/photo/2017/03/25/03/29/cherry-tomatoes-2172700_1280.jpg" />

      <CategoryButtonGroup
        title="FOOD INSECURITY RESOURCES"
        names={categorNames}
        locations={categorLocs}
      />
      <TextBlock text = {"For many students today, food insecurity is just a few missed paychecks away. A 2018 study by found that 36% of college students are experienceing hunger and lack of stable housing. Add in the fact that tuition rates are going up while financial aid is going down, and it’s obvious that most college students and their families are feeling a very tight financial squeeze. But there is help out there. Students struggling to avoid hunger can find several resources to put food on the table while still completing their education."}/>
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
