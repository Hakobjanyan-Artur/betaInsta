import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeWrapper from './pages/HomeWrapper';
import Home from './Componenrts/Home/Home';
import Messenger from './Componenrts/Messenger/Messenger';
import Posts from './Componenrts/Posts/Posts';
import User from './Componenrts/User/User';
import Authorization from './Componenrts/Authorization/Authorization';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route index element={<Authorization/>}/>
            <Route path='/' element={<HomeWrapper />}>
              <Route path='home' element={< Home />} />
              <Route path='mess' element={< Messenger />} />
              <Route path='posts' element={< Posts />} />
              <Route path='user' element={< User />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
