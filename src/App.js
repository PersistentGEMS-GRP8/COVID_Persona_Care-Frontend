import './App.css';
import './css/layout.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './components/Home';
import Footer from './components/layout/footer'

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/auth/Login';
import ManagerList from './components/HospitalAdmin/ManageManagers/ManagerList';
import ManagerEdit from './components/HospitalAdmin/ManageManagers/ManagerEdit';
import ManagerAdd from './components/HospitalAdmin/ManageManagers/ManagerAdd';
import ReceptionistList from './components/HospitalAdmin/ManageReceptionists/ReceptionistList';
import ReceptionistAdd from './components/HospitalAdmin/ManageReceptionists/ReceptionistAdd';
import ReceptionistEdit from './components/HospitalAdmin/ManageReceptionists/ReceptionistEdit';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route path='/managers' component={ManagerList}/>
          <Route path='/manager/add' component={ManagerAdd}/>
          <Route path='/manager/:id' component={ManagerEdit}/>
          <Route path='/receptionists' component={ReceptionistList}/>
          <Route path='/receptionist/add' component={ReceptionistAdd}/>
          <Route path='/receptionist/:id' component={ReceptionistEdit}/>
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
