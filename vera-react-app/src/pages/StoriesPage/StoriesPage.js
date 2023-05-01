import React , { useState, useEffect } from 'react';
import { StoryBanner, CategoryButtonGroup, StoryTileGroup} from '../../components/components'


function StoriesPage() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/stories/generalstorycat')
          .then(response => response.json())
          .then(data => {setStories(data);})
          .catch(error => console.error(error));
      }, []);

    const categoryNames = stories.map(stories => stories.Name);
    
    return (
        <div>
            <StoryBanner imageUrl='https://images.unsplash.com/photo-1506962240359-bd03fbba0e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2065&q=80' displayButton='true'/>
            <CategoryButtonGroup title='Categories' names={categoryNames} locations={categoryNames}/>
            {categoryNames.map((id, value) => (
                <StoryTileGroup key={id} id={id} title={id} stories={[]}/>
            ))}
        </div>
    );
}

export default StoriesPage;
