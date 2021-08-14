import React from 'react';
import * as vaccineService from '../../services/HospitalVaccineService';
import ManagerNavbar from './ManagerNavbar';

class HospitalVaccineAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vaccines: [],
            newVaccine:{
                count:0,
                hospitalId:12,
                vaccineId:0
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    async componentDidMount() {
        const vaccines = (await vaccineService.getVaccinesNames()).data;
        console.log(vaccines)
        this.setState({
         vaccines:vaccines
        });
        
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let newVaccine = {...this.state.newVaccine};
        newVaccine[name] = value;     
        this.setState({newVaccine:newVaccine});
    }

    handleSubmit(event) {
        event.preventDefault();
        const  newVaccine = this.state.newVaccine;
        console.log(newVaccine);
        vaccineService.addVaccineToHospital(newVaccine.count,newVaccine.hospitalId,newVaccine.vaccineId).then(res => {
          //  this.props.history.push('/managers');
        });

    }

    cancel() {
        this.props.history.push('/managers');
    }

    render() {
        const vaccines  = this.state.vaccines; 
        const newVaccine = this.state.newVaccine;
        const title = <h2>{'Add Vaccine'}</h2>;

        return <div>
            <ManagerNavbar />
            <br />
            <div className="container">
                {title}
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <select type="text" className="form-control" name="vaccineId" id="vaccineId" value={newVaccine.vaccineId}
                                onChange={this.handleChange}>
                                    <option>--Select Vaccine--</option>
                                  {vaccines.map(vaccine=>(<option value={vaccine.id}>{vaccine.name}</option>))}
                                </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Count</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" name="count" id="count" value={newVaccine.count}
                                onChange={this.handleChange}  />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col text-center">
                            <button className="btn button-custom me-2" type="submit">Save</button>
                            <button className="btn btn-secondary ms-2" onClick={this.cancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
}
export default HospitalVaccineAdd;