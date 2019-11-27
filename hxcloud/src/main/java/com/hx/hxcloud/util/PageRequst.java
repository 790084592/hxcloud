package com.hx.hxcloud.util;

/**
 * 
 * @author 小-火
 *
 */
public class PageRequst {
	private int pageIndex, pageSize;
	
	public PageRequst(int pageIndex, int pageSize) {
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
	}

	public int getIndex() {
		return (pageIndex - 1)*pageSize;
	}
	
	public int getEnd() {
		return (pageIndex - 1)*pageSize;
	}
}
