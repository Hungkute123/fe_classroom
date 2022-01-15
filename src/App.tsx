import React from 'react';
import { Routers } from './routers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <div className="app">
       <ToastContainer />
      <Routers />
    </div>
  );
}
