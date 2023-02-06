package com.ssafysignal.api.posting.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplySelectConfirmRequest {
    private Integer applySeq;
    private boolean isSelect;
}
