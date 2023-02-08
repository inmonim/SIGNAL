package com.ssafysignal.api.signalweek.dto.response;

import com.ssafysignal.api.project.repository.ProjectRepository;
import com.ssafysignal.api.signalweek.entity.Signalweek;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@ApiModel(value = "SignalweekFindAllResponseItem", description = "시그널 위크 프로젝트 목록 아이템 response")
public class SignalweekFindAllResponseItem {

    @Schema(description = "signalweekSeq")
    private Integer singalweekSeq;

    @Schema(description = "시그널 위크 프로젝트 title")
    private String subject;

    @Schema(description = "프로젝트 대표 이미지 url")
    private String projectImageUrl;


    public static SignalweekFindAllResponseItem fromEntity(final Signalweek signalweek) {
        return SignalweekFindAllResponseItem.builder()
                .singalweekSeq(signalweek.getSignalweekSeq())
                .subject(signalweek.getTitle())
                .projectImageUrl(signalweek.getProject().getImageFile().getUrl())
                .build();
    }
}
