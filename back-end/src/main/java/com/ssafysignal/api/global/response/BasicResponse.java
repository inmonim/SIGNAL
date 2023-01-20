package com.ssafysignal.api.global.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class BasicResponse {
    private BasicHeader header;
    private Object body;

    public static BasicResponse BasicResponse (final String code, String message, final Object body) {
        return BasicResponse.builder()
                .header(new BasicHeader(code, message))
                .body(body)
                .build();
    }
}
