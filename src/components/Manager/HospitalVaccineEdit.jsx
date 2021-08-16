import React from 'react';
import * as vaccineService from '../../services/HospitalVaccineService';
import ManagerNavbar from './ManagerNavbar';

class VaccineEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vaccine: {},
            hospitalId: localStorage.getItem('hospitalId')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        const vaccine = (await vaccineService.getVaccineByIdAndHId(this.props.match.params.id, this.state.hospitalId)).data;
        this.setState({ vaccine });

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let vaccine = { ...this.state.vaccine };
        vaccine[name] = value;
        this.setState({ vaccine });
    }

    handleSubmit(event) {
        event.preventDefault();
        const editedVaccine = {
            id:this.state.vaccine.id,
            count: this.state.vaccine.count,
            hospitalId: this.state.hospitalId,
            vaccineId: this.state.vaccine.vaccineId
        };
        vaccineService.editVaccineInHospital({ editedVaccine });
    } 

    render() {
        const vaccines = this.state.vaccines;
        const title = <h2>{'Edit Vaccine'}</h2>;

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
                            <input type="text" className="form-control" name="name" id="name" value={this.state.vaccine.name}
                                onChange={this.handleChange} disabled />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Count</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" name="count" id="count" value={this.state.vaccine.count}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col text-center">
                            <button className="btn button-custom me-2" type="submit">Update</button>
                            <button type="reset" className="btn btn-secondary ms-2">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
}
export default VaccineEdit;