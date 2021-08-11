import './App.css';
import './css/layout.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/LandingPage/Home';
import SearchHospital from './components/LandingPage/SearchHospital';

import Footer from './components/layout/footer';
import Register from './pages/Register';
import ManagerDashboard from './pages/ManagerDashboard';
import RegisterDoctor from './pages/DoctorForm';
import NotFound from './pages/NotFound';

import { useAuth, AuthProvider } from './context/authContext';

import Login from './pages/auth/Login';
import ManagerList from './components/HospitalAdmin/ManageManagers/ManagerList';
import ManagerEdit from './components/HospitalAdmin/ManageManagers/ManagerEdit';
import ManagerAdd from './components/HospitalAdmin/ManageManagers/ManagerAdd';
import ReceptionistList from './components/HospitalAdmin/ManageReceptionists/ReceptionistList';
import ReceptionistAdd from './components/HospitalAdmin/ManageReceptionists/ReceptionistAdd';
import ReceptionistEdit from './components/HospitalAdmin/ManageReceptionists/ReceptionistEdit';

import AdminDashboard from './components/Admin/AdminDashboard';
import AddHospital from './components/Admin/ManageHospitals/AddHospital';
import UpdateHospital from './components/Admin/ManageHospitals/UpdateHospital';
import AdminManageHAdmins from './components/Admin/ManageHAdmins/AdminManageHAdmins';
import AddHospitalAdmin from './components/Admin/ManageHAdmins/AddHospitalAdmin';
import UpdateHospitalAdmin from './components/Admin/ManageHAdmins/UpdateHospitalAdmin';

function App() {
  return (
    <Router>
      <AuthProvider>
        <main>
          <Container fluid>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route
                exact
                path='/manager/dashboard'
                component={ManagerDashboard}
              />
              <Route exact path='/doctors/:id' component={RegisterDoctor} />
              <Route path='/managers' component={ManagerList} />
              <Route path='/manager/add' component={ManagerAdd} />
              <Route path='/manager/:id' component={ManagerEdit} />
              <Route path='/receptionists' component={ReceptionistList} />
              <Route path='/receptionist/add' component={ReceptionistAdd} />
              <Route path='/receptionist/:id' component={ReceptionistEdit} />

              {/* Admin Dashboard Route */}
              <Route exact path='/admindashboard' component={AdminDashboard} />

              {/* Hospital routes */}
              <Route exact path='/manageHospitals' component={AdminDashboard} />
              <Route exact path='/addHospital' component={AddHospital} />
              <Route
                exact
                path='/updateHospital/:id'
                component={UpdateHospital}
              />

              {/* Hospital Admin routes */}

              <Route
                exact
                path='/manageHadmins'
                component={AdminManageHAdmins}
              />
              <Route
                exact
                path='/addHospitalAdmin'
                component={AddHospitalAdmin}
              />
              <Route
                exact
                path='/updateHospitalAdmin/:id'
                component={UpdateHospitalAdmin}
              />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
