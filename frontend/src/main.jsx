import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screen/HomeScreen.jsx';
import LoginScreen from './screen/LoginScreen.jsx';
import RegisterScreen from './screen/RegisterScreen.jsx';
import Private from './components/Private.jsx';
import ProfileScreen from './screen/ProfileScreen.jsx';
import AdminLogin from './screen/AdminLogin.jsx';
import Dashborad from './screen/Dashboard.jsx';

import { AdminProvider } from './AdminContext/adminContext.jsx';
import AdminPrivate from './components/AdminPrivate.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} /> {/* Add this line */}
      <Route path='/register' element={<RegisterScreen />} /> {/* Add this line */}
      <Route path='/admin' element={<AdminLogin />} />
      
      <Route path='' element={<Private />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path='' element={<AdminPrivate />}>
        <Route path='/dashboard' element={<Dashborad />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AdminProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </AdminProvider>
  </Provider>
);