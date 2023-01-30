package com.ssafysignal.api.user.dto.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class ModifyUserReq {
	String name;
	String nickname;
	String phone;
	int birthYear;
	int birthMonth;
	int birthDay;
	ProfileImageFile profileImageFile; 
	
	@Builder
	public ModifyUserReq(String name, String nickname, String phone, int birthYear, int birthMonth, int birthDay,
			ProfileImageFile profileImageFile) {
		this.name = name;
		this.nickname = nickname;
		this.phone = phone;
		this.birthYear = birthYear;
		this.birthMonth = birthMonth;
		this.birthDay = birthDay;
		this.profileImageFile = profileImageFile;
	}
	
	
	
}
