
import React, { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export const Maps: FC<IMapsProp> = ({position, userName}) =>{

    return(
        <MapContainer center={position} zoom={5} scrollWheelZoom={false} style={{width:'100%', height:'300px'}}>
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <Marker position={position}>
          <Popup>
           {userName}
          </Popup>
        </Marker>
      </MapContainer>
    )

}