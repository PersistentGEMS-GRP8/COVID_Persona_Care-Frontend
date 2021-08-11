import './css/layout.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './components/Home';
import Footer from './components/layout/footer'

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/auth/Login';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
