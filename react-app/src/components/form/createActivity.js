/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useJsApiLoader,GoogleMap,Marker,DirectionsRenderer } from "@react-google-maps/api"
import MapLoading from '../map/mapLoading';
import "./map.css"
import { useHistory, useParams } from 'react-router-dom';

import {createActivityThunk} from "../../store/activity"
import {getTrailDetailThunk} from "../../store/trail"







function CreateActivity(){
    const history = useHistory()
    const {trailId,activityId} = useParams()
    const {isLoaded} = useJsApiLoader({
      googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    const dispatch = useDispatch();
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [directionsResponse,setDirectionsResponse] = useState(null)
    const [name, setName] = useState('')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [oriLat, setOriLat] = useState('')
    const [oriLog, setOriLog] = useState('')
    const [desLat, setDesLat] = useState('')
    const [desLog, setDesLog] = useState('')
    const [mapUrl, setmapUrl] = useState('')
    const [errors, setErrors] = useState([])
    const [ id, setId ] = useState(0);
    const [ markers, setMarkers ] = useState([]);
    const [showMarker, setShowMarker] = useState(true)
    const trailObj = useSelector(state => state.trail);
    const trail = Object.values(trailObj)[0];
    const [trailIsLoaded, setTrailsIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getTrailDetailThunk(trailId)).then(() => setTrailsIsLoaded(true));
    }, [dispatch,trailId]);


    const addMarker = (coords) => {
      setId((id)=>id+1);
      setMarkers((markers) => markers.concat([{coords, id}]) )
    }


    if(!isLoaded){
      return <MapLoading />
    }



    const staticMap = (res) =>{
      let image = `https://maps.googleapis.com/maps/api/staticmap?size=500x500`
      let APIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      let route = res.routes[0]
      const color = `&path=weight:8%7Ccolor:red%7C`
      const path = route.overview_polyline
      const enc_path = `enc:${path}`
      const startMarker = `&markers=color:blue%7Clabel:S%7C${markers[0].coords.lat},${markers[0].coords.lng}`
      const endMarker = `&markers=color:orange%7Clabel:D%7C${markers[1].coords.lat},${markers[1].coords.lng}`
      image += color + enc_path + startMarker + endMarker +  '&key=' + `${APIKey}`
      return image
    }



    const displayRoute = async (origin,destination)=>{
      if(!origin || !destination){
        return
      }
      // setOriLat(origin.lat)
      // setOriLog(origin.lng)
      // setDesLat(destination.lat)
      // setDesLog(destination.lng)
      // setShowMarker(false)


      console.log("ori in route------",origin)
      console.log("des in route------",destination)
      const directionsService = new google.maps.DirectionsService();
      await directionsService.route({
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.WALKING,
          avoidTolls: true,
      }).then((res) => {
          setDirectionsResponse(res);
          setmapUrl(staticMap(res))
          // console.log("STATIC MAP------",mapUrl)
          console.log("ori in route------",origin)
          console.log("des in route------",destination)
          setOriLat(origin.lat)
          setOriLog(origin.lng)
          setDesLat(destination.lat)
          setDesLog(destination.lng)
          setShowMarker(false)
          // setOriLat()
          setDistance(res.routes[0].legs[0].distance.text)
          setDuration(res.routes[0].legs[0].duration.text)
        }).catch((e) => {
            alert("Could not display directions due to: " + e);
        });


  }
  // console.log("STATIC MAP------",mapUrl)

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
  //   history.push('/maps/new')


  // }

  const hancleCancel = () =>{
    // hancleClear()
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    setMarkers([])
    setOriLat('')
    setOriLog('')
    setDesLat('')
    setDesLog('')
    setName('')
    history.push('/trails')
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
        setErrors([]);

        const newActivity = {
          name:name,
          ori_lat:oriLat,
          ori_log:oriLog,
          des_lat:desLat,
          des_log:desLog,
          distance:distance,
          duration:duration,
          static_url:mapUrl
        };
        console.log("newActivity------",newActivity)
        dispatch(createActivityThunk(trailId,newActivity))
            .then(
                async (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    }
                    else {
                        // hideModal()
                        history.push(`/trails/${trail.id}`);
                    }

                })

  }

  return trailIsLoaded && (
    <div className='main-box'>

      <div className='right-map-box'>
        {/* initMap */}

        <GoogleMap
          center={{lat:trail.lat,lng:trail.log}}
          zoom={12}
          mapContainerStyle={{width:'800px', height:'800px'}}
          options={{
            streetViewControl:false
          }}
          onLoad={map=>setMap(map)}
          onClick={(e)=> addMarker(e.latLng.toJSON())
            // console.log("markers--------",markers)
          }

        >


            {markers ? (
                markers.filter((marker)=> marker.id <2).map((marker) => {
                  return showMarker && (
                    <Marker
                      key={marker.id}
                      draggable={false}
                      position={marker.coords}
                      // onDragEnd={e => marker.coords = e.latLng.toJSON()}
                    />
                  )
                })) : null
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
                <label>Origin: </label>
                <input
                  type='text'
                  placeholder='Latitude'
                  value={oriLat}
                  readOnly
                  // onChange={e => setOriLat(e.target.value)}
                  />
                <input
                  type='text'
                  placeholder='longtitude'
                  value={oriLog}
                  readOnly
                  // onChange={e => setOriLog(e.target.value)}
                  />
              </div>
              <div className='input-des'>
                <label>Destination: </label>
                <input
                  type='text'
                  placeholder='Latitude'
                  value={desLat}
                  readOnly
                  // onChange={e => setDesLat(e.target.value)}
                  />
                <input
                  type='text'
                  placeholder='longtitude'
                  value={desLog}
                  readOnly
                  // onChange={e => setDesLog(e.target.value)}
                  />
              </div>
          </div>
          <div className='statistics'>
              <div>Distance: {distance}</div>

              <div>Duration: {duration}</div>


          </div>

          <div className='map-buttons'>
              <button onClick={()=> displayRoute(markers[0].coords,markers[1].coords)}>Display</button>
              <button type='submit'onClick={handleSubmit}>Create</button>
              {/* <button onClick={hancleClear}>Clear</button> */}
              <button onClick={hancleCancel}>Cancel</button>


              <button onClick={()=> map.panTo({lat:trail.lat,lng:trail.log})}>Reset Center</button>
          </div>
          <ul>
              {errors.map((error, idx) => (
                <li key={idx} >{error}</li>
                ))}
          </ul>
          </form>
      </div>

      </div>

    </div>
  )

}



export default CreateActivity;
