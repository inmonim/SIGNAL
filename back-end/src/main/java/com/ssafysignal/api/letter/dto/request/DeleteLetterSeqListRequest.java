package com.ssafysignal.api.letter.dto.request;

import lombok.Getter;

import java.util.List;

@Getter
public class DeleteLetterSeqListRequest {
    private List<DeleteLetterSeqRequest> letterSeqList;
}
