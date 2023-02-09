import React from 'react';
import { Banner, IndividualResourceTileGroup } from '../../components/components';

function IndividualResourcePage() {

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
      <Banner imageUrl="https://pyxis.nymag.com/v1/imgs/3d4/0aa/89125115b0e10b94e3378d484712450727-25-thanos.rsquare.w1200.jpg" />
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
