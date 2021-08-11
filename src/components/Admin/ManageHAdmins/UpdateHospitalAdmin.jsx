import React, {Component} from "react";
import AdminNavbar from "../AdminNavbar";

import { updateHospitalAdmin} from "../../Actions/hospitalAdminAPICalls";
import { getHospitalAdmin } from "../../Actions/hospitalAdminAPICalls";
import 'bootstrap/dist/css/bootstrap.min.css';

class UpdateHospitalAdmin extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
      }
        
    componentDidMount() {
        const id = this.props.match.params.id;

        getHospitalAdmin(id).then(res => {
          console.log("resssssss",res);
          this.setState({data:res}) 

       console.log("COMPONENETDIDMOUNTCONSOLE",this.state);

        });
    }

   
    onChange = event => {
       this.setState({ [event.target.id]: event.target.value });

    };

    onSubmit = e => {

        const id= this.props.match.params.id;

        e.preventDefault();
        const item = {
            id:this.props.match.params.id,
            name:this.state.data.name,
            email:this.state.data.email,
            contactNo:this.state.contactNo,
            hId:this.state.data.hId  };

            updateHospitalAdmin(id,{item});
            
            console.log("Update Hospital Admin success");

            //redirect to adminDashboard and refresh the page
             this.props.history.push('/manageHadmins')
             window.location.reload(false);

             };

    resetForm = () => { 
        console.log("Cancel");
        //this.formRef.reset();
        this.setState({name: "", email: "", contactNo: ""})

     };
        
        render() {

        return (
            <div>
                <AdminNavbar/>

                <form ref={ref => (this.formRef = ref)} onSubmit={this.onSubmit}>
                    <div className="form-row container">
                        <div className="form-group col-md-6">   
                        <br/>
                            <h2>Update Hospital Admin</h2> 
                        {/* <h2>{this.state.data.name}</h2> */}
                        <br/>

                            <label >Hospital Admin Name:</label> 
                            <input 
                                onChange={this.onChange}
                                value={this.state.name}
                                id="name"
                                type="text" 
                                className="form-control" 
                                placeholder={this.state.data.name}
                                disabled/>
                       
                             <label >Email:</label>
                            <input 
                                onChange={this.onChange}
                                value={this.state.email}
                                id="email"
                                type="text" 
                                className="form-control" 
                                placeholder={this.state.data.email}
                                />
                     
                            <label >Contact Number:</label>
                            <input 
                                onChange={this.onChange}
                                value={this.state.contactNo}
                                id="contactNo"
                                type="text" 
                                className="form-control" 
                                placeholder={this.state.data.contactNo}
                                />
                        
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

export default UpdateHospitalAdmin;