import './css/layout.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './components/Home';
import Footer from './components/layout/footer'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
