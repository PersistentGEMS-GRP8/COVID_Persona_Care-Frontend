import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReceptionistService from '../../../services/ReceptionistService'
import HospitalAdminNavbar from '../HospitalAdminNavbar';

class ReceptionistAdd extends Component {

  emptyReceptionist = {
    personaUser: {
      username: '',
      password: '',
      role: 'ROLE_RECEPTIONIST',
    },
    person: {
      type: 'receptionist',
      name: '',
      email: '',
      contactNo: '',
      hId: localStorage.getItem('hospitalId')
    }

  }

  constructor(props) {
    super(props);
    this.state = {
      receptionist: this.emptyReceptionist,
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
    this.cancel = this.cancel.bind(this);
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let receptionist = { ...this.state.receptionist };
    receptionist[name] = value;
    receptionist.person[name] = value;
    receptionist.personaUser[name] = value;
    this.setState({ receptionist });
  }

  validate() {
    const { receptionist, errorMsgs } = this.state;
    var errors = [];

    //name
    if (receptionist.person.name === "") {
      errors.push("name");
      errorMsgs.nameError = 'Please provide a name.'
    } else if (receptionist.person.name.length < 3) {
      errors.push("name");
      errorMsgs.nameError = 'Name should be atleast 3 characters.'
    }

    //email
    if (receptionist.person.email === "") {
      errors.push("email");
      errorMsgs.emailError = 'Please provide a email.'
    } else {
      const expression = /\S+@\S+/;
      var validEmail = expression.test(String(receptionist.person.email).toLowerCase());

      if (!validEmail) {
        errors.push("email");
        errorMsgs.emailError = 'Please provide a valid email.'
      }

    }
    //contact No
    if (receptionist.person.contactNo === "") {
      errors.push("contactNo");
      errorMsgs.contactNoError = 'Please provide a contact No.'
    } else if ((receptionist.person.contactNo.length != 10) && (receptionist.person.contactNo.length != 12)) {
      errors.push("contactNo");
      errorMsgs.contactNoError = 'Contact no should contain 10 or 12 characters.'
    }

    //username
    if (receptionist.personaUser.username === "") {
      errors.push("username");
      errorMsgs.usernameError = 'Please provide a username';
    }

    //password
    if (receptionist.personaUser.password === "") {
      errors.push("password");
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
    const { receptionist } = this.state;
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
      if (this.validate()) {
        console.log(receptionist);
        ReceptionistService.createReceptionist(receptionist).then(res => {
          this.props.history.push('/receptionists');
        }).catch(function (error) {
          //handle error 
          // console.log(error.response.status);
          // console.log(error.response.data.message);
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
    });;

  }

  cancel() {
    this.props.history.push('/receptionists');
  }

  render() {
    const { receptionist, errorMsgs } = this.state;
    const title = <h2>{'Receptionist Details'}</h2>;

    return <div>
      <HospitalAdminNavbar />
      <br />
      <div className="container">
        {title}
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3 row">
            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className={this.hasError("name") ? "form-control is-invalid" : "form-control"} name="name" id="name" value={receptionist.person.name}
                onChange={this.handleChange} autoComplete="name" />
              <div class="invalid-feedback">
                {errorMsgs.nameError}
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="text" className={this.hasError("email") ? "form-control is-invalid" : "form-control"} name="email" id="email" value={receptionist.person.email}
                onChange={this.handleChange} autoComplete="email" />
              <div class="invalid-feedback">
                {errorMsgs.emailError}
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="contactNo" className="col-sm-2 col-form-label">Contact No</label>
            <div className="col-sm-10">
              <input type="text" className={this.hasError("contactNo") ? "form-control is-invalid" : "form-control"} name="contactNo" id="contactNo" value={receptionist.person.contactNo}
                onChange={this.handleChange} autoComplete="contactNo" />
              <div class="invalid-feedback">
                {errorMsgs.contactNoError}
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
              <input type="text" className={this.hasError("username") ? "form-control is-invalid" : "form-control"} name="username" id="username" value={receptionist.personaUser.username}
                onChange={this.handleChange} autoComplete="username" />
              <div class="invalid-feedback">
                {errorMsgs.usernameError}
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">Default Password</label>
            <div className="col-sm-10">
              <input type="text" className={this.hasError("password") ? "form-control is-invalid" : "form-control"} name="password" id="password" value={receptionist.personaUser.password}
                onChange={this.handleChange} autoComplete="password" />
              <div class="invalid-feedback">
                Please provide a password.
              </div>
            </div>
          </div>
          <br></br>
          <div className="mb-3 row">
            <div className="col text-center">
              <button className="btn button-custom me-2" type="submit">Register</button>
              <button className="btn btn-secondary ms-2" onClick={this.cancel}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  }
}

export default withRouter(ReceptionistAdd);