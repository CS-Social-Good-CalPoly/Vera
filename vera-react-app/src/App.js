import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer, ResourceTile} from './components/components';

function App() {
    const toExpect = ["one", "two", "three four five six"]
    return (
        <div id="app">
            <Switch>
               <Route exact path='/'
                 component={() => <Home />} />
            </Switch>
            <ResourceTile title="Campus Pantry" 		
               location="Campus Health & Wellbeing 		      		
              Building 27, Room 10, Lower Level" 		      		
              description="The Food Pantry is a part of the Cal Poly Hunger Program which ensures that all students have access to nutritious meals every day in order to stay focused on their success at Cal Poly. The Food Pantry is a short-term service that is here to assist students who are experiencing food insecurity due to a financial struggle. Any students can choose from a wide variety of packaged and canned foods, fresh produce, frozen meals, and personal hygiene products. Students can also obtain a meal voucher and confidential counseling support services. "				
              toExpect={toExpect}				
              phone="(805)-756-6181"				
              hours="Monday–Friday, 10:00 a.m.–2:00 p.m."		      		
              link="https://www.google.com"				
              imgUrl="https://picsum.photos/300"		      		
              />

            {/* <Footer/> */}
        </div>
    );
}

export default App;
