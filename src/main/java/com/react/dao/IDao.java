package com.react.dao;

import java.util.ArrayList;

import com.spring.react.dto.ContentDto;
import com.spring.react.dto.ReplyDto;

public interface IDao {
	
	public ArrayList<ContentDto> listDao();
	public ArrayList<ReplyDto> r_listDao(String bId);
	public void writeDao(String mWriter,String mTitle, String mContent);
	public void writeReplyDao(String mWriter,String mContent, String bId);
	public void upHit(String bId);
	public void updateDao(String mWriter,String mTitle, String mContent,String bId);
	public ContentDto viewDao(String strID);
	public void deleteDao(String bId);
	
}
