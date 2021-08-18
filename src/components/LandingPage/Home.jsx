import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ServiceCards from './ServiceCards';
import '../../css/landing.css'
import Carousel from './Carousel';
class Home extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <br></br> <br></br>
                <Carousel/>
                <ServiceCards/>
                {/* <Footer/> */}
            </div>
        );
    }
}
export default Home;