import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer } from './components/components';
import CategoryDescription from './components/CategoryDescription/CategoryDescription';

function App() {
    return (
        <div id="app">
            {/* <Switch>
                <Route exact path='/' component={() => <Home/>}/>
            </Switch> */}
            <CategoryDescription
                 text="For many students today, food insecurity is just a few missed paychecks away. A 2018 study by found that 36% of college students are experiencing hunger and lack stable housing. Add in the fact that tuition rates are going up while financial aid is going down, and it’s obvious that most college students and their families are feeling a very tight financial squeeze. But there is help out there. Students struggling to avoid hunger can find several resources to put food on the table while still completing their education." 
            />
            <Footer/>
        </div>
    );
}

export default App;
