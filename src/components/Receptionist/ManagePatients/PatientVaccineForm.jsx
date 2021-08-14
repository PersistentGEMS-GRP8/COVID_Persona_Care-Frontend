import React, { Component } from 'react';
import Navbar from '../../layout/navbar';

export default class PatientVaccineForm extends Component {

    constructor(props) {
        super(props);
        this.cancel = this.cancel.bind(this);
    }

    cancel(){
        this.props.history.push("/patient/add");
    }

    render() {
        return (
            <div>
                <Navbar/> 
                <br/>
                <div className="container">
                    <h2>Patient Vaccination Details</h2>
                    <br></br>
                    <form>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Certificate Number</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="certNum" id="certNum" placeholder="ABC123456"/>
                            </div>
                            
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Vaccine Name</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="vName" id="vName" placeholder="SinoPharm / Pfizer"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Date</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="date" id="date" placeholder="DD/MM/YYYY"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">No of Vaccination doses</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="vNum" id="vNum" placeholder="1 / 2"/>
                            </div>
                        </div>
                        <br></br>
                        <div className="mb-3 row">
                            <div className="col text-center">
                            <button className="btn button-custom me-2" type="submit">Register</button>
                            <button className="btn btn-danger ms-2" onClick={this.cancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
