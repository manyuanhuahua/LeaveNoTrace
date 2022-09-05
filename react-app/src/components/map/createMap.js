/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useJsApiLoader,GoogleMap,Marker,DirectionsRenderer } from "@react-google-maps/api"
import MapLoading from './mapLoading';
import "./map.css"
import { useHistory } from 'react-router-dom';
import { useDispatch} from "react-redux";
import {createActivityThunk} from "../../store/activity"



const center={lat:37.72620918325973,lng:-119.55160191563179,}

function CreateMap({trail}){
    const history = useHistory()
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
    const [errors, setErrors] = useState([])
    const [ id, setId ] = useState(0);
    const [ markers, setMarkers ] = useState([]);


    const addMarker = (coords) => {
      setId((id)=>id+1);
      setMarkers((markers) => markers.concat([{coords, id}]) )
    }


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

    const staticMap = (directions)=>{
      const route = directions.route[0]
      // let image = `https://maps.googleapis.com/maps/api/staticmap?size=200x200`
      // var request = directionsDisplay.directions.request;
      // var start = request.origin.lat() + ',' + request.origin.lng();
      // var end = request.destination.lat() + ',' + request.destination.lng();
      // var path = directionsDisplay.directions.routes[0].overview_polyline;
      // var markers = [];
      // var waypoints_labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
      // var waypoints_label_iter = 0;
      // markers.push("markers=color:green|label:" + waypoints_labels[waypoints_label_iter] + '|' + start);

      // for(var i=0;i<request.waypoints.length;i++){
      //     //I have waypoints that are not stopovers I dont want to display them
      //     if(request.waypoints[i].stopover==true){
      //         markers.push("markers=color:blue|label:" + waypoints_labels[++waypoints_label_iter] + '|' + request.waypoints[i].location.lat() + "," +request.waypoints[i].location.lng());
      //     }
      // }

      // markers.push("markers=color:red|label:" + waypoints_labels[++waypoints_label_iter] + '|' + end);

      // markers = markers.join('&');

      // alert("https://maps.googleapis.com/maps/api/staticmap?size=1000x1000&maptype=roadmap&path=enc:" + path + "&" + markers);
    }

    const displayRoute = async (origin,destination)=>{
      if(!origin || !destination){
        return
      }
      setOriLat(origin.lat)
      setOriLog(origin.lng)
      setDesLat(destination.lat)
      setDesLog(destination.lng)

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
          // static_url:static_url
        };
        dispatch(createActivityThunk(1,newActivity))
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
          onClick={(e)=> addMarker(e.latLng.toJSON())
            // console.log("markers--------",markers)
          }

        >


            {markers ? (
                markers.filter((marker)=> marker.id <2).map((marker) => {
                  return (
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
                  onChange={e => setOriLat(e.target.value)}
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
              <button type='submit'onClick={handleSubmit}>Create</button>
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





export default CreateMap;
