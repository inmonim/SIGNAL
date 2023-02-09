package com.ssafysignal.api.global.response;

import org.springframework.http.ResponseEntity;

public enum ResponseCode {
    SUCCESS("200", "성공"),

    NOT_FOUND("301", "조회 실패"),
    LIST_NOT_FOUND("302", "목록 조회 실패"),

    REGIST_NOT_FOUNT("401", "등록하기 위한 조회 실패"),
    REGIST_ALREADY("402", "이미 등록된 정보"),
    REGIST_FAIL("403", "등록 실패"),
    REGIST_BLACK("405", "블랙리스트에 등록된 유저"),
    REGIST_DUPLICATE("406", "중복된 지원 등록"),
    REGIST_LACK_HEART("407", "지원에 필요한 하트 부족"),

    MODIFY_NOT_FOUND("501", "수정하기 위한 정보 조회 실패"),
    MODIFY_FAIL("502", "수정 실패"),

    DELETE_NOT_FOUND("601", "삭제하기 위한 정보 조회 실패"),
    DELETE_FAIL("602", "삭제 실패"),

    CANCLE_FAIL("701", "취소 실패"),
    MAILSEND_FAIL("702", "메일 전송 실패"),
    LETTERSEND_FAIL("703", "쪽지 전송 실패"),

    UNAUTHORIZED("801", "자격 증명 실패"),
    INVALID_TOKEN("802", "유효하지 않은 토큰"),
    TOKEN_NOT_FOUND("803", "토큰 없음"),
    ALREADY_AUTH("804", "이미 인증됨");

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
