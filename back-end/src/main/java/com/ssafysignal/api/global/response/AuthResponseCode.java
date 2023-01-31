package com.ssafysignal.api.global.response;

public enum AuthResponseCode {
    INVALID_TOKEN("100", "유효하지 않은 토큰"),
    TOKEN_NOT_FOUND("101", "토큰 없음"),
    TOKEN_DECODING_FAIL("102", "토큰 복호화 실패"),
    ALREADY_AUTH("200", "이미 인증됨"),
    UNAUTHORIZED("300", "유효하지 않은 값");

    private String code;
    private String message;

    public String getCode() {
        return this.code;
    }
    public String getMessage() {
        return this.message;
    }
    AuthResponseCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
