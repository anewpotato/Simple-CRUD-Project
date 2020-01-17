import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';

class Posting extends Component {
	constructor(props) {
	    super(props);
	   
	    this.state = {
	    	value:{},
	    	reply:[],
	    	write_reply:{
	    		rName:'',
	    		rContent:''
	    	},
	    	isReplied:'false'
	    };
	    
	    
	}
	shouldComponentUpdate(nextProps,nextState){
		if(this.state.isReplied !== nextState.isReplied){
			
			var _rValue = [];
			var _bId = this.props.match.params.bId;
			
			 $.ajax({ 
			    	type:"GET", 
			    	url: '/react/read/reply/'+_bId,
			    	dataType: "json", 
			    	cache : false, 
			    	success : function(resData)
			    	{ 
			    		
			    		
			    		_rValue = resData.reply;
			    		
			    		
					    $.each(_rValue, function( index, value ) {
							  var sysdate = new Date(value.rDate);
							  value.rDate = String(sysdate.getFullYear())+'/'+String(sysdate.getMonth()+1)+'/'+String(sysdate.getDate());
							});
					    this.writerInput.value = '';
						 this.contentInput.value = '';
			    		this.setState({
			    			
			    			reply:_rValue
			    		});
			    		
			    	}.bind(this),
			    	error : function(request,status,error){
//			    		 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
			    		 alert('Can\'t call data of posting');
			    	}
			    });	
			 
		}
		
		 return true;
	}
	
	componentDidMount(){
		var _value = null;
		var _rValue = [];
		var _bId = this.props.match.params.bId;
		
		 $.ajax({ 
		    	type:"GET", 
		    	url: '/react/read/'+_bId,
		    	dataType: "json", 
		    	cache : false, 
		    	success : function(resData)
		    	{ 
		    		
		    		_value = resData.post;
		    		_rValue = resData.reply;
		    		
		    		var sysdate = new Date(_value.bDate);
				    _value.bDate = String(sysdate.getFullYear())+'/'+String(sysdate.getMonth()+1)+'/'+String(sysdate.getDate());
				   
				    $.each(_rValue, function( index, value ) {
						  var sysdate = new Date(value.rDate);
						  value.rDate = String(sysdate.getFullYear())+'/'+String(sysdate.getMonth()+1)+'/'+String(sysdate.getDate());
						});
				  
		    		this.setState({
		    			value:_value,
		    			reply:this.state.reply.concat(_rValue)
		    		});
		    		
		    	}.bind(this),
		    	error : function(request,status,error){
//		    		 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		    		 alert('Can\'t call data of posting');
		    	}
		    });	 
	}
	
	 handleChange() {
		 
		 this.setState({		      
			 write_reply:{
		    	  rName:this.writerInput.value,
		    	  rContent:this.contentInput.value
		      }
		 });
	 }
	 
	 sendReply(){
		 var _bId = this.props.match.params.bId;
		 $.ajax({ 
		    	type:"POST", 
		    	url: "/react/create/reply/"+_bId,
		    	contentType: "application/json",
		    	data : JSON.stringify(this.state.write_reply),
		    	cache : false, 
		    	success : function()
		    	{ 
		    		if(this.state.isReplied==='false'){
		    		this.setState({
		    			isReplied:'true'
		    		});
		    		}else{
		    			this.setState({
			    			isReplied:'false'
			    		});
		    		}
		    		alert('Reply is success!');
		    		
		    		
		    		
		    	}.bind(this),
		    	error : function(request,status,error){
//		    		 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		    		 alert('Can\'t create a posting');
		    	}
		    });
	 }
	render() {
		 var replyList = this.state.reply.map((_content,_index) => ( 
				 		<div key={_index}>
				 		<Card.Subtitle><p><strong>{_content.rName}</strong></p></Card.Subtitle>
				 		<Card.Subtitle className="mb-2 text-muted">{_content.rDate}</Card.Subtitle>
				 		 <Card.Text>{_content.rContent} </Card.Text>
				 		 <div >
				 		 	Modify    Delete
				 		 </div>
				 		 <hr id ="replyHr"/>
				 		
				 		</div>
				 		
					));
        return(
        	<div className="posting"> 
        	{console.log(this.state.write_reply)}
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
			
			<Accordion >
			  <Card bg="light">
			    <Card.Header>
			      <Accordion.Toggle as={Button} variant="link" eventKey="0">
			       >See the reply of this post
			      </Accordion.Toggle>
			    </Card.Header>
			    <Accordion.Collapse eventKey="0">
			     <Card.Body>
			     {replyList}
			     </Card.Body>
	
			    </Accordion.Collapse>
			    
			    <div className="reply">
			    <h5>Reply</h5>
				<InputGroup  className="replyDiv">
					<InputGroup.Prepend>
				 		<InputGroup.Text >Writer</InputGroup.Text>
	
			 		</InputGroup.Prepend>
			 		<FormControl
			 			ref={(input) => { this.writerInput = input; }}
			 			onChange={() => {this.handleChange()}}
			 			placeholder = 'Write your Name'
			 		  />
			 		 </InputGroup>
			 		<InputGroup className="replyDiv">
					<InputGroup.Prepend>
				 		<InputGroup.Text >Content</InputGroup.Text>
	
			 		</InputGroup.Prepend>
			 		<FormControl
			 			as="textarea"
			 			ref={(input) => { this.contentInput = input; }}
			 	    	onChange={() => {this.handleChange()}}
			 			placeholder = 'Write a Content'
			 		  />
			 		 </InputGroup>
			 		<ButtonToolbar >
			 		<div className="replyBtn">
			 		<Button onClick={()=>{this.sendReply()}} variant="outline-primary" type="submit">
			 		  Write</Button>
			 		  </div>
			 		 </ButtonToolbar>
			    </div>
			  </Card>
			  
		
			</Accordion>
        	
        		
        	</div>
        );
    }
}

export default Posting;