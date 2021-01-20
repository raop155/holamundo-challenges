import { Switch, Route } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Home, Schedule, Trivia, MemoryGame } from './pages';

function App() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default App;
