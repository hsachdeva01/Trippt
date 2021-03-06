import React from 'react';
import './attraction.css';
import { Link } from 'react-router-dom';
import NavBar from '../nav/navbar_container';
import Modal from '../modal/modal'
import Loader from '../loader/loader'
import AttractionSlider from './attraction-slider'
import NightlifeSlider from './nightlife-slider'
import RestaurantSlider from './restaurant-slider'
import Deck from '../test/deck'

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

    if (!restaurants[locationName]) {
      this.props.getRestaurants(locationId, locationName)
    }
    
    if (!nightlife[locationName]) {
      this.props.getNightlife(locationId,locationName)
    }

    if(this.props.user.id){
      this.props.getUserTrips(this.props.user.id)
    }
  };

  componentDidUpdate(prevProps) {
    if (!this.props.tripId && prevProps.userTrips !== this.props.userTrips) {
      let tripId = this.findTripId(this.props.userTrips, this.props.locationId)[0]
      if (tripId) {
        this.props.history.push(`/attractions/${this.props.locationId}/${this.props.locationName}/${tripId}`)
      }
    }
  }

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

  disableButton() {
    let surpriseBtn = document.getElementById('surprise-btn')
    if (surpriseBtn) {
      surpriseBtn.disabled = true
      surpriseBtn.innerText = "Added activities to your trip"
      surpriseBtn.className = 'surprise-btn'
    }
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
    let myTrips = this.findTripId(this.props.userTrips, this.props.locationId) // array of tripIds
    let attractions = this.props.attractions[this.props.locationName];
    let restaurants = this.props.restaurants[this.props.locationName];
    let nightlives = this.props.nightlife[this.props.locationName];

    if (this.props.loading) return (<Loader/>);

    if (!attractions) {
      return null;
    }
    
    if (!restaurants) {
      return null;
    } 

    if (!nightlives) {
      return null;
    }
    // data -> photo -> images -> url: "img src"

    let newRestaurants = restaurants.filter(res => res.name)
    return (
      <div className="att-all">
        <div className="att-header">
          <NavBar />
        </div>
        <div className="att-body">
          <div
            className="page-title"
            // style={{ backgroundImage: `url(${location.url})` }}
          >
            
            {this.props.locationName}
          {myTrips.length === 0 && this.props.loggedIn ? (
            <li
              className="add-city"
              onClick={() =>
                this.props.createTrip({
                  location: this.props.locationName,
                  locationId: this.props.locationId,
                })
              }
            > Add {this.props.locationName} to my Trips!
            </li>
          ) : (
                <div >
                  <button
                    id='surprise-btn'
                    onClick={() => {this.tripptMe(this.props.tripId, attractions, newRestaurants, nightlives); this.disableButton()}}
                    className={this.props.tripId && !this.props.userTrips[this.props.tripId].attractions.length ? "add-city" : "btn-hide"}
                  >Surprise Me!</button>
                </div>
          )}
          </div>
          <div className="gallery">
            {/* <div >
                <button 
                    onClick={()=> {this.tripptMe(this.props.tripId, attractions,newRestaurants,nightlives)}}
                    className={!this.props.tripId ? "btn-hide" : ""} 
                >Surprise Me!</button>
                  
              </div> */}
            <div className="gallery-att">
              <p className="category">Attractions</p>
              <div className="deck-contain">
              <Deck
                locations={attractions}
                tripId={this.props.tripId}
                activeIndex={0}
              />
              </div>
            </div>

            <div className="gallery-food">
              <p className="category">Restaurants</p>
              <div className="deck-contain">

              <Deck
                locations={newRestaurants}
                tripId={this.props.tripId}
                activeIndex={0}
                />
            </div>
            </div>

            <div className="gallery-night">
              <p className="category">Nightlife</p>
              <div className="deck-contain">

              <Deck
                locations={nightlives}
                tripId={this.props.tripId}
                activeIndex={0}
                />
            </div>
            </div>

            {/* <p className="category">Restaurants</p>
                <RestaurantSlider restaurant={restaurants} properties={this.props}/> */}

            {/* {attractions.map((place, idx) => {
                if (place.name) {
                  return (
                    <div key={idx} className="gallery-image">
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
            {/* {nightlife.map((place, idx) => {
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
              })} */}
          </div>
        </div>
        <div className="att-footer"></div>
      </div>
    );
  }
}

export default React.memo(Attraction)