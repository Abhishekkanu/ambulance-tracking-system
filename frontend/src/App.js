import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Track from './pages/Track';
import Request from './pages/Request';

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{padding:10, background:'#eee'}}>
        <Link to='/' style={{marginRight:10}}>Home</Link>
        <Link to='/request' style={{marginRight:10}}>Request Ambulance</Link>
        <Link to='/track'>Track</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/request' element={<Request/>} />
        <Route path='/track' element={<Track/>} />
      </Routes>
    </BrowserRouter>
  );
}
