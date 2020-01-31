import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

class Posting extends Component {
	constructor(props) {
	    super(props);
	   
	    this.state = {
	    	value:{}, // 해당 게시글의 정보가 저장되는 state
	    	reply:[], // 해당 게시글의 댓글 정보가 저장되는 state
	    	write_reply:{ // 사용자가 작성하는 댓글의 정보가 저장되는 state
	    		rName:'',
	    		rPw:'',
	    		rContent:''
	    	},modify_reply:{ // 사용자가 댓글을 수정 시 작성하는 정보가 저장되는 state
	    		rName:'',
	    		rPw:'',
	    		rContent:''
	    	},
	    	delete_reply:'', // 댓글의 비밀번호와 사용자가 입력한 비밀번호를 비교하기 위한 state
	    	isReplied:'false', // 댓글 작성 여부를 관리하는 토글 state
	    	modifyPw:'', // 특정 댓글의 비밀번호 정보가 저장되는 state
	    	selectedReply:0, // 선택한 댓글의 고유 번호가 저장되는 state
	    	show:'false', // 댓글 삭제 시 Alert 컴포넌트를 표시하기 위한 상태를 관리하는 토글 state
	    	isDeleted:'false' // 댓글 삭제 여부를 관리하는 토글 state
	    	
	    };
	    
	    
	}
	
	shouldComponentUpdate(nextProps,nextState){
		// 댓글이 달리거나 삭제되었을 경우 해당 컴포넌트의 render를 다시 호출하면서 변경된 정보를 서버와 통신으로 가져온다.
		if(this.state.isReplied !== nextState.isReplied || this.state.isDeleted !== nextState.isDeleted){
			
			var _rValue = [];
			var _bId = this.props.match.params.bId;			
			 $.ajax({ 
			    	type:"GET", // 게시물의 댓글을 가져오므로 GET type
			    	url: '/react/postings/reply/'+_bId, // 서버에 요청하는 URL, @pathvariable 어노테이션을 이용해 해당 게시글의 고유 번호를 조회한다.
			    	dataType: "json", 
			    	cache : false, 
			    	success : function(resData)
			    	{ 
			    		// 댓글의 정보들이 저장됨
			    		_rValue = resData.reply;
			    		// 댓글의 정보에서 Timestamp로 지정되어 있는 rDate의 포맷을 변경 후 저장			    		
					    $.each(_rValue, function( index, value ) {
							  var sysdate = new Date(value.rDate);
							  value.rDate = String(sysdate.getFullYear())+'/'+String(sysdate.getMonth()+1)+'/'+String(sysdate.getDate());
							});
					    
					    // 댓글 정보를 state에 set 해준다.
			    		this.setState({			    			
			    			reply:_rValue
			    		});			    		
			    	}.bind(this)
			    });				 
		}		
		 return true;
	}
	
