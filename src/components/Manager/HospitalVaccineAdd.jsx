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
            name: '',
            errors: [],
            errorMsgs: {
                countError: '',
                nameError: ''
            }
        };

    }
    async componentDidMount() {
        const vaccines = (await vaccineService.getVaccinesNames()).data;
        this.setState({
            vaccines: vaccines
        });

    }

    handleChange = (event) => {
        if (event.target.value != "other") {
            this.setState({ [event.target.name]: event.target.value });
        } else {
            this.setState({ isOpen: true })
        }
    }

    handleModalForm = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    validateModalForm = () => {
        const { name, errorMsgs } = this.state;
        var errors = [];

        if (name === '') {
            errors.push("name");
            errorMsgs.nameError = 'Please Provide a name'
        }

        this.setState({
            errors: errors,
            errorMsgs: errorMsgs
        });

        if (errors.length > 0) {
            return false;
        } else {
            return true;
        }
    }
    submitModalForm = (event) => {
        event.preventDefault();
        var msgs = { nameError: '' }
        this.setState({
            errors: [],
            errorMsgs: msgs
        }, () => {
            if (this.validateModalForm()) {
                vaccineService.addNewVaccineName(this.state.name).then(res => {
                    this.closeModal();
                }).catch(function (error) {
                    console.log(this.state.errorMsgs)
                }.bind(this));
            }
        })

    }
    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    validate = () => {
        const { count, errorMsgs } = this.state;
        var errors = [];

        if (count < 0) {
            errors.push("count");
            errorMsgs.countError = 'Vaccine count should be greater than or equal zero'
        }

        this.setState({
            errors: errors,
            errorMsgs: errorMsgs
        });

        if (errors.length > 0) {
            return false;
        } else {
            return true;
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();
        var msgs = { countError: '' }
        const newVaccine = {
            count: this.state.count,
            hospitalId: this.state.hospitalId,
            vaccineId: this.state.vaccineId
        };
        this.setState({
            errors: [],
            errorMsgs: msgs
        }, () => {
            if (this.validate()) {
                vaccineService.addVaccineToHospital({ newVaccine }).then(res => {
                    this.resetForm();
                }).catch(function (error) {
                }.bind(this));
            }
        })

    }

    resetForm = () => {
        document.getElementById("create-form").reset();
        this.setState({
            count: 0
        });
    };

    closeModal = () => this.setState({ isOpen: false ,name:''});

    render() {
        const { vaccines, errorMsgs } = this.state;

        const title = <h2>{'Add Vaccine'}</h2>;

        return <div>
            {/* <ManagerNavbar /> */}
            <br />
            <div className="container">
                {title}
                <br></br>
                <form onSubmit={this.handleSubmit} id="create-form">
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
                        <label htmlFor="count" className="col-sm-2 col-form-label">Count</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" name="count" id="count" className={this.hasError("count") ? "form-control is-invalid" : "form-control"} value={this.state.count}
                                onChange={this.handleChange} />
                            <div class="invalid-feedback">
                                {errorMsgs.countError}
                            </div>
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
                        <form onSubmit={this.submitModalForm}>
                            <div className="mb-3 row" >
                                <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="name" id="name" value={this.state.name} className={this.hasError("name") ? "form-control is-invalid" : "form-control"} 
                                        onChange={this.handleModalForm} />
                                    <div class="invalid-feedback">
                                        {errorMsgs.nameError}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 row">
                        <div className="col text-center">
                            <button className="btn button-custom me-2" type="submit">Save</button>
                            <button type="reset" className="btn btn-secondary ms-2" onClick={this.resetForm}>Cancel</button>
                        </div>
                    </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="primary " onSubmit={this.submitModalForm}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    }
}
export default withRouter(HospitalVaccineAdd);