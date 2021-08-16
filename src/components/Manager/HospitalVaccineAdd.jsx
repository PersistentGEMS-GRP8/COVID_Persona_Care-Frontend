import React from 'react';
import { withRouter } from 'react-router-dom';
import * as vaccineService from '../../services/HospitalVaccineService';
import ManagerNavbar from './ManagerNavbar';
import { Modal, Button } from "react-bootstrap";

class HospitalVaccineAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vaccines: [],
            hospitalId: localStorage.getItem('hospitalId'),
            count: 0,
            vaccineId: 0,
            isOpen: false,
            name: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitModalForm = this.submitModalForm.bind(this);
        this.handleModalForm = this.handleModalForm.bind(this);

    }
    async componentDidMount() {
        const vaccines = (await vaccineService.getVaccinesNames()).data;
        this.setState({
            vaccines: vaccines
        });

    }

    handleChange(event) {
        if (event.target.value != "other") {
            this.setState({ [event.target.name]: event.target.value });
        } else {
            this.setState({ isOpen: true })
        }
    }

    handleModalForm(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitModalForm() {
        vaccineService.addNewVaccineName(this.state.name).then(res => {
            this.closeModal();
        })

    }
    handleSubmit(event) {
        event.preventDefault();
        const newVaccine = {
            count: this.state.count,
            hospitalId: this.state.hospitalId,
            vaccineId: this.state.vaccineId
        };
        vaccineService.addVaccineToHospital({ newVaccine }).then(res => {
            this.resetForm();
        });

    }

    resetForm = () => {
        this.formRef.reset();
    };

    closeModal = () => this.setState({ isOpen: false });

    render() {
        const vaccines = this.state.vaccines;
        const title = <h2>{'Add Vaccine'}</h2>;

        return <div>
            <ManagerNavbar />
            <br />
            <div className="container">
                {title}
                <br></br>
                <form class="needs-validation" novalidate ref={ref => (this.formRef = ref)} onSubmit={this.handleSubmit}>
                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <select type="text" className="form-control" name="vaccineId" id="vaccineId" value={this.state.vaccineId}
                                onChange={this.handleChange}>
                                <option>--Select Vaccine--</option>
                                {vaccines.map(vaccine => (<option value={vaccine.id}>{vaccine.name}</option>))}
                                <option value="other">other</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Count</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" name="count" id="count" value={this.state.count}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col text-center">
                            <button className="btn button-custom me-2" type="submit">Save</button>
                            <button type="reset" className="btn btn-secondary ms-2" onClick={this.resetForm}>Cancel</button>
                        </div>
                    </div>
                </form>

                {/* Add New Vaccine Name Modal */}

                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Vaccine Name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3 row">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="name" id="name" value={this.state.name}
                                        onChange={this.handleModalForm} />
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary " onClick={this.submitModalForm}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    }
}
export default withRouter(HospitalVaccineAdd);