<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>



<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

</head>
<body>


<script>
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

</script>

</body>
</html>