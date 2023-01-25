package com.ssafysignal.api.global.common.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class BasicResponse {
    private BasicHeader header;
    private Object body;

    public static BasicResponse Body (final String code, String message, final Object body) {
        return BasicResponse.builder()
                .header(BasicHeader.Header(code, message))
                .body(body)
                .build();
    }
}
