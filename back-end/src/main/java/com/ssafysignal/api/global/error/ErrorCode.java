package com.ssafysignal.api.global.error;

public enum ErrorCode {
    PROJECT_NOT_FOUND(1000, "프로젝트를 찾을 수 없습니다."),
    POSTING_NOT_FOUND(2000, "공고를 찾을 수 없습니다.");

    private int errorCode;
    private String errorMessage;

    public int getErrorCode() {
        return this.errorCode;
    }
    public String getErrorMessage() {
        return this.errorMessage;
    }
    ErrorCode(int errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
