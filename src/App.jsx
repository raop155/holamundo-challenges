import { Switch, Route } from 'react-router-dom';
import { Home, Schedule } from './pages';

function App() {
  return (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/schedule'>
        <Schedule />
      </Route>
    </Switch>
  );
}

export default App;
