import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReceptionistNavbar from './ReceptionistNavbar';

export default class ReceptionistDashboard extends Component {
    render() {
        return (
            <div>
                <ReceptionistNavbar/>
                <div className="container">
                    <br></br>
                    <div>
                    <h3>Patients</h3>       
                    <Link to="/patients/add" className="btn btn-primary float-end" >Register Patient</Link>         
                    </div>
                    <br/><br/>
                </div>
            </div>
        )
    }
}
