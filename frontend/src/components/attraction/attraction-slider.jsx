// import React, { Component } from 'react'
// import Card from '../test/card'
// import '../test/carry.css'
// import { LOCATIONS } from '../../assets/locations'

// class AttractionSlider extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {

//         }

//         this.slideLeft = this.slideLeft.bind(this)
//         this.slideRight = this.slideRight.bind(this)
//     }

//     slideLeft() {
//         let last = this.state.locations.slice(-1)[0]
//         let rest = this.state.locations.slice(0, -1)
//         console.log(last)
//         console.log(rest)
//         let locations = [last, ...rest]
//         this.setState({ locations: locations });
//     }

//     slideRight() {
//         let [first, ...rest] = this.state.locations;
//         console.log(first)
//         console.log(rest)
//         let locations = [...rest, first];
//         this.setState({ locations: locations });
//     }

//     renderSlides() {
//         const locations = this.state.locations;
//         return (
//             <div className="slider-cards" style={{

//             }}>
//                 {
//                     locations.map((location, index) => {
//                         return (
//                             <Card location={location} key={index} />
//                         )
//                     })
//                 }
//             </div>
//         )
//     }




//     render() {
//         return (
//             <div className="carry-all">
//                 <div className="carry-controls">
//                     <button className="slide-btn" onClick={this.slideLeft}>{"<"}</button>
//                     <button className="slide-btn" onClick={this.slideRight}>{">"}</button>

//                 </div>
//                 <div className="carry-container">
//                     {this.renderSlides()}

//                 </div>

//             </div>
//         )
//     }
// }

// export default AttractionSlider;

