import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

class Read extends Component {
	render() {
        return(
        	<div className="read"> 
        	<Card className="post" >
			  <Card.Header >Postings</Card.Header>
			  <ListGroup horizontal>
			  <ListGroup.Item style={{flex:'1'}}>Writer</ListGroup.Item>
			  <ListGroup.Item style={{flex:'5'}}>Title</ListGroup.Item>
			  <ListGroup.Item style={{flex:'1'}}>Date</ListGroup.Item>
			  <ListGroup.Item style={{flex:'1'}}>Views</ListGroup.Item>
			</ListGroup>
			</Card>
        		
        		
        	</div>
        );
    }
}

export default Read;