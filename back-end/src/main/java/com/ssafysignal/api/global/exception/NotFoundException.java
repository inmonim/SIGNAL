package com.ssafysignal.api.global.exception;

import com.ssafysignal.api.global.response.ResponseCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class NotFoundException extends RuntimeException {
    ResponseCode errorCode;
}
