import React, { Component } from 'react';
import PatientService from '../../../services/PatientService';
import Navbar from '../../layout/navbar';

export default class PatientEdit extends Component {

    

    constructor(props) {
        super(props);

        this.state = {
            patient: {
                id: '',
                name: '',
                email: '',
                contact: ''
            }
        }

        this.cancel = this.cancel.bind(this);
    }
    
    async componentDidMount() {
        const person = (await PatientService.getPatientById(this.props.match.params.id)).data;
        console.log(person);
        this.setState({patient: person});
    }

    cancel(){
        this.props.history.push("/patient/list");
    }

    render() {
        return (
            <div>
                <Navbar/> 
                <br/>
                <div className="container">
                    <h2>Patient Details</h2>
                    <br></br>
                    <form>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="name" id="name" placeholder="Jane Doe"/>
                            </div>
                            
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="email" id="email" placeholder="abc@testmail.com"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Contact number</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="contact" id="contact" placeholder="+91XXXXXXXXXX"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Vaccination Status</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="vStatus" id="vStatus" placeholder="YES/NO"/>
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
