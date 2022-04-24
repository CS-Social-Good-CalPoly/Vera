import { useState, useEffect } from 'react';
import './Home.css';
import {
  Banner,
  CategoryButtonGroup,
  ResourcePageTileGroup,
} from '../components';
import IndividualResourceTileGroup from '../IndividualResourceTileGroup/IndividualResourceTileGroup'

const getSubcategories = (categoryObj, subResourceList) => {
  console.log('im here');
  const list = [];
    categoryObj.SubCategoryIDList.forEach((id) =>
      list.push(
        subResourceList.find((element) => {
          return element._id === id;
        })
      )
    );
  return list;
};

function Home() {
  const [categories, setCategories] = useState([]);
  const [subResources, setSubResources] = useState([]);
  const [idList, setIdList] = useState([]);

  useEffect(() => {
    console.log('in useeffect');
    fetch('http://localhost:5000/resources/generalrsrcscat')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .then(() => fetch('http://localhost:5000/resources/subrsrcs'))
      .then((response) => response.json())
      .then((data) => setSubResources(data))
      .then(() => {
          console.log('in the last then')
          console.log('categories' + categories)
        categories.forEach((category) => {
          const newList = getSubcategories(category, subResources);
          console.log(newList);
        //   setIdList(idList.push(newList))
          setIdList((idList) => [...idList, newList]);
          console.log("idList: " + idList)
        });
      });
  }, []);

  return (
    <div>
      <Banner imageUrl="https://images.unsplash.com/photo-1595869653737-3c3fcf087954?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" />
      <CategoryButtonGroup
        title="Categories"
        names={categories.map((c) => c.Name)}
        locations={categories.map((c) => c.Name)}
      />
      {idList.length !== 0 &&
        categories.map((category, index) => (
          <IndividualResourceTileGroup
            id={category.name}
            title={category.Title}
            resources={idList[index]}
          />
        ))}
    </div>
  );
}

export default Home;
