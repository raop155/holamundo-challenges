import { Switch, Route } from 'react-router-dom';
import { Home, Schedule, Trivia, MemoryGame } from './pages';

function App() {
  return (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/schedule'>
        <Schedule />
      </Route>
      <Route path='/trivia'>
        <Trivia />
      </Route>
      <Route path='/memory-game'>
        <MemoryGame />
      </Route>
    </Switch>
  );
}

export default App;
