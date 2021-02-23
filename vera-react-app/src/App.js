import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer, ResourceTile} from './components/components';

function App() {
    const toExpect1 = ["the quick brown fox jumps over the lazy dog. the quick brown fox jumps over the lazy dog.", "two", "three four five six"]
    const toExpect = ["One", "two", "three"]
    const openHours = ["Monday - Friday 8:00am - 5:00pm", "Saturday - Sunday 10:00am - 3:00pm"]
    return (
        <div id="app">
            <Switch>
               <Route exact path='/'
                 component={() => <Home />} />
            </Switch>
            <ResourceTile title="Campus Pantry" 		
                buildingName="Campus Health & Wellbeing"
                address="Building 27, Room 10, Lower Level" 		      		
                description="The Food Pantry is a part of the Cal Poly Hunger Program which ensures that all students have access to nutritious meals every day in order to stay focused on their success at Cal Poly. "				
                toExpect={toExpect}				
                phone="(805)-756-6181"				
                hours={openHours}		      		
                link="https://www.google.com"				
                imgUrl="https://picsum.photos/300"		      		
                />
            <ResourceTile title="Campus Pantry" 		
                buildingName="Campus Health & Wellbeing"
                address="Building 27, Room 10, Lower Level" 		      		
                description="The Food Pantry is a part of the Cal Poly Hunger Program which ensures that all students have access to nutritious meals every day in order to stay focused on their success at Cal Poly. "				
                toExpect={toExpect1}				
                phone="(805)-756-6181"				
                hours={openHours}		      		
                link="https://www.google.com"				
                imgUrl="https://picsum.photos/300"		      		
                />

            {/* <Footer/> */}
        </div>
    );
}

export default App;
