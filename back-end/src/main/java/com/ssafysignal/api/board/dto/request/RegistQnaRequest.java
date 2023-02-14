package com.ssafysignal.api.board.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistQnaRequest {
    private Integer userSeq;
    private String title;
    private String content;
}
