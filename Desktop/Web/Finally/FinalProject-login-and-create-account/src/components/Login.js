import React from 'react';
import {
    Row,
    Label,
    Col,
    Button,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Form,
    FormGroup,
    Input,
    InputGroup,
  } from 'reactstrap';
import '../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSCKey } from '../actions/updateSCKey';
import { Redirect } from 'react-router-dom';
import { updateLoginInput } from '../actions/updateLoginInput';
import { updateRegister } from '../actions/updateRegister';
import Register from './Register';
import { updateRegisterPBInput } from '../actions/updateRegisterPBInput';
import { updateRegisterConfInput } from '../actions/updateRegisterConfInput';

const fetch = require('node-fetch');
const { Keypair } = require('stellar-base');
const secretKey = "SBGZ5OSTDSA6FJEF7GB4MB2GQVL4WOHVKDSPY3ODCFOALPEPIFCOETMF";
class Login extends React.Component {

    loginText = (e) => {
        var a = e.target.value;
        this.props.onUpdateLoginInput(a);
        
    }

    onLogin = () => {
        try {
            const key = Keypair.fromSecret(this.props.logininput);
            fetch(`localhost:3001/data/GBAZVE7HITKLHDLBSP6TTHS3YQ4V26NODNYZFEIEIM72OBJ7PGMCQKKR`)
            .then(res => console.log(res.json()));
            this.props.onUpdateSCKey(this.props.logininput);
            //tx.account = key.publicKey();
          }
          catch(err) {
            alert(err.message);
          }
    }

    onRegister = () => {
      this.props.onUpdateRegister(true);
    }
    render() {

        return(
            this.props.sckey !== null ? <Redirect to="/"></Redirect> :
            <div>
              <Row>
        <Col xs={6} md={4}>
        </Col>
        <Col xs={6} md={4}>
                  <div class="h-white"><h1>Login</h1></div>
                  <Row>
                  <input onChange={(e)=> this.loginText(e)} class="input-login" placeholder="secret key"/>
                  </Row>
                  <br></br>
                  <button onClick={() => this.onLogin()}class="button button1">Login</button>
                  <p onClick={() => this.onRegister()}class="create-account-link"><u>Create account</u></p>
                </Col>
                <Col xs={6} md={4}>
                </Col>
                </Row>
                {this.props.register == true ? <Register 
                onUpdateRegister={this.props.onUpdateRegister}
                onUpdateRegisterPBInput={this.props.onUpdateRegisterPBInput}
                onUpdateRegisterConfInput={this.props.onUpdateRegisterPBInput}
                />:<div/>}
                </div>
                
        )
    }
}
const mapStateToProps = (state) => {
    return {
      sckey: state.sckey,
      logininput: state.logininput,
      register: state.register,
      registerpbinput: state.registerpbinput,
      registerconfinput: state.registerconfinput,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      onUpdateSCKey: updateSCKey,
      onUpdateLoginInput: updateLoginInput,
      onUpdateRegister: updateRegister,
      onUpdateRegisterPBInput: updateRegisterPBInput,
      onUpdateRegisterConfInput: updateRegisterConfInput,
    }, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Login);