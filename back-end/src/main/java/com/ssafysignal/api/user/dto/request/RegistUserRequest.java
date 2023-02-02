package com.ssafysignal.api.user.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel(value = "RegistUserRequest", description = "회원 가입 정보")
public class RegistUserRequest {
	@Schema(description = "사용자 이름")
	private String name;
	@Schema(description = "이메일")
	private String email;
	@Schema(description = "비밀번호")
	private String password;
	@Schema(description = "닉네임")
	private String nickname;
	@Schema(description = "전화번호")
	private String phone;
	@Schema(description = "생년월일", example = "2023-01-01")
	private String birth;
}
