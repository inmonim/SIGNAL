package com.ssafysignal.api.global.exception;

import com.ssafysignal.api.global.response.ResponseCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UnAuthException extends RuntimeException {
    ResponseCode errorCode;
}