	componentDidMount(){
		var _value = null;
		var _rValue = [];
		var _bId = this.props.match.params.bId;
		// 초기 실행 시 해당 게시글의 정보와 댓글 정보를 서버로부터 받아온다. 
		 $.ajax({ 
		    	type:"GET", 
		    	url: '/react/postings/'+_bId,
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
		    		 alert('Can\'t call data of posting');
		    	}
		    });	 
	}
	
	 handleChange() { // 댓글 작성 시 입력값을 관리하는 메소드		 
		 this.setState({		      
			 write_reply:{
		    	  rName:this.writerInput.value,
		    	  rPw:this.pwInput.value,
		    	  rContent:this.contentInput.value
		      }
		 });
	 }
	 
	 handleModifyChange = (input,_index) => (e) => { // 수정 시 사용자의 입력값을 관리하는 메소드
		 if(_index !== this.state.selectedReply){ // 수정을 선택한 댓글과는 다른 댓글을 수정하려고 할 경우 
			 this.setState({
				 modify_reply:{
					 rName:'',
					 rPw:'',
					 rContent:''
				 }
			 });
			 alert('Please typing on the reply that you selected...');
		 }else{ // 수정을 선택한 댓글을 수정 할 경우
			 this.setState({ // 수정하기 위한 입력값을 state에 set해준다.		      
				 modify_reply:{
					 ...this.state.modify_reply,
					 [input]:e.target.value	    	
			      }
			 });
		 }		 
	 }
	 
	 handleDeleteChange = (e) => { // 삭제를 위한 비밀번호 입력값을 관리하는 메소드
			 this.setState({		      
				 delete_reply:e.target.value
			 });
	 }
	 
	 sendReply(){ // 작성된 댓글을 서버에 전송하는 메소드
		 var _bId = this.props.match.params.bId;
		 $.ajax({ 
		    	type:"POST", // 새로운 게시글을 작성하므로 POST type
		    	url: "/react/posting/reply/"+_bId,
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
	    		
		    	}.bind(this)
		    });
	 }
	 
	 getReply(_rId){ // 사용자가 선택한 댓글의 비밀번호 정보를 서버로부터 가져오는 메소드		
		 $.ajax({ 
		    	type:"GET", 
		    	url: "/react/posting/reply/password/"+_rId,
		    	Type: "json",	    	
		    	cache : false, 
		    	success : function(resData)
		    	{ 
		    		this.setState({ // 가져온 비밀번호 정보를 state에 set해준다.
		    			modifyPw:resData.pw.rPw
		    		});
		    		if(this.state.show==='false'){
		    			this.setState({
			    			show:'true'
			    		});
		    		}    		
		    	}.bind(this)
		    });
	 }
	 
	 modifyReply(_rId){	// 사용자가 입력한 값을 기반으로 댓글을 수정하는 메소드	
		 if(this.state.modifyPw === this.state.modify_reply.rPw){ // 사용자가 입력한 비밀번호와 서버로부터 받아온 비밀번호가 일치하는 경우에만 수정이 가능
			 $.ajax({ 
		    	type:"PUT", // 일부분만을 수정하는 경우 PUT type 사용 
		    	url: "/react/posting/reply/"+_rId,
		    	contentType: "application/json",
		    	data : JSON.stringify(this.state.modify_reply),
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
		    		alert('Reply is modified!!');    		
		    	}.bind(this)
		    });
		 }else{
			 alert('Different Password!');
		 }
	 }
	 
	 deleteReply(_rId){ // 댓글을 삭제하는 메소드		
		 if(this.state.delete_reply ===this.state.modifyPw){ // 사용자가 입력한 비밀번호 정보와 서버로부터 가져온 비밀번호가 일치하는 경우 삭제가 가능
		 $.ajax({ 
		    	type:"DELETE", 
		    	url: '/react/posting/reply/'+_rId,	    	
		    	cache : false, 
		    	success : function()
		    	{   		
		    		if(this.state.isDeleted ==='false'){
			    		this.setState({
			    			isDeleted:'true',
			    			
			    		});
			    		}else if(this.state.isDeleted ==='true'){
				    		this.setState({
				    			isDeleted:'false',			    			
				    		});
				    }
		    		this.setState({
		    			show:'false',		    			
		    		});
		    		alert('The reply is deleted!!!');
		    	}.bind(this)
		    });
		 }else if(this.state.delete_reply !==this.state.modifyPw){
			 alert('Different Password!!');
		 }		 
	}
	 
	render() { 
		 var replyList = this.state.reply.map((_content,_index) => ( 
				 		<div key={_index}>
				 		<Card.Subtitle><p><strong>{_content.rName}</strong></p></Card.Subtitle>
				 		<Card.Subtitle className="mb-2 text-muted">{_content.rDate}</Card.Subtitle>
				 		 <Card.Text>{_content.rContent} </Card.Text>
				 		 <div >
				 		<Accordion>
						  <Card bg="light" >
						    <Card.Header>
						      <Accordion.Toggle as={Button} variant="link" eventKey="1" onClick={()=>{this.setState({selectedReply:_index});this.getReply(_content.rId)}}>
						       Modify
						      </Accordion.Toggle>
							  <Accordion.Toggle as={Button} variant="link" eventKey="2" onClick={()=>{this.setState({selectedReply:_index});this.getReply(_content.rId)}}>
						       Delete
							  </Accordion.Toggle>

						    </Card.Header>
						    <Accordion.Collapse eventKey="1">
						     <Card.Body>
						     <div className="reply">
							    
								<InputGroup  className="replyDiv">
									<InputGroup.Prepend>
								 		<InputGroup.Text >Writer</InputGroup.Text>
					
							 		</InputGroup.Prepend>
							 		<FormControl
							 			
							 			name="rName"
							 			onChange={this.handleModifyChange("rName",_index)}
							 			placeholder = 'Write your Name'
							 		  />
							 		 </InputGroup>
							 		<InputGroup  className="replyDiv">
									<InputGroup.Prepend>
								 		<InputGroup.Text >Password</InputGroup.Text>
					
							 		</InputGroup.Prepend>
							 		<FormControl
							 			type="password"
							 			name="rPw"
							 			onChange={this.handleModifyChange("rPw",_index)}
							 			placeholder = 'Write your Password'
							 		  />
							 		 </InputGroup>
							 		<InputGroup className="replyDiv">
									<InputGroup.Prepend>
								 		<InputGroup.Text >Content</InputGroup.Text>
					
							 		</InputGroup.Prepend>
							 		<FormControl
							 			as="textarea"
							 			name="rContent"
							 	    	onChange={this.handleModifyChange("rContent",_index)}
							 			placeholder = 'Write a Content'
							 		  />
							 		 </InputGroup>
							 		<ButtonToolbar >
							 		<div>
							 		<Button onClick={()=>{this.modifyReply(_content.rId)}} variant="outline-primary" type="submit">
							 		  Write</Button>
							 		  </div>
							 		 </ButtonToolbar>
							    </div>
						     </Card.Body>
				
						    </Accordion.Collapse>
						    
						    <Accordion.Collapse eventKey="2">
						    
						     <Card.Body>
						     <InputGroup  className="replyDiv">
								<InputGroup.Prepend>
							 		<InputGroup.Text >Password</InputGroup.Text>
				
						 		</InputGroup.Prepend>
						 		<FormControl
						 			type="password"
						 			name="rPw"
						 			onChange={this.handleDeleteChange}
						 			placeholder = 'Write your Password'
						 		  />
						 		 </InputGroup>
						     {this.state.show==='true'&&
						       <div >
						       <Alert variant="warning">
								 
					             <p>
					               Are you sure to delete this reply?
					             </p>
					             <hr />
					            <div id="delete_button">
								
					           <Button onClick={() => {this.deleteReply(_content.rId)}} variant="outline-secondary">
					            Delete
					          </Button>
					            
					            </div>
					           </Alert>
								
							   </div>
						     }
						     </Card.Body>
						    
						    </Accordion.Collapse>
						    
						    </Card>
				 		 	</Accordion>
				 		 </div>
				 		 <hr id ="replyHr"/>
						 
				 		
				 		</div>
				 		
					));
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
        	    <LinkContainer to="/react/postings">  
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
			 		<InputGroup  className="replyDiv">
					<InputGroup.Prepend>
				 		<InputGroup.Text >Password</InputGroup.Text>
	
			 		</InputGroup.Prepend>
			 		<FormControl
			 			type="password"
			 			ref={(input) => { this.pwInput = input; }}
			 			onChange={() => {this.handleChange()}}
			 			placeholder = 'Write your Password'
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