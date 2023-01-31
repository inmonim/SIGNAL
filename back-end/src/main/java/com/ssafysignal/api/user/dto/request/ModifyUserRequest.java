package com.ssafysignal.api.user.dto.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class ModifyUserRequest {
	String name;
	String nickname;
	String phone;
	LocalDateTime birth;
	ProfileImageFile profileImageFile; 
	
	@Builder
	public ModifyUserRequest(String name, String nickname, String phone, LocalDateTime birth,
							 ProfileImageFile profileImageFile) {
		this.name = name;
		this.nickname = nickname;
		this.phone = phone;
		this.birth = birth;
		this.profileImageFile = profileImageFile;
	}
	
	
	
}
