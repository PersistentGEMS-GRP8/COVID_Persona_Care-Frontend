import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ManagerService from '../../../services/ManagerService';
import HospitalAdminNavbar from '../HospitalAdminNavbar';

class ManagerEdit extends Component {

  emptyManager = {
    id: '',
    name: '',
    email: '',
    contactNo: '',
    hId: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      manager: this.emptyManager,
      errors: [],
      errorMsgs: {
        nameError: '',
        emailError: '',
        contactNoError: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  async componentDidMount() {
    const person = (await ManagerService.getManagerById(this.props.match.params.id)).data;
    console.log(person);
    this.setState({ manager: person });
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let manager = { ...this.state.manager };
    manager[name] = value;
    this.setState({ manager });
  }

  validate() {
    const { manager, errorMsgs } = this.state;
    var errors = [];

    //name
    if (manager.name === "") {
      errors.push("name");
      errorMsgs.nameError = 'Please provide a name.'
    } else if (manager.name.length < 3) {
      errors.push("name");
      errorMsgs.nameError = 'Name should be atleast 3 characters.'
    }

    //email
    if (manager.email === "") {
      errors.push("email");
      errorMsgs.emailError = 'Please provide a email.'
    } else {
      const expression = /\S+@\S+/;
      var validEmail = expression.test(String(manager.email).toLowerCase());

      if (!validEmail) {
        errors.push("email");
        errorMsgs.emailError = 'Please provide a valid email.'
      }

    }
    //contact No
    if (manager.contactNo === "") {
      errors.push("contactNo");
      errorMsgs.contactNoError = 'Please provide a contact No.'
    } else if ((manager.contactNo.length != 10) && (manager.contactNo.length != 12)) {
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
    const { manager } = this.state;
    manager.type = 'manager';
    if (this.validate()) {
      console.log(manager);
      ManagerService.updateManager(manager).then(res => {
        this.props.history.push('/managers');
      });

    }

  }

  cancel() {
    this.props.history.push('/managers');
  }

  render() {
    const { manager, errorMsgs } = this.state;
    const title = <h2>{'Manager Details'}</h2>;

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
              <input type="text" className={this.hasError("name") ? "form-control is-invalid" : "form-control"}
                name="name" id="name" value={manager.name}
                onChange={this.handleChange} autoComplete="name" />
              <div class="invalid-feedback">
                {errorMsgs.nameError}
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="text" className={this.hasError("email") ? "form-control is-invalid" : "form-control"}
                name="email" id="email" value={manager.email}
                onChange={this.handleChange} autoComplete="email" />
              <div class="invalid-feedback">
                {errorMsgs.emailError}
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="contactNo" className="col-sm-2 col-form-label">Contact No</label>
            <div className="col-sm-10">
              <input type="text" className={this.hasError("contactNo") ? "form-control is-invalid" : "form-control"}
                name="contactNo" id="contactNo" value={manager.contactNo}
                onChange={this.handleChange} autoComplete="contactNo" />
              <div class="invalid-feedback">
                {errorMsgs.contactNoError}
              </div>
            </div>
          </div>
          <br></br>
          <div className="mb-3 row">
            <div className="col text-center">
              <button className="btn button-custom me-2" type="submit">Update</button>
              <button className="btn btn-secondary ms-2" onClick={this.cancel}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  }
}

export default withRouter(ManagerEdit);