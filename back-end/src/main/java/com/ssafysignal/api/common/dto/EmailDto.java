package com.ssafysignal.api.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailDto {
    private String receiveAddress;
    private String host;
    private String title;
    private String content;
    private String text;
    private String url;
}
