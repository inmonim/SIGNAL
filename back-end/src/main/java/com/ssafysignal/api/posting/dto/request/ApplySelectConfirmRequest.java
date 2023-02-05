package com.ssafysignal.api.posting.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplySelectConfirmRequest {
    private Integer applySeq;
    private boolean isSelect;
}
