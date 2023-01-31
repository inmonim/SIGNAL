package com.ssafysignal.api.user.dto.request;

import lombok.*;

import java.time.LocalDateTime;

@Data
public class RegistUserRequest {
	private String name;
	private String email;
	private String password;
	private String nickname;
	private String phone;
	private LocalDateTime birth;
}
