import React from 'react';
import * as vaccineService from '../../services/HospitalVaccineService';
import ManagerNavbar from './ManagerNavbar';
import { withRouter } from 'react-router-dom';

class VaccineEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vaccine: {},
            hospitalId: localStorage.getItem('hospitalId'),
            errors: [],
            errorMsgs: {
                countError: ''
            }
        };       
    }

    async componentDidMount() {
        const vaccine = (await vaccineService.getVaccineByIdAndHId(this.props.match.params.id, this.state.hospitalId)).data;
        this.setState({ vaccine });
    }

    handleChange=(event)=> {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let vaccine = { ...this.state.vaccine };
        vaccine[name] = value;
        this.setState({ vaccine });
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    validate=()=> {
        const { vaccine, errorMsgs } = this.state;
        var errors = [];

        if (vaccine.count < 0) {
            errors.push("count");
            errorMsgs.countError = 'Vaccine count should be greater than or equal zero'
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

    handleSubmit=(event)=> {
        event.preventDefault();
        var msgs = { countError: '' }
        const editedVaccine = {
            id: this.state.vaccine.id,
            count: this.state.vaccine.count,
            hospitalId: this.state.hospitalId,
            vaccineId: this.state.vaccine.vaccineId
        };
        this.setState({
            errors: [],
            errorMsgs: msgs
        }, () => {
            if (this.validate()) {
                vaccineService.editVaccineInHospital({ editedVaccine }).then(res => {

                }).catch(function (error) {
                }.bind(this));

            }
        })
    }

    cancel=()=> {
        this.props.history.push('/manageVaccines');
      }
    render() {
        const { vaccine, errorMsgs } = this.state;
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
                            <input type="text" className="form-control" name="name" id="name" value={vaccine.name}
                                onChange={this.handleChange} disabled />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="count" className="col-sm-2 col-form-label">Count</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" name="count" id="count" className={this.hasError("count") ? "form-control is-invalid" : "form-control"} value={vaccine.count}
                                onChange={this.handleChange} />
                            <div class="invalid-feedback">
                                {errorMsgs.countError}
                            </div>
                        </div>

                    </div>
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
export default withRouter(VaccineEdit);