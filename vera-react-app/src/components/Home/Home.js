import { useState, useEffect } from 'react';
import './Home.css';
import {
  Banner,
  CategoryButtonGroup,
} from '../components';
import IndividualResourceTileGroup from '../IndividualResourceTileGroup/IndividualResourceTileGroup';

const getSubcategories = (categoryObj, subResourceList) => {
  console.log("IN GETSUBCATEGORIES")
  console.log(subResourceList);
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

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  useEffect(() => {
    fetch('http://localhost:5000/resources/generalrsrcscat')
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error))
      .then(() => fetch('http://localhost:5000/resources/subrsrcs'))
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => setSubResources(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
       categories.forEach((category) => {
         const newList = getSubcategories(category, subResources);
         if(newList.length > 0) {
            setIdList((idList) => [...idList, newList]);
         }
       });
    }
  }, [subResources])

  return (
    <div>
      <Banner imageUrl="https://images.unsplash.com/photo-1595869653737-3c3fcf087954?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" />
      {categories !== null && (
        <CategoryButtonGroup title="Categories" categories={categories} />
      )}
      {categories &&
        categories.map((category, index) => (
          <IndividualResourceTileGroup
            id={category.Name}
            key={index}
            title={category.Title}
            resources={idList[index]}
          />
        ))}
    </div>
  );
}

export default Home;
