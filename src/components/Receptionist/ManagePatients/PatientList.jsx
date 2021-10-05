import React, { Component } from 'react';
import PatientService from '../../../services/PatientService';
import ReceptionistDashboard from '../ReceptionistDashboard';

class PatientList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patients: [] 
        }
        this.editPatient = this.editPatient.bind(this);
        this.removePatient = this.removePatient.bind(this);
    }

    editPatient(id) {
        this.props.history.push(`/patients/${id}`);
    }

    removePatient(id){
        PatientService.deletePatient(id).then( () => {
            let updatedPatients = [...this.state.patients].filter(i => i.id !== id);
            this.setState({patients: updatedPatients});
        })
    }

    componentDidMount() {
        PatientService.getAllPatients().then((res) => {
            this.setState({
                patients: res.data
            });
        });
    }


    render() {
        const {patients} = this.state;

        const patientList = patients.map(patient => {
            return <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.name}</td>
            <td>{patient.email}</td>
            <td>{patient.contactNo}</td>
            <td>{patient.vaccinationStatus}</td>
            <td>
                <div className="btn-group">
                    <button className="btn button-custom btn-sm" onClick={() => this.editPatient(patient.id)}>Edit</button>
                    <button className="btn button-delete btn-sm" onClick={() => this.removePatient(patient.id)}>Delete</button>
                </div>
            </td>
        </tr>
        })

        return (
            <div>
                <ReceptionistDashboard/>
                <div className="container">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                        <th width="10%">ID</th>
                        <th width="30%">Name</th>
                        <th width="20%">Email</th>
                        <th width="20%">Contact No</th>
                        <th width="10%">Vaccinated</th>
                        <th width="10%">Actions</th>
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