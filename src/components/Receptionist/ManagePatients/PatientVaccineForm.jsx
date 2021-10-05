import React, { Component } from 'react';
import Navbar from '../../layout/navbar';
import PatientVaccineService from '../../../services/PatientVaccineService';

export default class PatientVaccineForm extends Component {

    emptyVaccination = {
        certificateNo: '',
        vaccineName: '',
        date: '',
        numberOfVaccine: ''  
    }

    constructor(props) {
        super(props);
        this.state = {
            vaccination:this.emptyVaccination
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let vaccination = { ...this.state.vaccination };
        vaccination[name] = value;
        this.setState({ vaccination });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {vaccination} = this.state;
        console.log(vaccination)
        PatientVaccineService.createPatientVaccination(vaccination).then(res => {
            this.props.history.push('/patients');
        });      
    }

    cancel(){
        this.props.history.push("/patients/add");
    }

    render() {
        
        return (
            <div>
                <Navbar/> 
                <br/>
                <div className="container">
                    <h2>Patient Vaccination Details</h2>
                    <br></br>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Certificate Number</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="certificateNo" id="certificateNo" placeholder="ABC123456" onChange={this.handleChange} required/>
                            </div>
                            
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Vaccine Name</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="vaccineName" id="vaccineName" placeholder="SinoPharm / Pfizer" onChange={this.handleChange} required/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Date</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="date" id="date" placeholder="DD/MM/YYYY" onChange={this.handleChange} required/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">No of Vaccination doses</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="numberOfVaccine" id="numberOfVaccine" placeholder="1 / 2" onChange={this.handleChange} required/>
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
