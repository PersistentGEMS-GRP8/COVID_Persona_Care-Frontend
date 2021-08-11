import './App.css';
import './css/layout.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Footer from './components/layout/footer';
import Register from './pages/Register';
import ManagerDashboard from './pages/ManagerDashboard';
import DoctorForm from './pages/DoctorForm';
import NotFound from './pages/NotFound';

import { useAuth, AuthProvider } from './context/authContext';

import Login from './pages/auth/Login';
import ManagerList from './components/HospitalAdmin/ManageManagers/ManagerList';
import ManagerEdit from './components/HospitalAdmin/ManageManagers/ManagerEdit';
import ManagerAdd from './components/HospitalAdmin/ManageManagers/ManagerAdd';
import ReceptionistList from './components/HospitalAdmin/ManageReceptionists/ReceptionistList';
import ReceptionistAdd from './components/HospitalAdmin/ManageReceptionists/ReceptionistAdd';
import ReceptionistEdit from './components/HospitalAdmin/ManageReceptionists/ReceptionistEdit';

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
              <Route exact path='/doctors/:id' component={DoctorForm} />
              <Route path='/managers' component={ManagerList} />
              <Route path='/manager/add' component={ManagerAdd} />
              <Route path='/manager/:id' component={ManagerEdit} />
              <Route path='/receptionists' component={ReceptionistList} />
              <Route path='/receptionist/add' component={ReceptionistAdd} />
              <Route path='/receptionist/:id' component={ReceptionistEdit} />
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
