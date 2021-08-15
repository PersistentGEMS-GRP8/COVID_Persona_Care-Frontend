import React from 'react';
import * as VaccineService from '../../services/HospitalVaccineService';
import { withRouter } from 'react-router-dom';
import ManagerNavbar from './ManagerNavbar';

class VaccineList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {vaccines: [],hId:1};
        this.removeVaccine = this.removeVaccine.bind(this);
        this.addVaccine = this.addVaccine.bind(this);
        this.editVaccine = this.editVaccine.bind(this);
      }
    
      componentDidMount() {
        VaccineService.getVaccinesInHospital(this.state.hId).then((res) => {
          this.setState({vaccines:res.data},()=>console.log(this.state.vaccines));
        });
        
      }
    
      removeVaccine(id) {
        VaccineService.deleteVaccineInHospital(id).then(() => {
          let updatedVaccines = [...this.state.vaccines].filter(i => i.id !== id);
          this.setState({vaccines: updatedVaccines});
        });
      }
      addVaccine(){
        this.props.history.push('/manager/addVaccines');
      }
    
      editVaccine(id){
        this.props.history.push(`/manager/editVaccine/${id}`);
      }
    
      render() {
        const {vaccines} = this.state;
    
        const vaccineList = vaccines.map(vaccine => {
          return <tr key={vaccine.vaccineId}>
            <td>{vaccine.vaccineId}</td>
            <td>{vaccine.name}</td>
            <td>{vaccine.count}</td>
            <td>
              <div className="btn-group">
                <button className="btn button-custom btn-sm" onClick={ () => this.editVaccine(vaccine.id)}>Edit</button>
                <button className="btn button-delete btn-sm" onClick={() => this.removeVaccine(vaccine.id)}>Delete</button>
              </div>
            </td>
          </tr>
        });
    
        return (
          <div>
            <ManagerNavbar/>
            <div className="container">
            <br></br>
              <h3>Vaccine</h3>        
              <button className="btn button-custom float-end" onClick={this.addVaccine}>Add Vaccine</button>         
              <br/><br/>
              <table className="table table-hover">
                <thead>
                <tr>
                  <th width="15%">ID</th>
                  <th width="30%">Name</th>
                  <th width="25%">Count</th>
                  <th width="10%">Actions</th>
                </tr>
                </thead>
                <tbody>
                {vaccineList}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }

    export default withRouter(VaccineList);

