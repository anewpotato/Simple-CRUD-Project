import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Posting extends Component {
	constructor(props) {
	    super(props);
	   
	    this.state = {
	    	value:{}
	    };
	    
	    
	}
	
	componentDidMount(){
		var _value = null;
		var _bId = this.props.match.params.bId;
		
		 $.ajax({ 
		    	type:"GET", 
		    	url: '/react/read/'+_bId,
		    	dataType: "json", 
		    	cache : false, 
		    	success : function(resData)
		    	{ 
		    		
		    		_value = resData.post;
		    		
		    		
		    		var sysdate = new Date(_value.bDate);
				    _value.bDate = String(sysdate.getFullYear())+'/'+String(sysdate.getMonth()+1)+'/'+String(sysdate.getDate());
				   
		    		
		    		this.setState({
		    			value:_value
		    		});
		    	}.bind(this),
		    	error : function(request,status,error){
//		    		 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		    		 alert('Can\'t call data of posting');
		    	}
		    });
		
		 
		 
	}
	render() {
        return(
        	<div className="posting"> 
        	
        	<Card>
        	  <Card.Body>
        	    <Card.Title>Title : {this.state.value.bTitle}</Card.Title>
        	    <Card.Subtitle className="mb-2 text-muted">Writer : {this.state.value.bName}  Date : {this.state.value.bDate}</Card.Subtitle>
        	    <hr/>
        	    <Card.Text>
        	    {this.state.value.bContent}
        	    </Card.Text>
        	    <LinkContainer to="/react/read">  
        	    <Card.Link id="toList" > >>Back to the list of Postings</Card.Link>
        	    </LinkContainer>
        	  </Card.Body>
			</Card>
        	
        		
        	</div>
        );
    }
}

export default Posting;