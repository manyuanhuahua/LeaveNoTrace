/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap,Marker,DirectionsRenderer, LoadScript } from "@react-google-maps/api"
import "./map.css"
import { useHistory, useParams } from 'react-router-dom';

import {createActivityThunk} from "../../store/activity"
import {getTrailDetailThunk} from "../../store/trail"
import {addApiThunk} from "../../store/session"
import LoaderSecond from '../loader/Loader2';








function CreateActivity(){
    const history = useHistory()
    const {trailId} = useParams()
    const apiKey = useSelector(state => state.session.api)
    const [apiLoad, setApiLoad] = useState(false)

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

    useEffect(() => {
      dispatch(addApiThunk()).then(() => setApiLoad(true));
  }, [dispatch]);


    const addMarker = (coords) => {
      setId((id)=>id+1);
      setMarkers((markers) => markers.concat([{coords, id}]) )
    }

    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false);
        },2000)
    },[]);






    const staticMap = (res) =>{
      let image = `https://maps.googleapis.com/maps/api/staticmap?size=500x500`
      let APIKey = apiKey
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




      const directionsService = new google.maps.DirectionsService();
      await directionsService.route({
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.WALKING,
          avoidTolls: true,
      }).then((res) => {
          setDirectionsResponse(res);
          setmapUrl(staticMap(res))
          setOriLat(origin.lat)
          setOriLog(origin.lng)
          setDesLat(destination.lat)
          setDesLog(destination.lng)
          setShowMarker(false)
          setDistance(res.routes[0].legs[0].distance.text)
          setDuration(res.routes[0].legs[0].duration.text)
        }).catch((e) => {
            alert("Could not display directions due to: " + e);
        });


  }

  const hancleClear = () =>{
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    setMarkers([])
    setOriLat('')
    setOriLog('')
    setDesLat('')
    setDesLog('')
    setName('')
    setmapUrl('')
    setErrors([])

    setId(0)
    setShowMarker(true)


  }

  const hancleCancel = () =>{
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    setMarkers([])
    setOriLat('')
    setOriLog('')
    setDesLat('')
    setDesLog('')
    setName('')
    history.goBack();
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
        setErrors([]);
        const trimedName = name.trim()
        const newActivity = {
          name:trimedName,
          ori_lat:oriLat,
          ori_log:oriLog,
          des_lat:desLat,
          des_log:desLog,
          distance:distance,
          duration:duration,
          static_url:mapUrl
        };

        dispatch(createActivityThunk(trailId,newActivity))
            .then(
                async (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    }
                    else {

                        history.goBack();
                    }

                })

  }

  return trailIsLoaded && apiLoad && (
    <>
        {loading? (
            <div className='loader-container'>
                <LoaderSecond />
            </div>
            ) : (
            <>
    <div className='main-box'>
      <div className='left-map-box'>
        <div className='map-use-instruction'>
          <h3>Instruction to Create activity:</h3>
          <p>1. Click on the map to set your origin and destination points.</p>
          <p>2. Enter your activity name.</p>
          <p>3. Click the 'Display' button to generate your activity route.</p>
          <p>4. Click the 'Save' button to save your activity.</p>
          <p>* Click the 'Cancel' button to cancel your activity creation.</p>
          <p>* If you accidently drop your markers, or after you click display, you change your mind,
            you can click 'Clear' button to clear the points on map.</p>
          <p>* Click the 'ReCenter' button to recenter the map according to the trail.</p>

        </div>
        <div className='left-input-box'>
        <form className="create-activity-form" onSubmit={handleSubmit}>
          <div className='marker-coords'>
                <label>Name: </label>
                <input type='text'
                  value={name}

                  onChange={e => setName(e.target.value)}
                  style={{overflowWrap:'break-word'}}
                  maxLength={101}
                  />


              <div className='input-ori'>
                <label>Origin: </label>
                <input
                  type='text'
                  placeholder='Latitude'
                  value={oriLat}
                  readOnly


                  />
                <input
                  type='text'
                  placeholder='longtitude'
                  value={oriLog}
                  readOnly

                  />
              </div>
              <div className='input-des'>
                <label>Destination: </label>
                <input
                  type='text'
                  placeholder='Latitude'
                  value={desLat}
                  readOnly

                  />
                <input
                  type='text'
                  placeholder='longtitude'
                  value={desLog}
                  readOnly

                  />
              </div>
          </div>
          <div className='statistics'>
              <div>Distance: {distance}</div>

              <div>Duration: {duration}</div>


          </div>

          <div className='map-buttons'>
              <button type='button' onClick={()=>{
                if(markers.length<2){
                  setErrors(['Please click map to set your origin and destination points'])
                }else{
                  displayRoute(markers[0]?.coords,markers[1]?.coords)
                }
                }}>Display</button>
              <button type='submit'onClick={handleSubmit}>Save</button>
              <button type='button' onClick={hancleClear}>Clear</button>
              <button type='button' onClick={hancleCancel}>Cancel</button>


              <button type='button' onClick={()=> map.panTo({lat:trail.lat,lng:trail.log})}>ReCenter</button>
          </div>
          <ul>
              {errors.map((error, idx) => (
                <li key={idx} >{error}</li>
                ))}
          </ul>
          </form>
      </div>
      </div>
      <div className='right-map-box'>
       
        <LoadScript
        googleMapsApiKey={apiKey}
        >
        <GoogleMap
          center={{lat:trail.lat,lng:trail.log}}
          zoom={12}
          mapContainerStyle={{width:'600px', height:'600px'}}
          options={{
            streetViewControl:false
          }}
          onLoad={map=>setMap(map)}
          onClick={(e)=> addMarker(e.latLng.toJSON())

          }
        >


            {markers ? (
                markers.filter((marker)=> marker.id <2).map((marker) => {
                  return showMarker && (
                    <Marker
                      key={marker.id}
                      draggable={true}
                      position={marker.coords}
                      onDragEnd={e => marker.coords = e.latLng.toJSON()}
                    />
                  )
                })) : null
                }




          {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
        </GoogleMap>
        </LoadScript>


      </div>

    </div>
    </>)
  }
  </>
  )

}



export default CreateActivity;
