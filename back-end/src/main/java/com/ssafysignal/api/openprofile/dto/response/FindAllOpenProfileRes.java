package com.ssafysignal.api.openprofile.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@ApiModel(value = "FindAllOpenProfileReq", description = "오픈프로필 리스트와 갯수정보")
public class FindAllOpenProfileRes {
    private List<FindAllOpenProfile> openProfileList;
    private long totalNum;
    private int totalPage;

}
