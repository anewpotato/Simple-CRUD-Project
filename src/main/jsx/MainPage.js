import '../webapp/resources/css/custom.css';
 
import React, {Component} from 'react';
import ReactDOM from 'react-dom';




class MainPage extends Component {
	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	}
	
	 handleClick() {
		    console.log('this is:', this);
		    $.ajax({ 
		    	type:"GET", 
		    	url: '/react/json',
		    	dataType: "json", 
		    	cache : false, 
		    	success : function(resData)
		    	{ 
		    		alert(resData.name);
		    	
		    	},
		    	error : function(){
		    		alert("error!");
		    	}
		    });
	}
	 
    render() {
        return(
        <div className="main">
        <button onClick={this.handleClick}>눌렁!크크킄ㄱ</button>
        통신성공!
        </div>
        );
    }
 
}
export default MainPage;
//ReactDOM.render(<MainPage/>, document.getElementById('root'));