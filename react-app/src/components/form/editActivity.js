/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useJsApiLoader,GoogleMap,Marker,DirectionsRenderer,LoadScript  } from "@react-google-maps/api"
import MapLoading from '../map/mapLoading';
import "./map.css"
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch,useSelector} from "react-redux";
import {updateActivityThunk,getActivityDetailThunk} from "../../store/activity"
import {addApiThunk} from "../../store/session"
import LoaderSecond from '../loader/Loader2';



function EditActivity(){
    const history = useHistory()
    let location = useLocation();
    const apiKey = useSelector(state => state.session.api)
    const [apiLoad, setApiLoad] = useState(false)
    const [loading,setLoading] = useState(false)
    const activity = location.state.activity
    // const {isLoaded} = useJsApiLoader({
    //   googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // })

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
    const [mapUrl, setmapUrl] = useState(activity.staticMap)
    const [showMarker, setShowMarker] = useState(true)
    const [activityIsLoaded,setActivityIsLoaded] = useState(false)


    const [errors, setErrors] = useState([])
    const [markers, setMarkers] = useState([
      {
        id: 1,
        coords: {lat:activity.oriLat,lng:activity.oriLog}
      },
      {
        id: 2,
        coords: {lat:activity.desLat,lng:activity.desLog}
      }
    ])


    useEffect(() => {
      dispatch(getActivityDetailThunk(activity.trail.id,activity.id)).then(() => setActivityIsLoaded(true));
  }, [dispatch,activity.id,activity.trail.id]);

  useEffect(() => {
    dispatch(addApiThunk()).then(() => setApiLoad(true));
  }, [dispatch]);


    // if(!isLoaded){
    //   return <MapLoading />
    // }


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
          console.log("res--------",res)
          setDirectionsResponse(res);
          setmapUrl(staticMap(res))
          console.log("url--------",mapUrl)

          setOriLat(origin.lat)
          setOriLog(origin.lng)
          setDesLat(destination.lat)
          setDesLog(destination.lng)


          setShowMarker(false)
          // setOriLat()
          setDistance(res.routes[0].legs[0].distance.text)
          setDuration(res.routes[0].legs[0].duration.text)
          // console.log("distance--------",distance)
          // console.log("duration--------",duration)


        }).catch((e) => {
          const emsg= e.message
          console.log('error--------',e.message)
          const msgArr= emsg.split(':')
          const last = msgArr[msgArr.length-1]
          console.log('last--------',last)

            setErrors(["Could not display directions due to: " + last]);
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
    setDistance(activity.distance)
    setDuration(activity.duration)
    setOriLat(activity.oriLat)
    setOriLog(activity.oriLog)
    setDesLat(activity.desLat)
    setDesLog(activity.desLog)
    setName(activity.name)
    setmapUrl(activity.staticMap)
    setErrors([])


    setShowMarker(true)
    setMarkers([
      {
        id: 1,
        coords: {lat:activity.oriLat,lng:activity.oriLog}
      },
      {
        id: 2,
        coords: {lat:activity.desLat,lng:activity.desLog}
      }
    ])




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
    // hideModal()
    // history.push(`/trails/${activity.trail.id}`)
    history.goBack();

  }



  const handleSubmit = async (e) => {
    e.preventDefault();
        setErrors([]);
        const trimedName = name.trim()

        const updatedActivity = {
          // ...activity,
          id:activity.id,
          name:trimedName,
          ori_lat:oriLat,
          ori_log:oriLog,
          des_lat:desLat,
          des_log:desLog,
          distance:distance,
          duration:duration,
          static_url:mapUrl
        };
        // console.log("updatedActivity--------",updatedActivity)


        dispatch(updateActivityThunk(activity.trail.id,updatedActivity))
            .then(
                async (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    }
                    else {
                        // console.log("res------",res)
                        history.goBack();
                        // history.push(`/trails/${res.trail.id}`);
                    }

                })

  }


  useEffect(()=>{
      setLoading(true)
      setTimeout(()=>{
          setLoading(false);
      },2000)
  },[]);



  return activityIsLoaded && apiLoad &&
    (
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
          <h3>Instruction to Edit activity:</h3>
          <p>1. Draggle markers on the map to change your origin and destination points.</p>
          <p>2. Enter your activity name.</p>
          <p>3. Click the 'Display' button to show your activity route.</p>
          <p>4. Click the 'Update' button to update your activity.</p>
          <p>* Click the 'Cancel' button to cancel your activity creation.</p>
          <p>* If you accidently drop your markers, or after you click display, you change your mind,
            you can click 'Clear' button to clear the points on map.</p>
          <p>* Click the 'ReCenter' button to relocate to the trail.</p>
        </div>
        <div className='left-input-box'>

          <form className="create-activity-form" onSubmit={handleSubmit}>
            <div className='marker-coords'>
                  <label>Name: </label>
                  <input type='text'
                    value={name}
                    style={{overflowWrap:'break-word'}}
                    onChange={e => setName(e.target.value)}
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
                }}}>Display</button>

                <button type='submit' onClick={handleSubmit}>Update</button>
                <button type='button' onClick={hancleClear}>Clear</button>
                <button type='button' onClick={hancleCancel}>Cancel</button>

                <button type='button' onClick={()=> map.panTo({lat:activity.trail.lat,lng:activity.trail.lng})}>ReCenter</button>
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
          center={{lat:activity.trail.lat,lng:activity.trail.lng}}
          zoom={12}
          mapContainerStyle={{width:'600px', height:'600px'}}
          options={{
            streetViewControl:false
          }}
          onLoad={map=>setMap(map)}
        >


            {markers &&
                markers.map((marker) => {
                  // console.log('marker-----',marker)
                  return showMarker && (
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
        </LoadScript>

      </div>

      </div>
      </>)
  }
  </>


  )

}







export default EditActivity;
