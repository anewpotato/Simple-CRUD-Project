import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { InputGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

class Home extends Component {

	handleLogin=(e)=>{
		e.preventDefault();
		this.props.callbackFromParent(e.target.value);
		
		
	}
	render() {
        return(
        	<div className="home"> 
      		 <Jumbotron>
        		<Image className="welcome_img" src="data:image/png;base64,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"
		  	    	roundedCircle />
        		  <h2>{this.props.desc}</h2>
        		  <p>
        		   Please select your <strong>Identity</strong>.<br/>
        		   
        		   <strong>Admin</strong> can create, update, delete, read about postings.<br/>
        		   <strong>Visitor</strong> only can use read and reply fuctions.
        		  </p>
        		  
        		  <Accordion>
				  <Card bg="light">
				    <Card.Header>
				    <span className="home_btn">
				      <Accordion.Toggle as={Button} variant="outline-primary" size ="lg" eventKey="1" onClick={this.handleLogin} value="admin">
				      	Admin
				      </Accordion.Toggle>
				    </span>
				      <span className="home_btn">
		      		    <Button variant="outline-primary" size="lg" onClick={this.handleLogin} value="visitor">Visitor</Button>
		      		  </span>
				    </Card.Header>
        		    <Accordion.Collapse eventKey="1">
				     <Card.Body>
				     <div >
					    
						<InputGroup  >
							<InputGroup.Prepend>
						 		<InputGroup.Text >ID</InputGroup.Text>
			
					 		</InputGroup.Prepend>
					 		<FormControl
					 			
					 			
					 			placeholder = 'Write your ID'
					 		  />
					 		 </InputGroup>
					 		<InputGroup style={{marginTop:"10px"}}>
							<InputGroup.Prepend>
						 		<InputGroup.Text >Password</InputGroup.Text>
			
					 		</InputGroup.Prepend>
					 		<FormControl
					 			type="password"
					 			
					 			placeholder = 'Write your Password'
					 		  />
					 		 </InputGroup>
					 		<div style={{marginTop:"10px"}}>
					 		<Button variant="primary">Login</Button>
					 		</div>
					    </div>
				     </Card.Body>	
				    </Accordion.Collapse>
				    </Card>
				    </Accordion>
        		
        		  
        		</Jumbotron>
        		
        	</div>
        );
    }
}

export default Home;