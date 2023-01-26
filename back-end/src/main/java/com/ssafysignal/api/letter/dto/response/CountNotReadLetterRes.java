package com.ssafysignal.api.letter.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CountNotReadLetterRes {
    private long count;

    @Builder
    public CountNotReadLetterRes(long count) {
        this.count = count;
    }
}
