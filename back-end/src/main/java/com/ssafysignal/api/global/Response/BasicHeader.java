package com.ssafysignal.api.global.Response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
public class BasicHeader {
    private String code;
    private String message;

    public static BasicHeader BasicHeader(final String code, final String message){
        return BasicHeader.builder()
                .code(code)
                .message(message)
                .build();
    }
}
