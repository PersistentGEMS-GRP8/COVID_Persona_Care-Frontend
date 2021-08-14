import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../layout/navbar';
import PatientList from './ManagePatients/PatientList';

export default class ReceptionistDashboard extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <br></br>
                    <div>
                    <h3>Patients</h3>       
                    <Link to="/patient/add" className="btn button-custom float-end" >Register Patient</Link>         
                    </div>
                    <br/><br/>
                    <PatientList/>
                </div>
            </div>
        )
    }
}
