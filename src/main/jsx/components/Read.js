import React, {Component}from 'react'; 
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';


class Read extends Component {
	constructor(props) {
	    super(props);
	   
	    this.state = {
	    	values:[],
	    	show:'false',
	    	selectedItem:null,
	    	isDeleted:'false'
	    };
	    
	    
	}
	
	
	
	componentDidMount(){
		var _values=[];
		 $.ajax({ 
		    	type:"GET", 
		    	url: '/react/read',
		    	dataType: "json", 
		    	cache : false, 
		    	success : function(resData)
		    	{ 
		    		_values = resData.contents;
		    		
		    		$.each(_values, function( index, value ) {
						  var sysdate = new Date(value.bDate);
						  value.bDate = String(sysdate.getFullYear())+'/'+String(sysdate.getMonth()+1)+'/'+String(sysdate.getDate());
						});
		    		
		    		this.setState({
		    			values:this.state.values.concat(_values)
		    		});
		    	}.bind(this),
		    	error : function(request,status,error){
//		    		 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		    		 alert('Can\'t call data of board');
		    	}
		    });
		
		 
		 
	}
	shouldComponentUpdate(nextProps, nextState){
		
		if(this.state.values !== nextState.values){
			return true
		}else{
		return false
		}
	}
	
	deleteContent(_bId){
		
		console.log(_bId);
		 $.ajax({ 
		    	type:"DELETE", 
		    	url: '/react/delete/'+_bId,
		    	
		    	cache : false, 
		    	success : function()
		    	{ 
		    		this.setState({
		    			isDeleted:'true'
		    		});
		    		alert('Delete is completed!!');
		    	}.bind(this),
		    	error : function(request,status,error){
		    		 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		    		 alert('Can\'t call data of posting');
		    	}
		    });	
		 
		 
	}
	
	
	setShow(_index){
		
		this.setState({
			selectedItem:_index
		});
		if(this.state.show==='false'){
		this.setState({
			show:'true'
		});
		}else{
			this.setState({
				show:'false'
			});
		}
	}
	
	
	
	render() {
		
		  var contentList = this.state.values.map((_content,_index) => ( 
				  														
																		  
																		<div key={_index}>
				  														<ListGroup horizontal  >
		  																<ListGroup.Item className="content_writer">{_content.bName}</ListGroup.Item>
		  																{this.props.mode==='read'&&<LinkContainer to={`/react/read/${_content.bId}`}>
		  																<ListGroup.Item className="content_title"><a href="/" >{_content.bTitle}</a></ListGroup.Item>
		  																</LinkContainer>
		  																}
		  																{this.props.mode==='update'&&<LinkContainer to={`/react/update/${_content.bId}`}>
		  																<ListGroup.Item className="content_title"><a href="/" >{_content.bTitle}</a></ListGroup.Item>
		  																</LinkContainer>
		  																}
		  																{this.props.mode==='delete'&&
		  																<ListGroup.Item className="content_title"><a href="/" onClick={(e) => {e.preventDefault();this.setShow({_index})  
		  												                }}>{_content.bTitle}</a></ListGroup.Item>
		  																
		  																}
		  																
		  																 
		  																
		  																<ListGroup.Item className="content_date">{_content.bDate}</ListGroup.Item>
		  																<ListGroup.Item className="content_hit">{_content.bHit}</ListGroup.Item>
		  																</ListGroup>
		  																
		  																 {(this.props.mode==='delete'&&this.state.show==='true'&& _index ===this.state.selectedItem._index) && 
		  																	 
		  																<Alert variant="warning">
		  																 
		  													             <p>
		  													               Are you sure to delete <strong>{_content.bTitle}</strong>?
		  													             </p>
		  													             <hr />
		  													             <div id="delete_button">
			  															
		  													           <Button onClick={() => {this.deleteContent(_content.bId)}} variant="outline-secondary">
		  													            Delete
		  													          </Button>
		  													            
		  													            </div>
		  													           </Alert>
		  													         
		  													           }
		  																</div>
		  																
		  																));
		  
		
		  
		
		
		
        return(
        	<div className="read"> 
        	{(this.props.mode ==='update' || this.props.mode ==='delete')&& <h2>{this.props.desc}</h2>}
        	<Card className="post" >
			  <Card.Header >Postings</Card.Header>
			  <ListGroup horizontal >
			  <ListGroup.Item style={{flex:'1'}}>Writer</ListGroup.Item>
			  <ListGroup.Item style={{flex:'5'}}>Title</ListGroup.Item>
			  <ListGroup.Item style={{flex:'1'}}>Date</ListGroup.Item>
			  <ListGroup.Item style={{flex:'1'}}>Views</ListGroup.Item>			  
			  </ListGroup>
			</Card>
        	 {contentList}
        	 
        	{this.props.mode ==='read' && <h2>{this.props.desc}</h2>}
        	
        		
        	</div>
        );
    }
}

export default Read;