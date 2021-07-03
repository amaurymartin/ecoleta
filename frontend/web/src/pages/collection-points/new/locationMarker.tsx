import React from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'

interface LocationProps {
  currentPosition: [number, number],
  setCurrentPosition: any
}

const LocationMarker = (props: LocationProps) => {
  useMapEvents({
    click (e) {
      props.setCurrentPosition([e.latlng.lat, e.latlng.lng])
    }
  })

  return (
    <Marker position={props.currentPosition}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

export default LocationMarker
