package com.ssafysignal.api.global.jwt;

public enum UserCodeEnum {
    USER("USER", "일반회원"),
    ADMIN("ADMIN", "관리자");
    private String code;
    private String message;

    public String getCode() {
        return this.code;
    }
    public String getMessage() {
        return this.message;
    }
    UserCodeEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
