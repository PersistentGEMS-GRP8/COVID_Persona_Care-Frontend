import React, { Component } from 'react';
import PatientService from '../../../services/PatientService';

class PatientList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patients: [
                {id:0,name:"S",email:"a@b.com",contact:"1233",vStatus:"YES"},
                {id:1,name:"D",email:"a@b.com",contact:"1233",vStatus:"YES"}] 
        }
    }

    editPatient(id) {
        console.log(id);
        this.props.history.push(`/patient/edit/${id}`);
    }

    removePatient(id){
        console.log(id);
    }

    componentDidMount() {
        PatientService.getAllPatients().then((res) => {
            this.setState({
                patients: res.data
            });
        });
    }


    render() {
        const patients = this.state.patients;
        // add {patients}

        const patientList = patients.map(patient => {
            return <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.name}</td>
            <td>{patient.email}</td>
            <td>{patient.contact}</td>
            <td>{patient.vStatus}</td>
            <td>
                <div className="btn-group">
                    <button className="btn button-custom btn-sm" onClick={ () => this.editPatient(patient.id)}>Edit</button>
                    <button className="btn button-delete btn-sm" onClick={() => this.removePatient(patient.id)}>Delete</button>
                </div>
            </td>
        </tr>
        })

        return (
            <div>
                <div className="container">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                        <th width="10%">ID</th>
                        <th width="30%">Name</th>
                        <th width="20%">Email</th>
                        <th width="20%">Contact No</th>
                        <th width="10%">Vaccinated</th>
                        <th width="10%"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {patientList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PatientList;