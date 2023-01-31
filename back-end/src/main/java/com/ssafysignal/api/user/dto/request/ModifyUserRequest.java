package com.ssafysignal.api.user.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.common.entity.ImageFile;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel(value = "ModifyUserRequest", description = "회원 수정 정보")
public class ModifyUserRequest {
	@Schema(description = "사용자 이름")
	private String name;
	@Schema(description = "닉네임")
	private String nickname;
	@Schema(description = "전화번호")
	private String phone;
	@Schema(description = "생년월일", example = "2023-01-01 11:59:59.999")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
	private LocalDateTime birth;
	@Schema(description = "사용자 프로필 이미지")
	private ImageFile profileImageFile;
}
