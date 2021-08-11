import './css/layout.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './components/Home';
import Footer from './components/layout/footer';
import Register from './pages/Register';
import ManagerDashboard from './pages/ManagerDashboard';
import RegisterDoctor from './pages/DoctorForm';
import NotFound from './pages/NotFound';

import { useAuth, AuthProvider } from './context/authContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <main>
          <Container fluid>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route
                exact
                path='/manager/dashboard'
                component={ManagerDashboard}
              />
              <Route exact path='/doctors/:id' component={RegisterDoctor} />
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
