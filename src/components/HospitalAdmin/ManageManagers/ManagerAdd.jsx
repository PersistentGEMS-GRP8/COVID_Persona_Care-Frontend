import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ManagerService from '../../../services/ManagerService'
import HospitalAdminNavbar from '../HospitalAdminNavbar';

class ManagerAdd extends Component {

  emptyManager = {
    personaUser:{
      username: '',
      password: '',
      role: 'ROLE_MANAGER',
    },
    person:{
      type:'manager',
      name: '',
      email: '',
      contactNo: '',
      hId:2
    }
    
  }

  constructor(props) {
    super(props);
    this.state = {
      manager: this.emptyManager
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let manager = {...this.state.manager};
    manager[name] = value;
    manager.person[name] = value;
    manager.personaUser[name] = value;
    this.setState({manager});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {manager} = this.state;

    console.log(manager);
    ManagerService.createManager(manager).then(res =>{
        this.props.history.push('/managers');
    });
    
  }

  cancel(){
    this.props.history.push('/managers');
  }

  render() {
    const {manager} = this.state;
    const title = <h2>{'Manager Details'}</h2>;

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
              <input type="text" className="form-control" name="name" id="name" value={manager.person.name}
                    onChange={this.handleChange} autoComplete="name"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="email" id="email" value={manager.person.email}
                   onChange={this.handleChange} autoComplete="email"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="contactNo" className="col-sm-2 col-form-label">Contact No</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="contactNo" id="contactNo" value={manager.person.contactNo}
                   onChange={this.handleChange} autoComplete="contactNo"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="username" id="username" value={manager.personaUser.username}
                    onChange={this.handleChange} autoComplete="username"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">Default Password</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="password" id="password" value={manager.personaUser.password}
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

export default withRouter(ManagerAdd);