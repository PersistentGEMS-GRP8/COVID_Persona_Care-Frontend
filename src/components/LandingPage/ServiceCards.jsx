import React from 'react';
import '../../css/landing.css'

class ServiceCards extends React.Component {
    render() {
        return (
            <div id="cards">
                <section class="ahg-quick-box-wrap bg-gray-lighter">
                    <div class="container">
                        <h2 class="main-topic">Our Services</h2>
                        <div class="row">
                            <div class="col-md-3 card-box ">
                                <div class="card">
                                    <img src={'assets/images/card1.jpg'} class="img-fluid" alt="hospital" />
                                    <div class="card-body">
                                        <h1>Hospital</h1>
                                        <p>Huge number of hospitals have registered in our system for COVID 19 Patients</p>
                                        {/* <a href="" style={{"display": "inline;"}}>Read More <i class="fa fa-caret-right" aria-hidden="true"></i></a> */}
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3 col-sm-12 card-box ">
                                <div class="card">
                                    <img src={'assets/images/card2.jpg'} class="img-fluid" alt="bed" />
                                    <div class="card-body">
                                        <h1>Beds</h1>
                                        <p>We are providing beds for covid 19 patients.You can check available beds in each hospital.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3 col-sm-12 card-box ">
                                <div class="card">
                                    <img src={'assets/images/card3.jpg'} class="img-fluid" alt="vaccine" />
                                    <div class="card-body">
                                        <h1>Vaccine</h1>
                                        <p>We are providing any kind of vaccine for you.To get vaccine register in our system</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3 col-sm-12 card-box ">
                                <div class="card">
                                    <img src={'assets/images/card4.jpg'}  class="img-fluid" alt="doctor" />
                                    <div class="card-body">
                                        <h1>Doctors</h1>
                                        <p>Now you can get service from Specialist doctors.To get a appointment register </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default ServiceCards;