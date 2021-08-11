import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './components/LandingPage/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchHospital from './components/LandingPage/SearchHospital';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/search/:hospital'  component={SearchHospital}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
