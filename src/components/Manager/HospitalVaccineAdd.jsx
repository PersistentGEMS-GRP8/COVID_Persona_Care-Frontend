import React from 'react';
import { withRouter } from 'react-router-dom';
import * as vaccineService from '../../services/HospitalVaccineService';
import ManagerNavbar from './ManagerNavbar';

class HospitalVaccineAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vaccines: [],
                count:0,
                hospitalId:localStorage.getItem('hospitalId'),
                vaccineId:0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }
    async componentDidMount() {
        const vaccines = (await vaccineService.getVaccinesNames()).data;
        this.setState({
         vaccines:vaccines
        });
        
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const newVaccine = {
            count:this.state.count,
            hospitalId:this.state.hospitalId,
            vaccineId:this.state.vaccineId
        };
        vaccineService.addVaccineToHospital({newVaccine}).then(res => {
            this.resetForm();
        });

    }

    resetForm = () => { 
        this.formRef.reset();
     };

    render() {
        const vaccines  = this.state.vaccines; 
        const title = <h2>{'Add Vaccine'}</h2>;

        return <div>
            <ManagerNavbar />
            <br />
            <div className="container">
                {title}
                <br></br>
                <form class="needs-validation" novalidate  ref={ref => (this.formRef = ref)} onSubmit={this.handleSubmit}>
                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <select type="text" className="form-control" name="vaccineId" id="vaccineId" value={this.state.vaccineId}
                                onChange={this.handleChange}>
                                    <option>--Select Vaccine--</option>
                                  {vaccines.map(vaccine=>(<option value={vaccine.id}>{vaccine.name}</option>))}
                                </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Count</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" name="count" id="count" value={this.state.count}
                                onChange={this.handleChange}  />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col text-center">
                            <button className="btn button-custom me-2" type="submit">Save</button>
                            <button type="reset"  className="btn btn-secondary ms-2" onClick={this.resetForm}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
}
export default withRouter(HospitalVaccineAdd);