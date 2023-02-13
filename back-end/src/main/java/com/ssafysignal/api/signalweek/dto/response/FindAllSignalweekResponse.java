package com.ssafysignal.api.signalweek.dto.response;

import com.ssafysignal.api.signalweek.entity.Signalweek;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Data
@ApiModel(value = "FindAllSignalweekResponse", description = "시그널 위크 프로젝트 목록 조회 response")
public class FindAllSignalweekResponse {
    @Schema(description = "시그널 위크 스케쥴별 랭킹 목록", required = true)
    private List<FindAllSignalweekResponseItem> signalweekList;
    @Schema(description = "시그널 위크 페이지 수", required = true)
    private Integer signalweekTotalPage;
    @Schema(description = "시그널 위크 항목 수", required = true)
    private Long signalweekTotalElement;

    private FindAllSignalweekResponse(final List<FindAllSignalweekResponseItem> signalweekList) {
        this.signalweekList = signalweekList;
    }
    public static FindAllSignalweekResponse fromEntity(final Page<Signalweek> findSignalweekList) {
        List<FindAllSignalweekResponseItem> signalweekList = findSignalweekList.stream()
                .map(FindAllSignalweekResponseItem::fromEntity)
                .collect(Collectors.toList());
        FindAllSignalweekResponse findAllSignalweekResponse = new FindAllSignalweekResponse(signalweekList);
        findAllSignalweekResponse.signalweekTotalElement = findSignalweekList.getTotalElements();
        findAllSignalweekResponse.signalweekTotalPage = findSignalweekList.getTotalPages();

        return findAllSignalweekResponse;
        }
    }

