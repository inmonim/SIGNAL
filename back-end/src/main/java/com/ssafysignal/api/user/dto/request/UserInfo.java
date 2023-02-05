package com.ssafysignal.api.user.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel(value = "ModifyUserRequest", description = "회원 수정 정보")
public class UserInfo {

	@Schema(description = "닉네임")
	private String nickname;
	@Schema(description = "전화번호")
	private String phone;
	@Schema(description = "사용자 프로필 이미지")
	private MultipartFile profileImageFile;
}
