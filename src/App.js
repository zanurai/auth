
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import PrivateRoute from './components/PrivateRoute';
import Homescreen from './screen/Homescreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ProfileScreen from './screen/ProfileScreen';


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <ToastContainer />
        <Routes>
          <Route path='/' element={<Homescreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/Register' element={<RegisterScreen />} />
          {/*privateRoute*/}
          <Route path='' element={<PrivateRoute />} >
            <Route path='/profile' element={<ProfileScreen />} />
          </Route>



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
