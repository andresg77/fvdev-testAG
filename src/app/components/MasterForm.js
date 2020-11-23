import React, {Component} from "react";
import {Container, Row, Col } from "react-bootstrap";
import Step from './Step'
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';


class MasterForm extends Component {
  constructor(props) {
  super(props);
        this.state = {
            emailError:"",
            activeSteps:[true,false,false],
            stepHasNavigation:[true,true,false],
            currentStep:0,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: '',
            dayOfBirth: '',
            monthOfBirth: '',
            yearOfBirth: '',
            dateOfBirth: '',
            comments: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.getDateOfBirth = this.getDateOfBirth.bind(this);

        this.validator = new SimpleReactValidator({autoForceUpdate: this});
        
  }
  getDateOfBirth(){
    const dateOfBirth = `${this.state.dayOfBirth}/${this.state.monthOfBirth}/${this.state.yearOfBirth}`;
    this.setState({dateOfBirth: dateOfBirth})
    if (this.validator.fieldValid('dateOfBirth')) {
      
    }
    else{
      this.validator.showMessageFor('dateOfBirth');
      this.forceUpdate();
    }
  }
  handleNext(e){
    let currentActiveSteps = [...this.state.activeSteps];
    let currentStep = parseInt(e.target.value);
    currentActiveSteps[currentStep] = !currentActiveSteps[currentStep] 
    currentStep++
    this.setState({activeSteps: currentActiveSteps, currentStep:currentStep}, () => {});

  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  
  handleSubmit(e) {
    e.preventDefault();
    axios
        .post('/send', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            gender: "1",
            dateOfBirth: this.state.dateOfBirth,
            comments: this.state.comments
        })
        .then(response => {
            console.log('from handle submit', response);
        });
    }
  render() {
    return (
      <div>
           <form method="POST" onSubmit={this.handleSubmit} id="masterForm"  >
                <Step title="Step 1: Your details" step="0" isActive={this.state.activeSteps[0]} handlenext={this.handleNext} hasNavigation={this.state.stepHasNavigation[0]} >
                <Container fluid>
                  <Row>
                    <Col xs="4">
                      <label htmlFor="firstName">First Name:</label>
                      <input 
                          type="text" 
                          name="firstName" 
                          id="firstName" 
                          onChange={this.handleChange}
                          value={this.state.firstName} 
                          onBlur={() => this.validator.showMessageFor('firstName')}
                          required
                      />
                      {this.validator.message('firstName', this.state.firstName, 'required|max:100', { className: 'text-danger' })}

                    </Col>
                    <Col xs="4">
                      <label htmlFor="lastName">Surname:</label>  
                      <input 
                          type="text" 
                          name="lastName" 
                          id="lastName" 
                          onChange={this.handleChange}
                          value={this.state.lastName}
                          onBlur={() => this.validator.showMessageFor('lastName')}
                          required
                      />
                      {this.validator.message('lastName', this.state.lastName, 'required|max:100', { className: 'text-danger' })}

                    </Col>
                  </Row>
                  <Row>
                    <Col>
                          <label htmlFor="email">E-mail:</label> 
                          <input 
                              type="text" 
                              name="email" 
                              id="email" 
                              onChange={this.handleChange}
                              value={this.state.email}  
                              onBlur={() => this.validator.showMessageFor('email')}
                              required
                              />
                      {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
                    </Col>
                  </Row>
                </Container>
                </Step>
                <Step title="Step 2: More comments" step="1" isActive={this.state.activeSteps[1]} handlenext={this.handleNext} hasNavigation={this.state.stepHasNavigation[1]}>
                <Container fluid>
                  <Row>
                    <Col xs="4">
                      <label htmlFor="phone">Telephone number:</label>
                      <input 
                          type="text" 
                          name="phone" 
                          id="phone" 
                          onChange={this.handleChange}
                          value={this.state.phone}  
                          onBlur={() => this.validator.showMessageFor('phone')}
                          required
                      />
                      {this.validator.message('phone', this.state.phone, 'required|phone', { className: 'text-danger' })}

                    </Col>
                    <Col xs="4">
                      <label htmlFor="email">Gender:</label>
                      <select
                          name="gender" 
                          id="gender" 
                          onChange={this.handleChange}
                          value={this.state.gender} 
                          onBlur={() => this.validator.showMessageFor('gender')}
                          required
                      >

                          <option value="1" >Male</option>
                          <option value="2" >Female</option>
                          <option value="3" >Other</option>
                      </select>
                      {this.validator.message('gender', this.state.gender, 'required', { className: 'text-danger' })}

                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <label htmlFor="dateOfBirth">Date of Birth: dd/mm/yyy</label> 
                        <input 
                          type="number" 
                          name="dayOfBirth"
                          id="dayOfBirth"  
                          min="1" max="31"  
                          onChange={this.handleChange}
                          value={this.state.dayOfBirth}
                          onBlur={this.getDateOfBirth} 
                          className="dateOfBirth"
                          required
                        />
                        <input 
                          type="number" 
                          name="monthOfBirth"
                          id="monthOfBirth"  
                          min="1" max="12"  
                          onChange={this.handleChange}
                          value={this.state.monthOfBirth} 
                          onBlur={this.getDateOfBirth} 
                          className="dateOfBirth"
                          required
                        />
                        <input 
                          type="number" 
                          name="yearOfBirth"
                          id="yearOfBirth"  
                          min="1900" max="2020"  
                          onChange={this.handleChange}
                          value={this.state.yearOfBirth} 
                          onBlur={this.getDateOfBirth} 
                          className="dateOfBirth"
                          required
                        />
                        {this.validator.message('dateOfBirth', this.state.dateOfBirth, 'required', { className: 'text-danger' })}

                      </Col>
                    </Row>
                  </Container>
                </Step>
                <Step title="Step 3: Final comments" step="2" isActive={this.state.activeSteps[2]} handlenext={this.handleNext} hasNavigation={this.state.stepHasNavigation[2]}>
                <Container fluid>
                <Row>
                    <Col>
      
                  <label htmlFor="comments">Comments:</label>
                    <textarea 
                    name="comments" 
                    id="comments" 
                    onChange={this.handleChange}
                    value={this.state.comments}   
                    onBlur={() => this.validator.showMessageFor('comments')}
                    ></textarea>
                    {this.validator.message('comments', this.state.comments, 'max:5000', { className: 'text-danger' })}
                  </Col>
                  </Row>
                  </Container>
                  <button type="submit" className="actionButton align-self-end">Submit</button>
                </Step>
            
        </form>
    </div>
      
    );
  }
}
export default MasterForm