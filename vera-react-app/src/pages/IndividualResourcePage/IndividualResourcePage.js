import React from 'react';
import { Banner, IndividualResourceTileGroup } from '../../components/components';

function IndividualResourcePage() {

  const resource = {
    imageUrl:
      "https://img.buzzfeed.com/buzzfeed-static/static/2018-10/2/18/campaign_images/buzzfeed-prod-web-06/15-of-the-weirdest-and-darkest-stock-photos-that--2-21628-1538520564-0_dblbig.jpg?resize=1200:*",
    title: "title",
    description: "description",
    buildingName: "buildingName",
    address: "address",
    whatToExpectList: ["thing1", "thing2"],
    phone: "123456789",
    hourList: ["hour1", "hour2"],
    link: "link",
  };

  const resource1 = {
    imageUrl:
      "https://www.pixsy.com/wp-content/uploads/2016/06/Underwater-Nun.jpg",
    title: "title",
    description: "description",
    buildingName: "buildingName",
    address: "address",
    whatToExpectList: ["thing1", "thing2"],
    phone: "123456789",
    hourList: ["hour1", "hour2"],
    link: "link",
  };
const resource2 = {
  imageUrl:
    "https://ichef.bbci.co.uk/news/976/cpsprodpb/A716/production/_95147724_kneeache.jpg",
  title: "title",
  description: "description",
  buildingName: "buildingName",
  address: "address",
  whatToExpectList: ["thing1", "thing2"],
  phone: "123456789",
  hourList: ["hour1", "hour2"],
  link: "link",
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
        resources={[resource, resource2, resource1, resource]}
      />
      <IndividualResourceTileGroup
        id="National"
        title="National"
        resources={[resource1, resource, resource2, resource, resource]}
      />
    </div>

  );
}

export default IndividualResourcePage;
