package com.ssafysignal.api.global.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class BasicHeader {
    private String code;
    private String message;

    public static BasicHeader Header(final String code, final String message){
        return BasicHeader.builder()
                .code(code)
                .message(message)
                .build();
    }
}
