import './css/layout.css';
import './App.css'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './components/Home';
import Footer from './components/layout/footer'

import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from './components/Admin/AdminDashboard';
import AddHospital from './components/Admin/ManageHospitals/AddHospital';
import UpdateHospital from './components/Admin/ManageHospitals/UpdateHospital';
import AdminManageHAdmins from './components/Admin/ManageHAdmins/AdminManageHAdmins';
import AddHospitalAdmin from './components/Admin/ManageHAdmins/AddHospitalAdmin';


// import Login from './components/Register';
import Register from './components/Register';
import UpdateHospitalAdmin from './components/Admin/ManageHAdmins/UpdateHospitalAdmin';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          {/* Admin Dashboard Route */}
          <Route exact path="/admindashboard" component={AdminDashboard} />

          {/* Hospital routes */}
          <Route exact path="/manageHospitals" component={AdminDashboard} />
          <Route exact path="/addHospital" component={AddHospital} />
          <Route exact path="/updateHospital/:id" component={UpdateHospital} />

          {/* Hospital Admin routes */}

          <Route exact path="/manageHadmins" component={AdminManageHAdmins} />
          <Route exact path="/addHospitalAdmin" component={AddHospitalAdmin} />
          <Route exact path="/updateHospitalAdmin/:id" component={UpdateHospitalAdmin} />

        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
