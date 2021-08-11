import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ManagerService from '../../../services/ManagerService';
import Navbar from '../../layout/navbar'

class ManagerEdit extends Component {

  emptyItem = {
    id:'',
    name: '',
    email: '',
    contactNo: '',
    hId:''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  async componentDidMount() {   
      const manager = (await ManagerService.getManagerById(this.props.match.params.id)).data;
      this.setState({item: manager});   
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    ManagerService.updateManager(item).then(res =>{
      this.props.history.push('/managers');
    });
   
  }

  cancel(){
    this.props.history.push('/managers');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{'Manager Details'}</h2>;

    return <div>
      <Navbar/> 
      <br/>
      <div className="container">
        {title}
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3 row">
            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="name" id="name" value={item.name}
                    onChange={this.handleChange} autoComplete="name"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="email" id="email" value={item.email}
                   onChange={this.handleChange} autoComplete="email"/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="contactNo" className="col-sm-2 col-form-label">Contact No</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="contactNo" id="contactNo" value={item.contactNo}
                   onChange={this.handleChange} autoComplete="contactNo"/>
            </div>
          </div>
          <br></br>
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

export default withRouter(ManagerEdit);