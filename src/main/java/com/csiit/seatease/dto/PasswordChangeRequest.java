package com.csiit.seatease.dto;

public class PasswordChangeRequest {
	private String username;
	private String password;
	private String newPassword;
	private String repeatNewPassword;
	
	public PasswordChangeRequest() {
		// TODO Auto-generated constructor stub
	}


	public PasswordChangeRequest(String username, String password, String newPassword, String repeatNewPassword) {
		super();
		this.username = username;
		this.password = password;
		this.newPassword = newPassword;
		this.repeatNewPassword = repeatNewPassword;
	}


	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public String getNewPassword() {
		return newPassword;
	}


	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}


	public String getRepeatNewPassword() {
		return repeatNewPassword;
	}

	public void setRepeatNewPassword(String repeatNewPassword) {
		this.repeatNewPassword = repeatNewPassword;
	}
}
