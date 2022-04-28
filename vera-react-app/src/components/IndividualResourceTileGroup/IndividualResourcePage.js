import React from 'react';
import { Banner, IndividualResourceTileGroup } from '../components';

/*TEST CODE*/
import { StoryTileGroup } from '../components';

function IndividualResourcePage() {
  const resources = [
    {
      imageUrl:
        'https://www.onceuponachef.com/images/2019/09/Spaghetti-and-Meatballs.jpg',
      title: 'title',
      descriton: 'description',
      buildingName: 'buildingName',
      address: 'address',
      whatToExpectList: ['thing1', 'thing2'],
      phone: '123456789',
      hourList: ['hour1', 'hour2'],
      link: 'link',
    },
    {
      imageUrl:
        'https://www.onceuponachef.com/images/2019/09/Spaghetti-and-Meatballs.jpg',
      title: 'title',
      descriton: 'description',
      buildingName: 'buildingName',
      address: 'address',
      whatToExpectList: ['thing1', 'thing2'],
      phone: '123456789',
      hourList: ['hour1', 'hour2'],
      link: 'link',
    },
    {
      imageUrl:
        'https://www.onceuponachef.com/images/2019/09/Spaghetti-and-Meatballs.jpg',
      title: 'title',
      descriton: 'description',
      buildingName: 'buildingName',
      address: 'address',
      whatToExpectList: ['thing1', 'thing2'],
      phone: '123456789',
      hourList: ['hour1', 'hour2'],
      link: 'link',
    },
  ];
  return (
    <div>
      <Banner imageUrl="https://pyxis.nymag.com/v1/imgs/3d4/0aa/89125115b0e10b94e3378d484712450727-25-thanos.rsquare.w1200.jpg" />
      <IndividualResourceTileGroup
        id="School"
        title="School"
        resources={resources}
      />
      <IndividualResourceTileGroup
        id="Community"
        title="Comunity"
        resources={resources}
      />

      {/*TEST CODE - DELETE BEFORE MERGE*/}
      <StoryTileGroup 
        id="test ID"
        title="test Title"
        stories={[{...resources[0], studentYear:'1st', studentMajor:"EE" }, //make two test stories
                   {...resources[1], studentYear:'3rd', studentMajor:"ME"}]}
      />
    </div>

  );
}

export default IndividualResourcePage;
