/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useJsApiLoader,GoogleMap,Marker,DirectionsRenderer } from "@react-google-maps/api"
import MapLoading from './mapLoading';
import "./map.css"


const center={lat:37.72620918325973,lng:-119.55160191563179,}

function CreateMap(){

    const {isLoaded} = useJsApiLoader({
      googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [directionsResponse,setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [origin, setOrigin] = useState({})
    const [destination, setdestination] = useState({})





    if(!isLoaded){
      return <MapLoading />
    }

    const displayRoute = async (origin,destination)=>{
      if(!origin || !destination){
        return
      }

      const directionsService = new google.maps.DirectionsService();
      await directionsService.route({
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.WALKING,
          avoidTolls: true,
      }).then((res) => {
          setDirectionsResponse(res);
          setDistance(res.route[0].legs[0].distance.text)
          setDuration(res.route[0].legs[0].duration.text)
        }).catch((e) => {
            alert("Could not display directions due to: " + e);
        });

    //     result.addListener("directions_changed", () => {
    //   const directions = directionsRenderer.getDirections();

    //   if (directions) {
    //     computeTotalDistance(directions);
    //   }
    // });

  }

  const hancleClear = () =>{
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    // origin
  }

  return (
    <div className='main-box'>

      <div className='right-map-box'>
        {/* initMap */}

        <GoogleMap
          center={center}
          zoom={8}
          mapContainerStyle={{width:'800px', height:'800px'}}
          options={{
            streetViewControl:false
          }}
          onLoad={map=>setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
        </GoogleMap>
        <div className='left-input-box'>
        <div className='marker-coords'>
            <div className='input-ori'>
              <label>Origin: </label>
              <input type='text' placeholder='Latitude' />
              <input type='text' placeholder='longtitude' />
            </div>
            <div className='input-des'>
              <label>Destination: </label>
              <input type='text' placeholder='Latitude' />
              <input type='text' placeholder='longtitude' />
            </div>
        </div>
        <div className='statistics'>
            <p>Distance: {distance}</p>
            <p>Duration: {duration}</p>
        </div>
        <div className='map-buttons'>
            <button type='submit' onClick={displayRoute(origin,destination)}>Create activity</button>
            <button onClick={hancleClear}>Cancel</button>
            {/* in order to use Panto method, need to define map type to GoogleMap to active google.maps.Map class */}
            <button onClick={()=> map.panTo(center)}>Reset Center</button>
        </div>
      </div>

      </div>

    </div>
  )

}


//   function displayRoute(origin, destination, service, display) {
//     service
//       .route({
//         origin: origin,
//         destination: destination,
//         /* waypoints: [
//           { location: "Adelaide, SA" },
//           { location: "Broken Hill, NSW" },
//         ], */
//         travelMode: google.maps.TravelMode.WALKING,
//         avoidTolls: true,
//       })
//       .then((result) => {
//         display.setDirections(result);
//       })
//       .catch((e) => {
//         alert("Could not display directions due to: " + e);
//       });
//   }

//   function computeTotalDistance(result) {
//     let total = 0;
//     const myroute = result.routes[0];

//     if (!myroute) {
//       return;
//     }

//     for (let i = 0; i < myroute.legs.length; i++) {
//       total += myroute.legs[i].distance.value;
//     }

//     total = total / 1000;
//     document.getElementById("total").innerHTML = total + " km";
//   }



export default CreateMap;
