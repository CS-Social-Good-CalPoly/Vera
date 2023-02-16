import React from 'react';
import {Banner,
  IndividualResourceTileGroup,
  CategoryButtonGroup,
} from "../../components/components";

function IndividualResourcePage() {


   const categorNames = ["School", "Community", "National"];
   const categorLocs = ["School", "Community", "National"];

  const resource = {
      imageUrl:
        'https://www.onceuponachef.com/images/2019/09/Spaghetti-and-Meatballs.jpg',
      title: 'title',
      description: 'description',
      buildingName: 'buildingName',
      address: 'address',
      whatToExpectList: ['thing1', 'thing2'],
      phone: '123456789',
      hourList: ['hour1', 'hour2'],
      link: 'link',
  };

  return (
    <div>
      <Banner imageUrl="https://cdn.pixabay.com/photo/2017/03/25/03/29/cherry-tomatoes-2172700_1280.jpg" />

      <CategoryButtonGroup
        title="FOOD INSECURITY RESOURCES"
        names={categorNames}
        locations={categorLocs}
      />

      <IndividualResourceTileGroup
        id="School"
        title="School"
        resources={[resource, resource, resource]}
      />
      <IndividualResourceTileGroup
        id="Community"
        title="Community"
        resources={[resource, resource, resource, resource]}
      />
      <IndividualResourceTileGroup
        id="National"
        title="National"
        resources={[resource, resource, resource, resource, resource]}
      />
    </div>
  );
}

export default IndividualResourcePage;
