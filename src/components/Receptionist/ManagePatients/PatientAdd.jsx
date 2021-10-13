import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import PatientService from '../../../services/PatientService';
import ReceptionistNavbar from '../ReceptionistNavbar';

class PatientAdd extends Component {

    emptyPatient = {
        type: 'patient',
        name: '',
        email: '',
        contactNo: '',
        vaccinationStatus: false
    }
    
    constructor(props) {
        super(props);
        this.state = {
            patient : this.emptyPatient,
            selectedOption: false,
            errors: [],
            errorMsgs: {
                nameError: '',
                emailError: '',
                contactNoError: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    cancel(e) {
      e.preventDefault();
        this.props.history.push("/patients");
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
          errorMsgs.emailError = 'Please provide an email.'
        } else {
          const expression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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

    handleSubmit = (e) => {
        e.preventDefault();

        const { patient } = this.state;

        let msgs = {
          nameError: '',
          emailError: '',
          contactNoError: ''
        }

        this.setState({
          errors: [],
          errorMsgs: msgs
        }, () => {
            if (this.validate()) {
                PatientService.createPatient(patient).then(res => {
                  console.log("Created ",patient);
                  this.props.history.push("/patients");
                }).catch(function (error) {
                  console.log(error);

                }.bind(this));
                               
              }

          });
    }

    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        let patient = {...this.state.patient};

        patient[name] = value;

        this.setState({ patient });
    }

    handleOptionChange(event) {
      let person = {...this.state.patient}

      let selected = { ...this.state.selectedOption };
      let value = event.target.value;

      if (value==="true") selected = true;
      else if (value === "false") selected = false;
  
      console.log(selected);
      person.vaccinationStatus = selected;
      this.setState({
        selectedOption : selected,
        patient: person
      });
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    render() {
        const {patient, errorMsgs} = this.state;

        return (
            <div>
                <ReceptionistNavbar/>
                <br/>
                <div className="container">
                    <h2>Patient Details</h2>
                    {/* <div className="col text-right">
                    <Link to="/patient/vaccine" className="btn button-custom ms-2" >Vaccination Details</Link>
                    </div> */}
                    

                    <br></br>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input name="name" id="name" type="text" 
                                  className={this.hasError("name") ? "form-control is-invalid" : "form-control"}
                                  value={patient.name} onChange={this.handleChange} placeholder="Jane Doe" autoComplete="name" />
                                <div style={{fontSize: 12, color: "red"}}>
                                  {errorMsgs.nameError}
                                </div>
                            </div>
                            
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input name="email" id="email" 
                                  className={this.hasError("email") ? "form-control is-invalid" : "form-control"}
                                  value={patient.email} onChange={this.handleChange}  placeholder="abc@testmail.com"/>
                                <div style={{fontSize: 12, color: "red"}}>
                                  {errorMsgs.emailError}
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Contact number</label>
                            <div className="col-sm-10">
                                <input name="contactNo" id="contactNo" 
                                  className={this.hasError("contactNo") ? "form-control is-invalid" : "form-control"}
                                  value={patient.contactNo} onChange={this.handleChange}  placeholder="+91XXXXXXXXXX"/>
                                <div style={{fontSize: 12, color: "red"}}>
                                  {errorMsgs.contactNoError}
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Vaccination Status</label>
                            <div className="col-sm-10">
                              <div className="col-sm-5">
                                <input type="radio" name="vaccinationStatus" value="true" 
                                  checked={this.state.selectedOption == true} onChange={this.handleOptionChange} />Yes
                              </div>
                              <div className="col-sm-5">
                                <input type="radio" name="vaccinationStatus" value="false" 
                                  checked={this.state.selectedOption == false} onChange={this.handleOptionChange} />No
                              </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="mb-3 row">
                            <div className="col text-center">
                            <button className="btn btn-primary me-2" type="submit">Register</button>
                            <button className="btn btn-danger ms-2" onClick={this.cancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(PatientAdd);