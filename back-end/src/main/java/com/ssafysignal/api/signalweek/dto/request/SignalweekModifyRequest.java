package com.ssafysignal.api.signalweek.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ApiModel(value = "SignalweekRegistRequest", description = "시그널 위크 등록 정보")
public class SignalweekModifyRequest {
    
    
    // 미사용
    
    
    
    @Schema(name = "타이틀")
    private String title;

    @Schema(name = "ucc URL")
    private String uccUrl;

    @Schema(name = "배포용 페이지 URL")
    private String deployUrl;

    @Schema(name = "내용")
    private String content;

    // ppt

    @Schema(name = "파일명")
    private String pptName;

    @Schema(name = "파일 크기")
    private Integer pptSize;

    @Schema(name = "URL")
    private String pptUrl;

    // readme

    @Schema(name = "파일명")
    private String readmeName;

    @Schema(name = "파일 크기")
    private Integer readmeSize;

    @Schema(name = "URL")
    private String readmeUrl;
}
