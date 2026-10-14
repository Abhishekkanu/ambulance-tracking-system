import React, { useState } from 'react';
import axios from 'axios';

export default function Request() {
  const [status, setStatus] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const sendRequest = async () => {
    try {
      const res = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/emergency/request', {
        userId: '000000000000000000000000',
        lat: parseFloat(lat) || 28.6139,
        lng: parseFloat(lng) || 77.2090
      });
      setStatus('Request created: ' + res.data._id + ' status=' + res.data.status);
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  };

  return (
    <div style={{padding:20}}>
      <h3>Request Ambulance</h3>
      <div>
        <label>Latitude: <input value={lat} onChange={e=>setLat(e.target.value)} /></label>
      </div>
      <div>
        <label>Longitude: <input value={lng} onChange={e=>setLng(e.target.value)} /></label>
      </div>
      <button onClick={sendRequest}>Send Request</button>
      <p>{status}</p>
    </div>
  );
}
