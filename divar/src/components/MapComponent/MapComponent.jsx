// 'use client'
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { useEffect } from 'react';

// const MapComponent = ({ lat, lng }) => {
//   useEffect(() => {
//     // Fix marker icon issue
//     delete L.Icon.Default.prototype._getIconUrl;
//     L.Icon.Default.mergeOptions({
//       iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
//       iconUrl: require('leaflet/dist/images/marker-icon.png').default,
//       shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
//     });
//   }, []);

//   return (
//     <MapContainer center={[lat, lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[lat, lng]}>
//         <Popup>
//           موقعیت شما!
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapComponent;
