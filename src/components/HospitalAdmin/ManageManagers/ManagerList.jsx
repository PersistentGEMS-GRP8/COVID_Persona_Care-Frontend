import React, { Component } from 'react';
import ManagerService from '../../../services/ManagerService';
import HospitalAdminNavbar from '../HospitalAdminNavbar';

class ManagerList extends Component {

  constructor(props) {
    super(props);
    this.state = {managers: [], hId:localStorage.getItem('hospitalId')};
    this.removeManager = this.removeManager.bind(this);
    this.addManager = this.addManager.bind(this);
    this.editManager = this.editManager.bind(this);
  }

  componentDidMount() {
    ManagerService.getManagersByHId(this.state.hId).then((res) => {
      this.setState({managers:res.data});
    });
  }

  removeManager(id) {
    ManagerService.deleteManager(id).then(() => {
      let updatedManagers = [...this.state.managers].filter(i => i.id !== id);
      this.setState({managers: updatedManagers});
    });
  }
  addManager(){
    this.props.history.push('/manager/add');
  }

  editManager(id){
    this.props.history.push(`/manager/${id}`);
  }

  render() {
    const {managers} = this.state;

    const managerList = managers.map(manager => {
      return <tr key={manager.id}>
        <td>{manager.id}</td>
        <td>{manager.name}</td>
        <td>{manager.email}</td>
        <td>{manager.contactNo}</td>
        <td>
          <div className="btn-group">
            <button className="btn button-custom btn-sm" onClick={ () => this.editManager(manager.id)}>Edit</button>
            <button className="btn button-delete btn-sm" onClick={() => this.removeManager(manager.id)}>Delete</button>
          </div>
        </td>
      </tr>
    });

    return (
      <div>
        <HospitalAdminNavbar/>
        <div className="container">
        <br></br>
          <h3>Managers</h3>        
          <button className="btn button-custom float-end" onClick={this.addManager}>Register Manager</button>         
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
            {managerList}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ManagerList;