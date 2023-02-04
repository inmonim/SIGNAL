package com.ssafysignal.api.common.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailDto {
    private String receiveAddress;
    private String host;
    private Integer port;
    private String title;
    private String content;
    private String text;
    private String url;

    public EmailDto(String receiveAddress, String host, Integer port, String title, String content, String text, String url) {
        this.receiveAddress = receiveAddress;
        this.host = host;
        this.port = port;
        this.title = title;
        this.content = content;
        this.text = text;
        this.url = url;
    }

}
