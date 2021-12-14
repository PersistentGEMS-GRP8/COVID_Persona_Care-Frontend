import './App.css';
import './css/layout.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
import ReceptionistNavbar from './components/Receptionist/ReceptionistNavbar';

import PatientVaccineForm from './components/Receptionist/ManagePatients/PatientVaccineForm';

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
import PatientList from './components/Receptionist/ManagePatients/PatientList';


function AppRouter() {
  const { user } = useAuth();
  const role = user.role;
  return (
    <>
      {role === Roles.DOCTOR && <DoctorNavbar />}
      {role === Roles.HOSPITAL_MANAGER && <ManagerNavbar />}
      {role === Roles.PATIENT && <PatientNavbar />}
      {role === Roles.RECEPTIONIST && <ReceptionistNavbar/>}
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
          <ProtectedRoute
            exact
            path='/manager/doctors/new'
            component={DoctorForm}
            requiredRoles={[Roles.HOSPITAL_MANAGER]}
          />
          <ProtectedRoute
            exact
            path='/addHospitalVaccines'
            component={HospitalVaccineAdd}
            requiredRoles={[Roles.HOSPITAL_MANAGER]}
          />
          <ProtectedRoute
            exact
            path='/editHospitalVaccine/:id'
            component={HospitalVaccineEdit}
            requiredRoles={[Roles.HOSPITAL_MANAGER]}
          />
          <ProtectedRoute
            exact
            path='/manageVaccines'
            component={HospitalVaccineList}
            requiredRoles={[Roles.HOSPITAL_MANAGER]}
          />
          <ProtectedRoute
            path='/manageBeds'
            component={ManageBeds}
            requiredRoles={[Roles.HOSPITAL_MANAGER]}
            exact
          />

          {/* Hospital Admin routes */}

          <ProtectedRoute
            path='/managers'
            component={ManagerList}
            requiredRoles={[Roles.HOSPITAL_ADMIN]}
            exact
          />
          <ProtectedRoute
            path='/manager/add'
            component={ManagerAdd}
            requiredRoles={[Roles.HOSPITAL_ADMIN]}
            exact
          />
          <ProtectedRoute
            path='/manager/:id'
            component={ManagerEdit}
            requiredRoles={[Roles.HOSPITAL_ADMIN]}
            exact
          />

          {/* Receptionist */}

          <ProtectedRoute
            path='/receptionists'
            component={ReceptionistList}
            requiredRoles={[Roles.HOSPITAL_ADMIN]}
            exact
          />
          <ProtectedRoute
            path='/receptionist/add'
            component={ReceptionistAdd}
            requiredRoles={[Roles.HOSPITAL_ADMIN]}
            exact
          />
          <ProtectedRoute
            path='/receptionist/:id'
            component={ReceptionistEdit}
            requiredRoles={[Roles.HOSPITAL_ADMIN]}
            exact
          />

          {/* Receptionist Routes */}
          <ProtectedRoute exact 
            path='/patients' 
            component={PatientList} 
            requiredRoles={[Roles.RECEPTIONIST]} 
          />

          <ProtectedRoute exact 
            path='/patients/add' 
            component={PatientAdd} 
            requiredRoles={[Roles.RECEPTIONIST]} 
          />

          <ProtectedRoute exact 
            path='/patients/:id' 
            component={PatientEdit} 
            requiredRoles={[Roles.RECEPTIONIST]} 
          />

          <Route exact 
            path='/patient/vaccine' 
            component={PatientVaccineForm} 
            // requiredRoles={[Roles.RECEPTIONIST]} 
          />

          {/* Admin Routes */}
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
          <ProtectedRoute
            exact
            path='/manageHospitals'
            component={AdminDashboard}
            requiredRoles={[Roles.ADMIN]}
          />
          <ProtectedRoute
            exact
            path='/addHospital'
            component={AddHospital}
            requiredRoles={[Roles.ADMIN]}
          />
          <ProtectedRoute
            exact
            path='/updateHospital/:id'
            component={UpdateHospital}
            requiredRoles={[Roles.ADMIN]}
          />
          <ProtectedRoute
            exact
            path='/manageHadmins'
            component={AdminManageHAdmins}
            requiredRoles={[Roles.ADMIN]}
          />
          <ProtectedRoute
            exact
            path='/addHospitalAdmin'
            component={AddHospitalAdmin}
            requiredRoles={[Roles.ADMIN]}
          />
          <ProtectedRoute
            exact
            path='/updateHospitalAdmin/:id'
            component={UpdateHospitalAdmin}
            requiredRoles={[Roles.ADMIN]}
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
