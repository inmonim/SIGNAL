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

    public static BasicResponse Body (final ResponseCode responseCode, final Object body) {
        return BasicResponse.builder()
                .header(BasicHeader.Header(responseCode.getCode(), responseCode.getMessage()))
                .body(body)
                .build();
    }
}
