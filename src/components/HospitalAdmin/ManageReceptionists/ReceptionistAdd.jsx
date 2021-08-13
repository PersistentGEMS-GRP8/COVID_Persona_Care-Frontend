import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReceptionistService from '../../../services/ReceptionistService'
import HospitalAdminNavbar from '../HospitalAdminNavbar';

class ReceptionistAdd extends Component {

  emptyPerson = {
    receptionist:{
      id:'',
      name: '',
      email: '',
      contactNo: '',
      hId:2
    },
    personaUser:{
      id:'',
      username: '',
      password: '',
      role: 'ROLE_RECEPTIONIST',
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      person: this.emptyPerson
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let person = {...this.state.person};
    person[name] = value;
    person.receptionist[name] = value;
    person.personaUser[name] = value;
    this.setState({person});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {person} = this.state;
    console.log(person);
    ReceptionistService.createReceptionist(person).then(res =>{
        this.props.history.push('/receptionists');
    });
    
  }

  cancel(){
    this.props.history.push('/receptionists');
  }

  render() {
    const {person} = this.state;
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
              <input type="text" className="form-control" name="name" id="name" value={person.receptionist.name}
                    onChange={this.handleChange} autoComplete="name"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="email" id="email" value={person.receptionist.email}
                   onChange={this.handleChange} autoComplete="email"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="contactNo" className="col-sm-2 col-form-label">Contact No</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="contactNo" id="contactNo" value={person.receptionist.contactNo}
                   onChange={this.handleChange} autoComplete="contactNo"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="username" id="username" value={person.personaUser.username}
                    onChange={this.handleChange} autoComplete="username"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">Default Password</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="password" id="password" value={person.personaUser.password}
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