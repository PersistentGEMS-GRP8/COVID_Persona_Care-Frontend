import React, { Component } from 'react';
import PatientService from '../../../services/PatientService';
import ReceptionistNavbar from '../ReceptionistNavbar';

export default class PatientEdit extends Component {

    emptyPatient = {
        id: '',
        name: '',
        email: '',
        contactNo: '',
        vaccinationStatus: ''
    }

    constructor(props) {
        super(props);

        this.state = {
            patient: this.emptyPatient,
            selectedOption: '',
            errors: [],
            errorMsgs: {
                nameError: '',
                emailError: '',
                contactNoError: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    
    async componentDidMount() {
        const person = (await PatientService.getPatientById(this.props.match.params.id)).data;
        if(!person.vaccinationStatus){
          person.vaccinationStatus = "No"
        }
        this.setState({
          patient: person,
          selectedOption: person.vaccinationStatus
        }); 
        
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    validate() {
        const { patient, errorMsgs } = this.state;
        var errors = [];
    
        //name
        if (patient.name === "") {
          errors.push("name");
          errorMsgs.nameError = 'Please provide a name.'
        } else if (patient.name.length < 3) {
          errors.push("name");
          errorMsgs.nameError = 'Name should be atleast 3 characters.'
        }
    
        //email
        if (patient.email === "") {
          errors.push("email");
          errorMsgs.emailError = 'Please provide a email.'
        } else {
          const expression = /\S+@\S+/;
          var validEmail = expression.test(String(patient.email).toLowerCase());
    
          if (!validEmail) {
            errors.push("email");
            errorMsgs.emailError = 'Please provide a valid email.'
          }
    
        }
        //contact No
        if (patient.contactNo === "") {
          errors.push("contactNo");
          errorMsgs.contactNoError = 'Please provide a contact No.'
        } else if ((patient.contactNo.length != 10) && (patient.contactNo.length != 12)) {
          errors.push("contactNo");
          errorMsgs.contactNoError = 'Contact no should contain 10 or 12 characters.'
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
    
    handleSubmit(event) {
      event.preventDefault();
      const { patient } = this.state;
      patient.type = 'patient';
      if (this.validate()) {
        console.log(patient);
        PatientService.updatePatient(patient).then(res => {
          this.props.history.push('/patients');
        });
      }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let patient = { ...this.state.patient };
        patient[name] = value;
        this.setState({ patient });
    }

    handleOptionChange(event) {
        const value = event.target.value;
        let selected = { ...this.state.selectedOption };
        let person = {...this.state.patient}
        selected = value;
        person.vaccinationStatus = selected;
        this.setState({
          selectedOption : selected,
          patient: person
        });
    }

    cancel(e){
        e.preventDefault();
        this.props.history.push("/patients");
    }

    render() {
        const {patient, errorMsgs } = this.state;


        return (
            <div>
                <ReceptionistNavbar/> 
                <br/>
                <div className="container">
                    <h2>Patient Details</h2>
                    <br></br>
                    <form>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input className={this.hasError("name") ? "form-control is-invalid" : "form-control"} 
                                name="name" id="name" value={patient.name} onChange={this.handleChange} placeholder="Jane Doe"/>
                            </div>
                            
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input className={this.hasError("email") ? "form-control is-invalid" : "form-control"} 
                                name="email" id="email"
                                value={patient.email} onChange={this.handleChange} placeholder="abc@testmail.com"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Contact number</label>
                            <div className="col-sm-10">
                                <input className={this.hasError("contactNo") ? "form-control is-invalid" : "form-control"}
                                name="contactNo" id="contactNo"
                                value={patient.contactNo} onChange={this.handleChange} placeholder="+91XXXXXXXXXX"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Vaccination Status</label>
                            <div className="col-sm-10">
                              <div className="col-sm-5">
                                <input type="radio" name="vaccinationStatus" value="Yes" 
                                  checked={this.state.selectedOption === "Yes"} onChange={this.handleOptionChange} />Yes
                              </div>
                              <div className="col-sm-5">
                                <input type="radio" name="vaccinationStatus" value="No" 
                                  checked={this.state.selectedOption === "No"} onChange={this.handleOptionChange} />No
                              </div>
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
