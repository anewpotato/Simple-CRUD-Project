package com.spring.react.dto;

import java.sql.Timestamp;

public class ContentDto { // 게시판의 정보를 저장할 커맨드 객체
	
	private int bId;
	private String bName;
	private String bTitle;
	private String bContent;
	private Timestamp bDate;
	private int bHit;

	
	public ContentDto(){}

	
	public ContentDto(int bId, String bName, String bTitle,String bContent, Timestamp bDate, int bHit) {
		this.bId = bId;
		this.bName = bName;
		this.bTitle = bTitle;
		this.bContent = bContent;
		this.bDate = bDate;
		this.bHit = bHit;
		
	}


	public String getbContent() {
		return bContent;
	}


	public void setbContent(String bContent) {
		this.bContent = bContent;
	}


	public int getbId() {
		return bId;
	}

	public void setbId(int bId) {
		this.bId = bId;
	}

	public String getbName() {
		return bName;
	}

	public void setbName(String bName) {
		this.bName = bName;
	}

	public String getbTitle() {
		return bTitle;
	}

	public void setbTitle(String bTitle) {
		this.bTitle = bTitle;
	}

	public Timestamp getbDate() {
		return bDate;
	}

	public void setbDate(Timestamp bDate) {
		this.bDate = bDate;
	}

	public int getbHit() {
		return bHit;
	}

	public void setbHit(int bHit) {
		this.bHit = bHit;
	}

	
	
}

