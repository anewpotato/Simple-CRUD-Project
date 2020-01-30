package com.spring.react.dto;

import java.sql.Timestamp;

public class ReplyDto { // 댓글 정보를 저장하는 커맨드 객체
	private int rId;
	private String rName;
	private String rContent;
	private Timestamp rDate;
	private String rPw;
	
	public String getrPw() {
		return rPw;
	}

	public void setrPw(String rPw) {
		this.rPw = rPw;
	}

	public ReplyDto() {}
	
	public int getrId() {
		return rId;
	}
	public void setrId(int rId) {
		this.rId = rId;
	}
	public String getrName() {
		return rName;
	}
	public void setrName(String rName) {
		this.rName = rName;
	}
	public String getrContent() {
		return rContent;
	}
	public void setrContent(String rContent) {
		this.rContent = rContent;
	}
	public Timestamp getrDate() {
		return rDate;
	}
	public void setrDate(Timestamp rDate) {
		this.rDate = rDate;
	}
	
}
