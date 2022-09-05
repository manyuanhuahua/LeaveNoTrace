/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useJsApiLoader,GoogleMap,Marker,DirectionsRenderer } from "@react-google-maps/api"
import MapLoading from './mapLoading';
import "./map.css"
import { useHistory } from 'react-router-dom';
import { useDispatch} from "react-redux";
import {updateActivityThunk} from "../../store/activity"



const center={lat:37.72620918325973,lng:-119.55160191563179,}
const activity ={
  trail_id : 1,
  user_id : 1,
  name : "My First hike",
  ori_lat : "37.74213",
  ori_log : "-119.60186",
  des_lat : "37.75714",
  des_log :"-119.59769",
  distance : 4061,
  duration : 6335,
  static_url : "https://fullsuitcase.com/wp-content/uploads/2022/03/Zermatt-hiking-map-indicating-10-best-hikes.jpg"
}



function EditMap({trail,activity}){
    const history = useHistory()
    const {isLoaded} = useJsApiLoader({
      googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    const dispatch = useDispatch();
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [directionsResponse,setDirectionsResponse] = useState(null)
    const [name, setName] = useState(activity.name)
    const [distance, setDistance] = useState(activity.distance)
    const [duration, setDuration] = useState(activity.duration)
    const [oriLat, setOriLat] = useState(activity.oriLat)
    const [oriLog, setOriLog] = useState(activity.oriLog)
    const [desLat, setDesLat] = useState(activity.desLat)
    const [desLog, setDesLog] = useState(activity.desLog)
    const [errors, setErrors] = useState([])

    let origin = {lat:activity.oriLat,lng:activity.oriLog}
    let destination = {lat:activity.desLat,lng:activity.desLog}

    const markers = [
      {
        id: 1,
        coords: {lat:activity.oriLat,lng:activity.oriLog}
      },
      {
        id: 2,
        coords: {lat:activity.desLat,lng:activity.desLog}
      }
    ]
    // const addMarker = (coords) => {
    //   setId((id)=>id+1);
    //   setMarkers((markers) => markers.concat([{coords, id}]) )
    // }



    if(!isLoaded){
      return <MapLoading />
    }

  // function computeTotalDistance(result) {
  //   let total = 0;
  //   const myroute = result.routes[0];

  //   if (!myroute) {
  //     return;
  //   }

  //   for (let i = 0; i < myroute.legs.length; i++) {
  //     total += myroute.legs[i].distance.value;
  //   }

  //   total = total / 1000;
  //   document.getElementById("total").innerHTML = total + " km";
  // }


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
          // setOriLat()
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

  // const hancleClear = () =>{
  //   setDirectionsResponse(null)
  //   setDistance('')
  //   setDuration('')
  //   setMarkers([])
  //   setOriLat('')
  //   setOriLog('')
  //   setDesLat('')
  //   setDesLog('')
  //   setName('')

  // }

  const hancleCancel = () =>{
    // hancleClear()
    history.push('/trails')
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
        setErrors([]);

        const updatedActivity = {
          ...activity,
          name:name,
          ori_lat:oriLat,
          ori_log:oriLog,
          des_lat:desLat,
          des_log:desLog,
          distance:distance,
          duration:duration,
          // static_url:static_url
        };
        dispatch(updateActivityThunk(1,updatedActivity))
            .then(
                async (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    }
                    else {
                        // hideModal()
                        history.push(`/trails/${trail.id}/activities`);
                    }

                })

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
          // onClick={(e)=> addMarker(e.latLng.toJSON())
            // console.log("markers--------",markers)
          // }

        >


            {markers &&
                markers.map((marker) => {
                  return (
                    <Marker
                      key={marker.id}
                      draggable={true}
                      position={marker.coords}
                      onDragEnd={e => marker.coords = e.latLng.toJSON()}
                    />
                  )
                })
                }




          {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
        </GoogleMap>
        <div className='left-input-box'>
        <form className="create-activity-form" onSubmit={handleSubmit}>
          <div className='marker-coords'>
                <label>Name: </label>
                <input type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}/>
              <div className='input-ori'>
              </div>

              <div className='input-ori'>
                <label>Origin: </label>
                <input
                  type='text'
                  placeholder='Latitude'
                  value={oriLat}
                  // onChange={ markers=> setOriLat(e.target.value)}
                  />
                <input
                  type='text'
                  placeholder='longtitude'
                  value={oriLog}
                  onChange={e => setOriLog(e.target.value)}/>
              </div>
              <div className='input-des'>
                <label>Destination: </label>
                <input
                  type='text'
                  placeholder='Latitude'
                  value={desLat}
                  onChange={e => setDesLat(e.target.value)}/>
                <input
                  type='text'
                  placeholder='longtitude'
                  value={desLog}
                  onChange={e => setDesLog(e.target.value)}/>
              </div>
          </div>
          <div className='statistics'>
              <div>Distance: {distance}</div>
              {/* <input
                type='text'
                value={distance}
                onChange={e => setDistance(e.target.value)}
                /> */}
              <div>Duration: {duration}</div>
              {/* <input
                type='text'
                value={duration}
                onChange={e => setDuration(e.target.value)}
                /> */}

          </div>

          <div className='map-buttons'>
              <button onClick={()=> displayRoute(markers[0].coords,markers[1].coords)}>Display</button>
              <button type='submit'onClick={handleSubmit}>Update</button>
              {/* <button onClick={hancleClear}>Clear</button> */}
              <button onClick={hancleCancel}>Cancel</button>

              {/* in order to use Panto method, need to define map type to GoogleMap to active google.maps.Map class */}
              <button onClick={()=> map.panTo(center)}>Reset Center</button>
          </div>
          </form>
      </div>

      </div>

    </div>
  )

}







export default EditMap;
