import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

export default function Track() {
  const [drivers, setDrivers] = useState([]);

  useEffect(()=>{
    socket.on('driverLocationUpdate', (data) => {
      // data { driverId, lat, lng }
      setDrivers(prev => {
        const copy = prev.filter(d => d.driverId !== data.driverId);
        copy.push(data);
        return copy;
      });
    });

    return () => {
      socket.off('driverLocationUpdate');
    };
  },[]);

  return (
    <div style={{padding:10}}>
      <h3>Live Tracking</h3>
      <MapContainer center={[28.6139,77.2090]} zoom={13} style={{height: '70vh'}}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {drivers.map(d => (
          <Marker key={d.driverId} position={[d.lat, d.lng]}>
            <Popup>Driver: {d.driverId}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
