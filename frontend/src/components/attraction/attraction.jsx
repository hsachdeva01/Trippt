import React from 'react';
import './attraction.css';
import { Link } from 'react-router-dom';
import NavBar from '../nav/navbar_container';
import Modal from '../modal/modal'
import Loader from '../loader/loader'
import AttractionSlider from './attraction-slider'

class Attraction extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show: false,
      location: '',
      locationId: '',
    }
    this.closeModal = this.closeModal.bind(this)
    this.showModal = this.showModal.bind(this)
    this.findTripId = this.findTripId.bind(this)
  }


  componentDidMount(){
    let {locationId, locationName, attractions, restaurants, nightlife} = this.props

    if (!attractions[locationName]) {
      this.props.getAttractions(locationId, locationName)
    }

    // if (!restaurants[locationName]) {
    //   this.props.getRestaurants(locationId, locationName)
    // }
    
    if (!nightlife[locationName]) {
      this.props.getNightlife(locationId,locationName)
    }

    if(this.props.user){
      this.props.getUserTrips(this.props.user.id)
    }
  };

  showModal() {
    this.setState({ show: true })
  };

  closeModal() {
    this.setState({ show: false })
  };

  randNum(length) {
    return Math.floor(Math.random() * length)
  };

  tripptMe(tripId, ...args) {
    args.forEach(arr => {
      let rand = this.randNum(arr.length)
      this.props.updateTrip(tripId, arr[rand])
    })
  }

  findTripId(userTrips, locationId){
    if (!userTrips) {
      userTrips = this.props.createTrip({location: this.props.locationName, locationId: this.props.locationId})
    }
    let trips = [];
    for(let tripId in userTrips){
      let trip = userTrips[tripId]
      if(trip.locationId === Math.floor(locationId)){
        trips.push(tripId);
      }
    }
    return trips; 
  }

  

  render(){
    // {console.log(this.findTripId(this.props.userTrips, this.props.locationId))}
    // {console.log(this.props)}
    let myTrips = this.findTripId(this.props.userTrips, this.props.locationId) // array of tripIds
    // console.log(myTrips);
    let attractions = this.props.attractions[this.props.locationName];
    // let restaurants = this.props.restaurants[this.props.locationName];
    let nightlife = this.props.nightlife[this.props.locationName];

    if (this.props.loading) return (<Loader/>);

    if (!attractions) {
      return null;
    }
    // if (!restaurants) {
    //   return null;
    // } 

    if (!nightlife) {
      return null;
    }
    // data -> photo -> images -> url: "img src"

    // let newRestaurants = restaurants.filter(res => res.name)
    
    const getPhotos = (photos) => {
      for(var key in photos){
        if(key === "images"){
          return photos[key];
        }
      }
    }

    const getImages = (obj) => {
      for(var key in obj){
        if(key === "large"){
          return obj[key]
        }
      }
    }

    const getUrl = (obj) => {
      for(var key in obj){
        if(key === 'url'){
          return obj[key]
        }
      }
    }

    return (

      <div className="att-all">
        <div className="att-header">
          <NavBar />
        </div>
        <div className="att-body">
        <div className="page-title">Attractions in {this.props.locationName}</div>
          {myTrips.length === 0  && this.props.loggedIn ? <li className="add-city"
           onClick={() => this.props.createTrip({ location: this.props.locationName, locationId: this.props.locationId })}
          >Add {this.props.locationName} to my Trips!</li> : ""}
          <div className="gallery">
              <div >
                {/* <button 
                    onClick={()=> {this.tripptMe(this.props.tripId, attractions,newRestaurants,nightlife);
                                   this.showModal()}}
                    className={!this.props.tripId ? "btn-hide" : ""} 
                >Trippt Me</button> */}
                <Modal show={this.state.show} closeModal={this.closeModal}/>
              </div>
            <div className="gallery-top">
              {/* < AttractionSlider/> */}
              {console.log(attractions)}
            {attractions.map((place, idx) => {
              if (place.name) {
                return (
                  <div key={idx} className="gallery-image">
                    {/* {console.log(this.props)} */}
                    <Link to={this.props.tripId ? `/attraction/${place.location_id}/${place.name}/${this.props.tripId}` : `/attraction/${place.location_id}/${place.name}`}>
                        <div className="att"
                          style={{
                            backgroundImage: `url(${getUrl(
                              getImages(getPhotos(place.photo))
                            )})`}}>
                              <p>
                            {place.name}
                              </p>
                        </div>
                      </Link>
                      {this.props.loggedIn ? myTrips.length > 0 ? <button 
                      onClick={() => this.props.updateTrip(myTrips[0], place)}
                        className=""
                        > Add to Trip</button> : "" : <button>
                          <Link to='/login'> Add to Trip</Link>
                      </button> }
                  </div>
                )
              }
            })}

            </div>
            
            
            {/* {restaurants.map((place, idx) => {

              if (place.name) {
                return (
                  <div key={idx} className="gallery-image">
                    <Link to={this.props.tripId ? `/attraction/${place.location_id}/${place.name}/${this.props.tripId}` : `/attraction/${place.location_id}/${place.name}`}>
                      <div className="att"
                        style={{
                          backgroundImage: `url(${getUrl(
                            getImages(getPhotos(place.photo))
                          )})`
                        }}>
                        <p>
                          {place.name}
                        </p>
                      </div>
                    </Link>
                    {this.props.loggedIn ? myTrips.length > 0 ? <button
                      onClick={() => this.props.updateTrip(myTrips[0], place)}
                        className=""
                        > Add to Trip</button> : "" : <button>
                          <Link to='/login'> Add to Trip</Link>
                      </button> }
                  </div>
                )
              }
            })} */}
            {nightlife.map((place, idx) => {
              if (place.name) {
                return (

                <div key={idx} className="gallery-image">
                  <Link to={this.props.tripId ? `/attraction/${place.location_id}/${place.name}/${this.props.tripId}` : `/attraction/${place.location_id}/${place.name}`}>
                    <div className="att"
                      style={{
                        backgroundImage: `url(${getUrl(
                          getImages(getPhotos(place.photo))
                        )})`
                      }}>
                      <p>
                        {place.name}
                      </p>
                    </div>
                  </Link>
                    {this.props.loggedIn ? myTrips.length > 0 ? <button
                      onClick={() => this.props.updateTrip(myTrips[0], place)}
                      className=""
                    > Add to Trip</button> : "" : <button>
                        <Link to='/login'> Add to Trip</Link>
                      </button>}
                </div>
                )
              }
              })}
          </div>
        </div>
        <div className="att-footer"></div>
      </div>
    );
  }
}

export default Attraction