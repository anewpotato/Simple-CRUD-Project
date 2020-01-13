import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Read extends Component {
	constructor(props) {
	    super(props);
	   
	    this.state = {
	    	values:[]
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
	
	
	
	render() {
		  
		  var contentList = this.state.values.map((_content,_index) => ( 
		  																
				  														<ListGroup horizontal key={_index}>
		  																<ListGroup.Item className="content_writer">{_content.bName}</ListGroup.Item>
		  																<LinkContainer to={`/react/read/${_content.bId}`}>
		  																<ListGroup.Item className="content_title"><a href="/" >{_content.bTitle}</a></ListGroup.Item>
		  																</LinkContainer>
		  																<ListGroup.Item className="content_date">{_content.bDate}</ListGroup.Item>
		  																<ListGroup.Item className="content_hit">{_content.bHit}</ListGroup.Item>
		  																</ListGroup>));
		  
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