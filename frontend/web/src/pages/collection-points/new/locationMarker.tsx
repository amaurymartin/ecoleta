import React, { useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'

const LocationMarker = () => {
  const [position, setPosition] = useState<[number, number]>([-4.7436121, -38.5194538])

  useMapEvents({
    click (e) {
      setPosition([e.latlng.lat, e.latlng.lng])
    }
  })

  return (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

export default LocationMarker
