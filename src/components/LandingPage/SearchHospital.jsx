import React from 'react';
import '../../css/landing.css'
import Navbar from './Navbar';
import Footer from './Footer';
import * as hospitalService from '../../services/hospitalService';

class SearchHospital extends React.Component {

    state = {
        hospital: {}
    }

    async componentDidMount() {
        const hospital = (await hospitalService.getHospitalByName(this.props.match.params.hospital)).data;
        this.setState({ hospital: hospital });
    }

    render() {
        const { hospital } = this.state;
        console.log(hospital.hName)
        if (hospital.hName != null) {
            return (
                <div>
                    <Navbar /><br /><br /><br /><br /><br />
                    <div className="container">
                        <h2 className="main-topic" style={{ "text-align": "left" }}>Search Result</h2>

                        <div className="row">
                            <div className="col-sm-6 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h3>Available Beds in <span className="search-val">{this.state.hospital.hName}</span></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 col-md-2">
                                <div className="card">
                                    <div className="card-body">
                                        <h3>{this.state.hospital.noOfBeds}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed-bottom">
                        <Footer />
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <Navbar /><br /><br /><br /><br /><br />
                    <div className="container">
                        <h2 className="main-topic" style={{ "text-align": "left" }}>Search Result</h2>
                        <p>Not found</p>
                    </div>
                    <div className="fixed-bottom">
                        <Footer />
                    </div>
                </div>
            )
        }
    }
}

export default SearchHospital;