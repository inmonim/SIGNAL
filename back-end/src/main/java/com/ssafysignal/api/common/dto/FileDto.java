package com.ssafysignal.api.common.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FileDto {
    private String originalName;
    private String name;
    private Long size;
    private String url;
    private String type;
}
