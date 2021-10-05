import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PatientService from '../../../services/PatientService';
import ReceptionistNavbar from '../ReceptionistNavbar';
import { withRouter } from 'react-router-dom';

class PatientAdd extends Component {

    emptyPatient = {
        id: '',
        name: '',
        email: '',
        contactNo: '',
        vaccinationStatus: ''
  }
    
    constructor(props) {
        super(props);
        this.cancel = this.cancel.bind(this);

        this.state = {
            patient : this.emptyPatient,
            selectedOption: 'No',
            errors: [],
            errorMsgs: {
                nameError: '',
                emailError: '',
                contactNoError: '',
                usernameError: ''
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

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log("State => ",this.state);

        const { patient } = this.state;

        var msgs = {
          nameError: '',
          emailError: '',
          contactNoError: '',
          usernameError: ''
        }

        // const {patient} = this.state;

        var msgs = {
            nameError: '',
            emailError: '',
            contactNoError: '',
            usernameError: ''
          }
          this.setState({
            errors: [],
            errorMsgs: msgs
          }, () => {
            // if (this.validate()) {
                // const item = {
                //     name: this.state.name,
                //     email: this.state.email,
                //     contactNo: this.state.contactNo,
                //     vaccinationStatus: this.state.vaccinationStatus
                // }
                // console.log("Item => ",item);
                this.createPatient(patient);
                
            //   }

          });
    }

    createPatient = ({item}) => {
        // console.log(JSON.stringify(item));

        return PatientService.createPatient({item})
        .then(res => {
            console.log("Res data => ",res.data);
            this.props.history.push('/patients');
            alert("Patient added successfully!");
          })
          .catch(function (error) {
              //handle error 
              console.log(error.response.status);
              console.log(error.response.data.message);
              
              if (error.response.status == 400) {
                const { errorMsgs, errors } = this.state;
                errors.push("username");
                errorMsgs.usernameError = 'Username already exists.';
                this.setState({
                  errors: errors,
                  errorMsgs: errorMsgs
                });
              }
  
            }.bind(this));
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let patient = {...this.state.patient};
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
                    <div className="col text-right">
                    <Link to="/patient/vaccine" className="btn button-custom ms-2" >Vaccination Details</Link>
                    </div>
                    

                    <br></br>
                    <form onSubmit={this.handleSubmit} ref={ref => (this.formRef = ref)}>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="name" id="name" type="text" 
                                className={this.hasError("name") ? "form-control is-invalid" : "form-control"}
                                value={patient.name} onChange={this.handleChange} placeholder="Jane Doe" autoComplete="name" />
                            </div>
                            
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="email" id="email" 
                                className={this.hasError("email") ? "form-control is-invalid" : "form-control"}
                                value={patient.email} onChange={this.handleChange}  placeholder="abc@testmail.com"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Contact number</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="contactNo" id="contactNo" value={patient.contactNo} onChange={this.handleChange}  placeholder="+91XXXXXXXXXX"/>
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

export default withRouter(PatientAdd);