import React from 'react';
import '../App.css';
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
class Register extends React.Component {

    closeRegister = () => {
        this.props.onUpdateRegister(false);
    }

    pbkText = (e) => {
        var a = e.target.value;
        this.props.onUpdateRegisterPBInput(a);
        
    }

    confPbkText = (e) => {
        var a = e.target.value;
        this.props.onUpdateRegisterConfInput(a);
        
    }

    render() {
        return(
            <Row>
                <Col sm={4} md="4">
                </Col>
                <Col sm={4} md="4">
            <Card>
                    <CardHeader color="Info">
                      <strong>Register</strong>
                    </CardHeader>
                    <br></br>
                    <CardBody className="text-center">
                      <Form action="" method="post" class="form-horizontal">
                        <FormGroup row>
                          <Label for="name" sm={4}>Puclic key</Label>
                          <Col sm={4} md="4">
                            <InputGroup>
                              <input onChange={(e)=> this.pbkText(e)} class="input-register" type="text" id="name" name="name" placeholder=""/>
                            </InputGroup>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="age" sm={4}>Confirm</Label>
                          <Col sm={4} md="4">
                            <InputGroup>
                              <input onChange={(e)=> this.confPbkText(e)} class="input-register" type="text" id="age" name="age" placeholder=""/>
                            </InputGroup>
                          </Col>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <br></br>


                    <CardFooter>
                      <Button type="submit" size="sm" sm={2} color="success"><i className="fa fa-save" />OK</Button>{' '}
                      <Button onClick={() => this.closeRegister()}type="reset" size="sm" color="danger"><i className="fa fa-ban" /> Cancel</Button>
                    </CardFooter>
                <br></br>
                  </Card>
                  </Col>
                  <Col sm={4} md="4">
                </Col>
                  </Row>
      )
    }
}
export default (Register)