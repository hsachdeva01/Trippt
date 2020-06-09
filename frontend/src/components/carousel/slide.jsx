import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './slide.css'

class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = { landing: this.props.data };
    }


    



    render() {
        return (

            
            <div className='slides'>
                {
                    this.state.landing.map((loc, index) =>
                        <div className='city-container' key={index}>
                            
                                

                                <div className='slide' style={{ backgroundImage: `url(${loc.url})`}}>
                                <Link className='city-link' to={`/attractions/${loc.locationId}/${loc.location}`}>
                                <h1 className='slide-city'>{loc.location}</h1>

                                {/* <img id="slide-photo" src={`${loc.url}`} alt=""/> */}
                                </Link>
                                </div>
                                
                        </div>
                    )}
            </div>
        )
    }
}
export default Slide;