package com.ssafysignal.api.global.response;

import org.springframework.http.ResponseEntity;

public enum ResponseCode {
    SUCCESS("200", "성공"),
    NOT_FOUND("400", "조회 실패"),
    LIST_NOT_FOUND("400", "목록 조회 실패"),
    REGIST_FAIL("500", "등록 실패"),
    MODIFY_NOT_FOUND("400", "수정하기 위한 정보 조회 실패"),
    MODIFY_FAIL("500", "수정 실패"),
    DELETE_NOT_FOUND("500", "삭제하기 위한 정보 조회 실패"),
    DELETE_FAIL("500", "삭제 실패"),
    CANCLE_FAIL("500", "취소 실패"),
    MAILSEND_FAIL("600", "메일 전송 실패"),
    LETTERSEND_FAIL("700", "쪽지 전송 실패"),
    UNAUTHORIZED("1000", "자격 증명 실패");

    private String code;
    private String message;

    public String getCode() {
        return this.code;
    }
    public String getMessage() {
        return this.message;
    }
    ResponseCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
