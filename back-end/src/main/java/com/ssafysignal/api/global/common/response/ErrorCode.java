package com.ssafysignal.api.global.common.response;

public enum ErrorCode {
    UNAUTHORIZED("1000", "자격 증명에 실패했습니다."),

    PROJECT_NOT_FOUND("2000", "프로젝트를 찾을 수 없습니다."),
    POSTING_NOT_FOUND("3000", "공고를 찾을 수 없습니다.");

    private String errorCode;
    private String errorMessage;

    public String getErrorCode() {
        return this.errorCode;
    }
    public String getErrorMessage() {
        return this.errorMessage;
    }
    ErrorCode(String errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
