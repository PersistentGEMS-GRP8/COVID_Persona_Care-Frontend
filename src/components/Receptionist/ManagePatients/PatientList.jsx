import React, { Component } from 'react';
import Modal from 'react-modal';
import PatientService from '../../../services/PatientService';
import ReceptionistDashboard from '../ReceptionistDashboard';

Modal.setAppElement('#root')

class PatientList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            modalIsOpen: false,
            popupPatient: []
        }
        this.editPatient = this.editPatient.bind(this);
        this.removePatientModal = this.removePatientModal.bind(this);
        this.deletePatient = this.deletePatient.bind(this);
    }

    editPatient(id) {
        this.props.history.push(`/patients/${id}`);
    }

    setModalIsOpen(open) {
        this.setState({modalIsOpen: open});
    }

    removePatientModal(patient){
        this.setState({popupPatient:patient});
        this.setModalIsOpen(true);
    }

    deletePatient(id) {
        PatientService.deletePatient(id).then( () => {
            let updatedPatients = [...this.state.patients].filter(i => i.id !== id);
            this.setState({patients: updatedPatients});
        });
        this.setModalIsOpen(false);
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
            <td>{patient.vaccinationStatus? "Yes" : "No"}</td>
            <td>
                <div className="btn-group">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => this.editPatient(patient.id)}>Edit</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => this.removePatientModal(patient)}>Delete</button>
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
                
                <Modal 
                    isOpen={this.state.modalIsOpen}
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={true}
                    style={
                        {
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                            }
                        }
                    } >
                    <div className="col text-right">
                            <button className="btn btn-outline-primary btn-sm" onClick={() => this.setModalIsOpen(false)}>Close</button>
                    </div>
                    <div className="row">
                        <div className="text-left">
                            <h2>Are you sure you want to delete this patient?</h2>
                        </div>
                        
                    </div>
                    <div className="row">
                        <table>
                            <tr>
                                <th width="10%">ID</th>
                                <th width="30%">Name</th>
                                <th width="20%">Email</th>
                                <th width="20%">Contact No</th>
                                <th width="10%">Vaccinated</th>
                            </tr>
                            <tr>
                                <td>{this.state.popupPatient.id}</td>
                                <td>{this.state.popupPatient.name}</td>
                                <td>{this.state.popupPatient.email}</td>
                                <td>{this.state.popupPatient.contactNo}</td>
                                <td>{this.state.popupPatient.vaccinationStatus ? "Yes" : "No"}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col text-right">
                            <button className="btn btn-primary btn-lg" onClick={() => this.setModalIsOpen(false)}>No</button>
                        </div>
                        <div className="col text-left">
                            <button className="btn btn-danger btn-lg" onClick={()=> this.deletePatient(this.state.popupPatient.id)}>Yes</button>
                        </div>
                    </div>
                </Modal>
                
            </div>
        );
    }
}

export default PatientList;