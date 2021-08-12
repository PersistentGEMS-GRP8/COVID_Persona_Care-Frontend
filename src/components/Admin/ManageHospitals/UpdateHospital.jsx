import React, {Component} from "react";
import AdminNavbar from "../AdminNavbar";

import {getHospital, getHospitalList, updateHospital} from "../../Actions/hospitalAPICalls";
import 'bootstrap/dist/css/bootstrap.min.css';

class UpdateHospital extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
      }
        
    componentDidMount() {
        const hId = this.props.match.params.id;

        getHospital(hId).then(res => {
        let response = res.data;

          console.log("resssssss",response);
          this.setState({data:response}) 
       // console.log("COMPONENETDIDMOUNTCONSOLE",this.state);

        });
    }

   
    onChange = event => {
       this.setState({ [event.target.id]: event.target.value });
    };

    onSubmit = e => {
        const hId = this.props.match.params.id;

        e.preventDefault();
        const item = {
            hId:this.props.match.params.id,
            hName:this.state.data.hName,
            location:this.state.data.location,
            noOfBeds:this.state.noOfBeds };
            
            console.log(item);

            updateHospital(hId,{item});
            
            console.log("Update Hospital success");

            //redirect to adminDashboard and refresh the page
             this.props.history.push('/adminDashboard')
             window.location.reload(false);

             };

    resetForm = () => { 
        console.log("Cancel");
        //this.formRef.reset();
        this.setState({hName: "", location: "", noOfBeds: ""})

     };
        
        render() {
        return (
            <div>
                <AdminNavbar/>

                <form ref={ref => (this.formRef = ref)} onSubmit={this.onSubmit}>
                    <div className="form-row container">
                        <div className="form-group col-md-6">   
                        <br/>
                            <h2>Update Hospital</h2> 
                        {/* <h2>{this.state.data.hName}</h2> */}
                        <br/>

                            <label >Hospital Name:</label> 
                            <input 
                                onChange={this.onChange}
                                value={this.state.hName}
                                id="hName"
                                type="text" 
                                className="form-control" 
                                placeholder={this.state.data.hName}
                                disabled/>
                       
                             <label >Location:</label>
                            <input 
                                onChange={this.onChange}
                                value={this.state.location}
                                id="location"
                                type="text" 
                                className="form-control" 
                                placeholder={this.state.data.location}
                                />
                     
                            <label >No. of Beds:</label>
                            <input 
                                onChange={this.onChange}
                                value={this.state.noOfBeds}
                                id="noOfBeds"
                                type="text" 
                                className="form-control" 
                                placeholder={this.state.data.noOfBeds}/>
                        
                   <br/>
                   <div className="btn-toolbar" role="toolbar">
                       <div className="btn-group mr-2" role="group" aria-label="First group">
                            <button type="submit" className="button" >Update</button> 
                        </div>
                        <div className="btn-group mr-2" role="group" aria-label="First group">
                            <button onClick={this.resetForm} type="reset" className="button" >Cancel</button>
                        </div>
                    </div>
                    </div>
                    </div>

                </form>
            </div>
        );
    }
}

export default UpdateHospital;