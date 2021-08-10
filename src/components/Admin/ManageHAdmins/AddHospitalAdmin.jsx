import React, {Component} from "react";
import {postHospitalAdmin} from "../../Actions/hospitalAdminAPICalls";
import AdminNavbar from '../AdminNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getHospitalList} from "../../Actions/hospitalAPICalls";
import { postUser } from "../../Actions/authAPICalls";


class AddHospitalAdmin extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:" ",
            email:" ",
            contactNo:" ",
            hId:" ",
            HospitalList:[],

            username:" ",
            password:" "
        };

      }
    onChange = event => {
        console.log("onCHANGE");
        this.setState({ [event.target.id]: event.target.value });

    };
    componentDidMount() {
               
        getHospitalList().then(res => {
            let response = res;
    
              let {HospitalList} = this.state;
              response.map((item, i) => {
                  HospitalList.push(item)
    
                  return  HospitalList;
    
    
              });
              console.log("HospitalList:",HospitalList);

              this.setState({
                  HospitalList
              });
            });

    }

    // getHospitalListNames=()=>{
    //     this.state.HospitalList.forEach(element => {
    //         console.log("ELEMEnRR",element.hName); 
    //         return element.hName;    
    //      });
    //  }



    onSubmit = e => {
        e.preventDefault();
        const item = {
            name:this.state.name,
            email:this.state.email,
            contactNo:this.state.contactNo,
            hId:this.state.hId
        };

        const hAdminCredentials = {
            username:this.state.username,
            password:this.state.password,
            role:"ROLE_HOSPITALADMIN",
        };

            // console.log("BLhhh",hAdminCredentials);
            // console.log(item);

            postHospitalAdmin({item});


            //Add username & password to PersonaUser Table
            postUser({hAdminCredentials});
            
            console.log("Add Hospital Admin success");
            this.resetForm();

            this.props.history.push('/manageHadmins')
            window.location.reload(false);

             };

    resetForm = () => { 
        
      // this.getHospitalListNames();

        console.log(this.state.HospitalList);

        console.log("Cancel");
        //this.formRef.reset();
        this.setState({name: "", email: "", contactNo: ""})
     };
        
        render() {

        return (
            <div>
                <AdminNavbar/> 
                <form ref={ref => (this.formRef = ref)} onSubmit={this.onSubmit}>
                    <div className="form-row container" >
                        <div className="form-group col-md-6">
                        <br/>
                            <h2>Register Hospital Admin</h2>
                            <br/>
                            <label for="inputState">Hospital Name:</label>
                            <select 
                                id="hId" 
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.hId}
                               
                                >
                            <option selected>Choose...</option>
                            { this.state.HospitalList.map(value => 
                                <option 
                                 key={value.hId} value={value.hId}
                                >
                                    {value.hName}
                                </option>)
                             }
                            </select>
                            
                            <label >Hospital Admin Name:</label> 
                            <input 
                                onChange={this.onChange}
                                value={this.state.name}
                                id="name"
                                type="text" 
                                className="form-control" 
                                placeholder="name"/>
                       
                             <label >Email:</label>
                            <input 
                                onChange={this.onChange}
                                value={this.state.email}
                                id="email"
                                type="text" 
                                className="form-control" 
                                placeholder="email"/>
                      
                            <label >Contact Number:</label>
                            <input 
                                onChange={this.onChange}
                                value={this.state.contactNo}
                                id="contactNo"
                                type="text" 
                                className="form-control" 
                                placeholder="contactNo"/>

                            <label >Username:</label>
                            <input 
                                onChange={this.onChange}
                                value={this.state.username}
                                id="username"
                                type="text" 
                                className="form-control" 
                                placeholder="username"/>

                            <label >Default Password:</label>
                            <input 
                                onChange={this.onChange}
                                value={this.state.password}
                                id="password"
                                type="text" 
                                className="form-control" 
                                placeholder="password"/>
                       
                    <br/>
                    <div className="btn-toolbar" role="toolbar">
                       <div className="btn-group mr-2" role="group" aria-label="First group">
                       <button type="submit" className="button" >Submit</button> 

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

export default AddHospitalAdmin;