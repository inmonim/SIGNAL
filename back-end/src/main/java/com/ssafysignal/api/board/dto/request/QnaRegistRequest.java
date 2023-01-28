package com.ssafysignal.api.board.dto.request;


import lombok.Data;
import lombok.Getter;

@Data
public class QnaRegistRequest {

    private Integer userSeq;

    private String title;

    private String content;
}
