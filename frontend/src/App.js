import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './components/auth/Login';
import Events from './components/Events';
import Register from './components/auth/Register';
import Auth from './components/auth/Auth';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="login" />}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/events' element={<Auth><Events/></Auth>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
