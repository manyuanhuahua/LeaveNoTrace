/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useJsApiLoader,GoogleMap,Marker,DirectionsRenderer } from "@react-google-maps/api"
import MapLoading from '../map/mapLoading';
import "./map.css"
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch} from "react-redux";
import {updateActivityThunk,getActivityDetailThunk} from "../../store/activity"
import { useLocation} from "react-router-dom"




// const activity ={
//   trail_id : 1,
//   user_id : 1,
//   name : "My First hike",
//   ori_lat : "37.74213",
//   ori_log : "-119.60186",
//   des_lat : "37.75714",
//   des_log :"-119.59769",
//   distance : 4061,
//   duration : 6335,
//   static_url : "https://fullsuitcase.com/wp-content/uploads/2022/03/Zermatt-hiking-map-indicating-10-best-hikes.jpg"
// }



function EditActivity(){
    const history = useHistory()
    let location = useLocation();
    const activity = location.state.activity
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
  }, [dispatch,activity.id]);




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
    history.push(`/trails/${activity.trail.id}`)

  }



  const handleSubmit = async (e) => {
    e.preventDefault();
        setErrors([]);

        const updatedActivity = {
          ...activity,
          name,
          oriLat,
          oriLog,
          desLat,
          desLog,
          distance,
          duration,
          mapUrl

        };
        dispatch(updateActivityThunk(activity.trail.id,updatedActivity))
            .then(
                async (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    }
                    else {

                        history.push(`/trails/${activity.trail.id}`);
                    }

                })

  }

  return activityIsLoaded && (
    <div className='main-box'>

      <div className='right-map-box'>


        <GoogleMap
          center={{lat:activity.trail.lat,lng:activity.trail.lng}}
          zoom={12}
          mapContainerStyle={{width:'800px', height:'800px'}}
          options={{
            streetViewControl:false
          }}
          onLoad={map=>setMap(map)}


        >


            {markers &&
                markers.map((marker) => {
                  console.log('marker-----',marker)
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
              <button onClick={()=> displayRoute(markers[0].coords,markers[1].coords)}>Display</button>
              <button type='submit'onClick={handleSubmit}>Update</button>
           
              <button onClick={hancleCancel}>Cancel</button>


              <button onClick={()=> map.panTo({lat:activity.trail.lat,lng:activity.trail.lng})}>Reset Center</button>
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







export default EditActivity;