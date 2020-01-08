package com.spring.react;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyController {
 
	@RequestMapping(value = "/{name}.html", method = RequestMethod.GET)
    public String page(@PathVariable String name, Model model) {
        model.addAttribute("pageName", name);
       
        return "page";
    }
	
	 @RequestMapping(value = "/json", method = RequestMethod.GET)
	    @ResponseBody
	    public TestModel getJson() {
	        TestModel testModel = new TestModel("æ»≥Á«œººø‰");
	        
	        return testModel;
	    }
	 
	 
	
}