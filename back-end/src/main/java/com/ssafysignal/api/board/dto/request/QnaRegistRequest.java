package com.ssafysignal.api.board.dto.request;


import lombok.Data;

@Data
public class QnaRegistRequest {

    private Integer userSeq;

    private String title;

    private String content;
}
