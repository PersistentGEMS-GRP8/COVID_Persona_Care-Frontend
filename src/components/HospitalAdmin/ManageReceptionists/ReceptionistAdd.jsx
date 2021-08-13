import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReceptionistService from '../../../services/ReceptionistService'
import HospitalAdminNavbar from '../HospitalAdminNavbar';

class ReceptionistAdd extends Component {

  emptyReceptionist = {
    personaUser:{
      username: '',
      password: '',
      role: 'ROLE_RECEPTIONIST',
    },
    person:{
      type:'receptionist',
      name: '',
      email: '',
      contactNo: '',
      hId:2
    }
    
  }

  constructor(props) {
    super(props);
    this.state = {
      receptionist: this.emptyReceptionist
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let receptionist = {...this.state.receptionist};
    receptionist[name] = value;
    receptionist.person[name] = value;
    receptionist.personaUser[name] = value;
    this.setState({receptionist});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {receptionist} = this.state;
    console.log(receptionist);
    ReceptionistService.createReceptionist(receptionist).then(res =>{
        this.props.history.push('/receptionists');
    });
    
  }

  cancel(){
    this.props.history.push('/receptionists');
  }

  render() {
    const {receptionist} = this.state;
    const title = <h2>{'Receptionist Details'}</h2>;

    return <div>
      <HospitalAdminNavbar/> 
      <br/>
      <div className="container">
        {title}
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3 row">
            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="name" id="name" value={receptionist.person.name}
                    onChange={this.handleChange} autoComplete="name"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="email" id="email" value={receptionist.person.email}
                   onChange={this.handleChange} autoComplete="email"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="contactNo" className="col-sm-2 col-form-label">Contact No</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="contactNo" id="contactNo" value={receptionist.person.contactNo}
                   onChange={this.handleChange} autoComplete="contactNo"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="username" id="username" value={receptionist.personaUser.username}
                    onChange={this.handleChange} autoComplete="username"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">Default Password</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="password" id="password" value={receptionist.personaUser.password}
                    onChange={this.handleChange} autoComplete="password"/>
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