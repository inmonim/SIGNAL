package com.ssafysignal.api.apply.dto.Response;

import com.ssafysignal.api.apply.entity.Apply;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Data
@ApiModel(value = "ApplyWriterFindAllResponse", description = "공고 작성자의 지원서 목록")
public class ApplyWriterFindAllRes {

    @Schema(description = "공고 작성자의 지원서 목록", required = true)
    private List<ApplyWriterFindAllResItem> applyList;

    private ApplyWriterFindAllRes(final List<ApplyWriterFindAllResItem> applyList) {
        this.applyList = applyList;
    }

//    public static ApplyWriterFindAllRes fromEntity(final Page<Apply> findApplyList) {
//        List<ApplyWriterFindAllResItem> applyList = findApplyList.stream()
//                .map(ApplyWriterFindAllResItem::fromEntity)
//                .collect(Collectors.toList());
//        return new ApplyWriterFindAllRes(applyList);
//    }
}
