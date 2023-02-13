package com.ssafysignal.api.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileDto {
    private String originalName;
    private String name;
    private Long size;
    private String url;
    private String type;
}
