package com.ssafysignal.api.auth.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@ApiModel(value = "FindEmailRequest", description = "이름, 전화번호를 이용해 이메일을 찾기 위한 정보")
public class FindEmailRequest {
    @Schema(description = "사용자 이름", example = "박싸피", required = true)
    private String name;
    @Schema(description = "사용자 전화번호", example = "010-1111-1111", required = true)
    private String phone;
}
