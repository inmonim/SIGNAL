package com.ssafysignal.api.signalweek.dto.response;

import com.ssafysignal.api.signalweek.entity.Signalweek;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

public class SignalweekRankFindAllResponseItem {

    @Schema(description = "signalweekSeq")
    private Integer singalweekSeq;

    @Schema(description = "시그널 위크 프로젝트 title")
    private String subject;

    @Schema(description = "프로젝트 대표 이미지 url")
    private String projectImageUrl;

    @Schema(description = "랭킹")
    private Integer rank;


//    @Builder
//    public static SignalweekRankFindAllResponseItem(final Signalweek signalweek) {
//        return SignalweekFindAllResponseItem.builder()
//                .singalweekSeq(signalweek.getSignalweekSeq())
//                .projectImageUrl(signalweek.getProject().getImageFile().getUrl())
//                .subject(signalweek.getTitle())
//                .rank()
//                .build();

//    }
}
