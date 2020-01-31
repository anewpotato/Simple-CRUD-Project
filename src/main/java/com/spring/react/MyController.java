package com.spring.react;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.react.dao.IDao;
import com.spring.react.dto.AdminDto;
import com.spring.react.dto.ContentDto;
import com.spring.react.dto.ReplyDto;

@Controller
public class MyController  {
 
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private AdminDto admin; // admin 로그인 정보를 가지는 객체를 bean을 통해 자동 주입
	
	//CSR을 위한 Index페이지 요청
	@RequestMapping(value = {"/index"})
    public String page( HttpServletRequest request) {       		
        
		// index 페이지 방문 시 session을 생성하여 interceptor에서 필터링 되지 않게한다.
        HttpSession session = request.getSession();
        session.setAttribute("jud", "Normal connection");
        
        
        return "page";
    }
	
	//특정 주소를 직접 접근 시 /index url로 redirection
	@RequestMapping(value = {"/postings/{id}","/postings","/posting","/update","/delete"}) 
    public String redirectURL() {
	 	
	 	return "redirect:/index";
       
    }
	
	//게시판 글 목록 요청
	@RequestMapping(value = "/postings", method = RequestMethod.GET, produces="application/json") 
    public @ResponseBody Object getReadContents() {
		
        IDao dao = sqlSession.getMapper(IDao.class);       
        Map<String, Object> retVal = new HashMap<String, Object>();
        ArrayList<ContentDto> list = new ArrayList<ContentDto>();
        list = dao.listDao();
        
        retVal.put("contents",list);
        
        return retVal;
       
    }
	
	 
	
	 //게시판의 특정 글 정보 요청, 최초에 한 번 댓글 리스트 요청
	@RequestMapping(value = "/postings/{id}", method = RequestMethod.GET, produces="application/json") 
    public @ResponseBody Object getReadContent(@PathVariable("id") final String id) {
	 	
	 	IDao dao = sqlSession.getMapper(IDao.class);
        Map<String, Object> retVal = new HashMap<String, Object>();
        ContentDto dto = new ContentDto();
        ArrayList<ReplyDto> r_dto = new ArrayList<ReplyDto>();
        
        dao.upHit(id); // 정보를 불러오기 전에 해당 게시글의 조회수를 올려준다.
        dto = dao.viewDao(id);
        r_dto = dao.r_listDao(id);
        
        retVal.put("post",dto);
        retVal.put("reply",r_dto);
       
        return retVal;
    }
	
	 
	 // 게시판의 특정 글에 속한 댓글 리스트의 별도 요청
	@RequestMapping(value = "/postings/reply/{id}", method = RequestMethod.GET) 
    public @ResponseBody Object getContentReply(@PathVariable("id") final String id){
        
	 	IDao dao = sqlSession.getMapper(IDao.class);
        Map<String, Object> retVal = new HashMap<String, Object>();    
        ArrayList<ReplyDto> r_dto = new ArrayList<ReplyDto>(); 
        
        r_dto = dao.r_listDao(id); 
        retVal.put("reply",r_dto);
       
        return retVal;
	 	
    }
	 
	//게시판의 수정을 위한 특정 글 정보 요청
	@RequestMapping(value = "/posting/{id}", method = RequestMethod.GET) 
	public @ResponseBody Object getUpdateContent(@PathVariable("id") final String id){
	 	
	 	IDao dao = sqlSession.getMapper(IDao.class);
	    Map<String, Object> retVal = new HashMap<String, Object>();
	    ContentDto dto = new ContentDto();
	    
	    dto = dao.viewDao(id);	    
	    retVal.put("post",dto);
	   
	    return retVal;
	 	
	}
	 
	 
	//게시판에 글 작성 정보 수신 후 DB에 추가
	@RequestMapping(value = "/posting", method = RequestMethod.POST)	
    public @ResponseBody void createContent(@RequestBody final ContentDto dto){
	  
		IDao dao = sqlSession.getMapper(IDao.class);
		
		dao.writeDao(dto.getbName(),dto.getbTitle(),dto.getbContent());      
    }
	 
 	//게시판에 글 수정 정보 수신 후 DB에 수정
	@RequestMapping(value = "/posting/{id}", method = RequestMethod.PUT)
	@ResponseBody
    public void updateContent(@PathVariable("id") final String id,@RequestBody final ContentDto dto){
	 
		 IDao dao = sqlSession.getMapper(IDao.class);
		 
		 dao.updateDao(dto.getbName(),dto.getbTitle(),dto.getbContent(),id);     
    }
		 
	//삭제할 글의 id값 수신 후 DB에서 삭제
	@RequestMapping(value = "/posting/{id}", method = RequestMethod.DELETE)
	@ResponseBody
    public void deleteContent(@PathVariable("id") final String id){
	 
		 IDao dao = sqlSession.getMapper(IDao.class);
		 
		 dao.deleteDao(id);   	
    }
		 
	//게시판의 특정 글에 대한 댓글 정보 수신 후 DB에 작성
	@RequestMapping(value = "/posting/reply/{id}", method = RequestMethod.POST) 
    public @ResponseBody void createReply(@PathVariable("id") final String id,@RequestBody final ReplyDto dto){
	 	
	 		IDao dao = sqlSession.getMapper(IDao.class);
	 		
	 		dao.writeReplyDao(dto.getrName(), dto.getrContent(), id,dto.getrPw());     
    }
		 
	// 특정 게시글에서 선택한 댓글의 비밀번호 정보를 전송
	@RequestMapping(value = "/posting/reply/password/{id}", method = RequestMethod.GET) 
    public @ResponseBody Map<String, Object> modifyReply(@PathVariable("id") final String id){
	 	 
	 		IDao dao = sqlSession.getMapper(IDao.class);
	 		ReplyDto dto = new ReplyDto();
	 		Map<String, Object> retVal = new HashMap<String, Object>();

	 		dto = dao.modifyReplyDao(id);       
	 		retVal.put("pw",dto);
        
	 		return retVal;      
    }
		 
	// 특정 게시글에서 댓글의 정보를 수정하기 위해 정보를 수신
	@RequestMapping(value = "/posting/reply/{id}", method = RequestMethod.PUT) 
    public @ResponseBody void modifyReply(@PathVariable("id") final String id,@RequestBody final ReplyDto dto){
	 	
	 		IDao dao = sqlSession.getMapper(IDao.class);
	 		
	 		dao.updateReplyDao(dto.getrName(), dto.getrContent(), id);      
    }
		 
	@RequestMapping(value = "/posting/reply/{id}", method = RequestMethod.DELETE)		 
    public @ResponseBody void deleteReply(@PathVariable("id") final String id){
		 
		 	IDao dao = sqlSession.getMapper(IDao.class);
		 	
		 	dao.deleteReplyDao(id);       
	 }

		 
	@RequestMapping(value = "/admin-info", method = RequestMethod.GET)		 
    public @ResponseBody Map<String, Object> getLogin() {
		 	
	 	String id = admin.getId();
	 	String pw = admin.getPw();
	 	
        Map<String, Object> retVal = new HashMap<String, Object>();
        
        retVal.put("id",id);
        retVal.put("pw",pw);
               
        return retVal;
    }
	 
	 
	
}