import React, { Component } from 'react';
import ReceptionistService from '../../../services/ReceptionistService';
import HospitalAdminNavbar from '../HospitalAdminNavbar';


class ReceptionistList extends Component {

  constructor(props) {
    super(props);
    this.state = {receptionists: [], hId:localStorage.getItem('hospitalId')};
    this.removeReceptionist = this.removeReceptionist.bind(this);
    this.addReceptionist = this.addReceptionist.bind(this);
    this.editReceptionist = this.editReceptionist.bind(this);
  }

  componentDidMount() {
    ReceptionistService.getReceptionistsByHId(this.state.hId).then((res) => {
      this.setState({receptionists:res.data});
    });
  }

  removeReceptionist(id) {
    ReceptionistService.deleteReceptionist(id).then(() => {
      let updatedReceptionists = [...this.state.receptionists].filter(i => i.id !== id);
      this.setState({receptionists: updatedReceptionists});
    });
  }
  addReceptionist(){
    this.props.history.push('/receptionist/add');
  }

  editReceptionist(id){
    this.props.history.push(`/receptionist/${id}`);
  }

  render() {
    const {receptionists} = this.state;

    const receptionistList = receptionists.map(receptionist => {
      return <tr key={receptionist.id}>
        <td>{receptionist.id}</td>
        <td>{receptionist.name}</td>
        <td>{receptionist.email}</td>
        <td>{receptionist.contactNo}</td>
        <td>
          <div className="btn-group">
            <button className="btn button-custom btn-sm" onClick={ () => this.editReceptionist(receptionist.id)}>Edit</button>
            <button className="btn button-delete btn-sm" onClick={() => this.removeReceptionist(receptionist.id)}>Delete</button>
          </div>
        </td>
      </tr>
    });

    return (
      <div>
        <HospitalAdminNavbar/>
        <div className="container">
        <br></br>
          <h3>Receptionists</h3>        
          <button className="btn button-custom float-end" onClick={this.addReceptionist}>Register Receptionist</button>         
          <br/><br/>
          <table className="table table-hover">
            <thead>
            <tr>
              <th width="15%">ID</th>
              <th width="30%">Name</th>
              <th width="25%">Email</th>
              <th width="20%">Contact No</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {receptionistList}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ReceptionistList;