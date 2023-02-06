package com.ssafysignal.api.signalweek.dto.response;


import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.signalweek.entity.Signalweek;
import com.ssafysignal.api.signalweek.repository.SignalweekRepository;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Data
@ApiModel(value = "SignalweekFindAllResponse", description = "시그널 위크 프로젝트 목록 조회 response")
public class SignalweekFindAllResponse {

    @Schema(description = "시그널 위크 스케쥴별 랭킹 목록", required = true)
    private List<SignalweekFindAllResponseItem> signalweekList;

    private SignalweekFindAllResponse(final List<SignalweekFindAllResponseItem> signalweekList) {
        this.signalweekList = signalweekList;
    }

    private Integer signalweekTotalPage;
    private Long signalweekTotalElement;

    public static SignalweekFindAllResponse fromEntity(final Page<Signalweek> findSignalweekList) {
        List<SignalweekFindAllResponseItem> signalweekList = findSignalweekList.stream()
                .map(SignalweekFindAllResponseItem::fromEntity)
                .collect(Collectors.toList());
        SignalweekFindAllResponse signalweekFindAllResponse = new SignalweekFindAllResponse(signalweekList);
        signalweekFindAllResponse.signalweekTotalElement = findSignalweekList.getTotalElements();
        signalweekFindAllResponse.signalweekTotalPage = findSignalweekList.getTotalPages();

        return signalweekFindAllResponse;
        }
    }

