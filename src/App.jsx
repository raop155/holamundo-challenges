import { Switch, Route } from 'react-router-dom';
import { Home } from './pages';

function App() {
  return (
    <Switch>
      <Route to='/' exact>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
