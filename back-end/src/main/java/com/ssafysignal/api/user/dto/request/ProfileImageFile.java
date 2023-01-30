package com.ssafysignal.api.user.dto.request;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter
@ToString
public class ProfileImageFile {
	String name;
	long size;
	String type;
	String url;
	LocalDateTime reg_dt;
	
	@Builder
	public ProfileImageFile(String name, long size, String type, String url, LocalDateTime reg_dt) {
		this.name = name;
		this.size = size;
		this.type = type;
		this.url = url;
		this.reg_dt = reg_dt;
	}
	
	
}
