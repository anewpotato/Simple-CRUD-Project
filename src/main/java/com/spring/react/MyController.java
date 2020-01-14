package com.spring.react;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.react.dao.IDao;
import com.spring.react.dto.ContentDto;

@Controller
public class MyController {
 
	@Autowired
	private SqlSession sqlSession;
	
	//CSR을 위한 Index페이지 요청
	@RequestMapping(value = "/index", method = RequestMethod.GET)
    public String page( Model model) {
        model.addAttribute("pageName", "index");
       
        return "page";
    }
	
	//게시판 글 목록 요청
	 @RequestMapping(value = "/read", method = RequestMethod.GET) 
	    public @ResponseBody Object getReadContents() {
	        IDao dao = sqlSession.getMapper(IDao.class);
	        Map<String, Object> retVal = new HashMap<String, Object>();
	        ArrayList<ContentDto> list = new ArrayList<ContentDto>();
	        list = dao.listDao();
	        retVal.put("contents",list);
	       
	        return retVal;
	    }
	 //게시판의 특정 글 정보 요청
	 @RequestMapping(value = "/read/{id}", method = RequestMethod.GET) 
	    public @ResponseBody Object getReadContent(@PathVariable("id") final String id) {
	        IDao dao = sqlSession.getMapper(IDao.class);
	        Map<String, Object> retVal = new HashMap<String, Object>();
	        ContentDto dto = new ContentDto();
	        dao.upHit(id); // 정보를 불러오기 전에 해당 게시글의 조회수를 올려준다.
	        dto = dao.viewDao(id);
	        
	        retVal.put("post",dto);
	       
	        return retVal;
	    }
	 
	 
	 //게시판에 글 작성 정보 수신
	 @RequestMapping(value = "/create", method = RequestMethod.POST)
	 @ResponseBody
	    public void createContent(@RequestBody final ContentDto dto) {
		 IDao dao = sqlSession.getMapper(IDao.class);
		 dao.writeDao(dto.getbName(),dto.getbTitle(),dto.getbContent());

	       
	       
	    }
	 
	 
	
}