import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PatientService from '../../../services/PatientService';
import Navbar from '../../layout/navbar';

export default class PatientAdd extends Component {

    constructor(props) {
        super(props);
        this.cancel = this.cancel.bind(this);

        this.state = {
            name: '',
            email: '',
            contact: '',
            vStatus: ''
        }
    }

    cancel() {
        this.props.history.push("/patient/list");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        const {patient} = this.state;

        try {
            PatientService.createPatient(patient).then(() => this.props.history.push("/patient/list"));
        } catch (error) {
            console.log("Data could not be stored ",error);
        }
        
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render() {
        const {name, email, contact, vStatus} = this.state;

        return (
            <div>
                <Navbar/> 
                <br/>
                <div className="container">
                    <h2>Patient Details</h2>
                    <div className="col text-right">
                    <Link to="/patient/vaccine" className="btn btn-danger ms-2" >Vaccination Details</Link>
                    </div>
                    

                    <br></br>
                    <form>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="name" id="name" type="text" value={name} onChange={this.handleChange} placeholder="Jane Doe"/>
                            </div>
                            
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="email" id="email" value={email} onChange={this.handleChange}  placeholder="abc@testmail.com"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Contact number</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="contact" id="contact" value={contact} onChange={this.handleChange}  placeholder="+91XXXXXXXXXX"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Vaccination Status</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="vStatus" id="vStatus" value={vStatus} onChange={this.handleChange} placeholder="YES/NO"/>
                            </div>
                        </div>
                        <br></br>
                        <div className="mb-3 row">
                            <div className="col text-center">
                            <button className="btn button-custom me-2" type="submit" onClick={this.handleSubmit}>Register</button>
                            <button className="btn btn-danger ms-2" onClick={this.cancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
