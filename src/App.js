import './App.css';
import './css/layout.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './components/LandingPage/Home';
import SearchHospital from './components/LandingPage/SearchHospital';

import Footer from './components/layout/footer';
import Register from './pages/Register';
import ManagerDashboard from './pages/ManagerDashboard';
import DoctorForm from './pages/DoctorForm';
import NotFound from './pages/NotFound';

import { useAuth, AuthProvider } from './context/authContext';
import Roles from './constants/roles';

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
import ManageBeds from './components/Manager/ManageBeds';

import DoctorNavbar from './components/navbar/DoctorNavbar';

import { ProtectedRoute, AuthRoute } from './routes';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorUpdate from './pages/Doctor/DoctorUpdate';
import PatientAdd from './components/Receptionist/ManagePatients/PatientAdd';
import PatientEdit from './components/Receptionist/ManagePatients/PatientEdit';
import PatientVaccineForm from './components/Receptionist/ManagePatients/PatientVaccineForm';
import ReceptionistDashboard from './components/Receptionist/ReceptionistDashboard';

import HospitalVaccineList from './components/Manager/HospitalVaccineList';
import HospitalVaccineAdd from './components/Manager/HospitalVaccineAdd';
import HospitalVaccineEdit from './components/Manager/HospitalVaccineEdit';
import ManagerNavbar from './components/Manager/ManagerNavbar';
import Specialization from './components/Admin/ManageSpecialization/Specialization';
import PatientVaccineStatus from './pages/Patient/PatientVaccineStatus';
import PatientHome from './pages/Patient/PatientHome';
import PatientNavbar from './components/navbar/PatientNavbar';
import AdminManage from './components/Admin/AdminManage';
import AddAdmin from './components/Admin/AddAdmin';

function AppRouter() {
  const { user } = useAuth();
  const role = user.role;
  return (
    <>
      {role === Roles.DOCTOR && <DoctorNavbar />}
      {role === Roles.HOSPITAL_MANAGER && <ManagerNavbar />}
      {role === Roles.PATIENT && <PatientNavbar />}
      <main>
        {/* <Container fluid> */}

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/search/:hospital' component={SearchHospital} />

          <AuthRoute exact path='/login' component={Login} />

          <AuthRoute exact path='/register' component={Register} />

          {/* Manager */}
          <ProtectedRoute
            exact
            path='/manager/dashboard'
            component={ManagerDashboard}
            requiredRoles={[Roles.HOSPITAL_MANAGER]}
          />

          <Route path='/managers' component={ManagerList} exact />
          <Route path='/manager/add' component={ManagerAdd} exact />
          <Route path='/manager/:id' component={ManagerEdit} exact />
          <Route path='/manageBeds' component={ManageBeds} exact />
          <ProtectedRoute
            exact
            path='/manager/doctors/new'
            component={DoctorForm}
            requiredRoles={[Roles.HOSPITAL_MANAGER]}
          />

          <Route
            path='/manager/addVaccines'
            component={HospitalVaccineAdd}
            exact
          />
          <Route
            path='/manager/editVaccine/:id'
            component={HospitalVaccineEdit}
          />

          <Route path='/manageVaccines' component={HospitalVaccineList} />
          {/* Receptionist */}

          <Route path='/receptionists' component={ReceptionistList} />
          <Route path='/receptionist/add' component={ReceptionistAdd} />
          <Route path='/receptionist/:id' component={ReceptionistEdit} />

          <Route exact path='/patient/list' component={ReceptionistDashboard} />
          <Route exact path='/patient/add' component={PatientAdd} />
          <Route exact path='/patient/vaccine' component={PatientVaccineForm} />
          <Route exact path='/patient/edit/:id' component={PatientEdit} />

          {/* Admin Dashboard Route */}
          <ProtectedRoute
            exact
            path='/admindashboard'
            component={AdminDashboard}
            requiredRoles={[Roles.ADMIN]}
          />

          <ProtectedRoute
            exact
            path='/specialization'
            component={Specialization}
            requiredRoles={[Roles.ADMIN]}
          />

          <ProtectedRoute
            exact
            path='/admin/manage'
            component={AdminManage}
            requiredRoles={[Roles.ADMIN]}
          />

          <ProtectedRoute
            exact
            path='/admin/new'
            component={AddAdmin}
            requiredRoles={[Roles.ADMIN]}
          />

          {/* Hospital routes */}
          <Route exact path='/manageHospitals' component={AdminDashboard} />
          <Route exact path='/addHospital' component={AddHospital} />
          <Route exact path='/updateHospital/:id' component={UpdateHospital} />

          {/* Hospital Admin routes */}

          <Route exact path='/manageHadmins' component={AdminManageHAdmins} />
          <Route exact path='/addHospitalAdmin' component={AddHospitalAdmin} />
          <Route
            exact
            path='/updateHospitalAdmin/:id'
            component={UpdateHospitalAdmin}
          />

          {/* Doctor routes */}
          <ProtectedRoute
            exact
            path='/doctor/dashboard'
            component={DoctorDashboard}
            requiredRoles={[Roles.DOCTOR]}
          />

          <ProtectedRoute
            exact
            path='/doctor/update'
            component={DoctorUpdate}
            requiredRoles={[Roles.DOCTOR]}
          />

          {/* Patient route */}
          <ProtectedRoute
            path='/patient/home'
            component={PatientHome}
            requiredRoles={[Roles.PATIENT]}
            exact
          />

          <ProtectedRoute
            path='/patient/vaccine/status'
            component={PatientVaccineStatus}
            requiredRoles={[Roles.PATIENT]}
            exact
          />

          <Route component={NotFound} />
        </Switch>

        {/* </Container> */}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  );
}
