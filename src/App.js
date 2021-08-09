import './css/layout.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './components/Home';
import Footer from './components/layout/footer';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <Router>
        <main>
          <Container>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
