package com.ssafysignal.api.profile.dto.request;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfilePositionRegistRequest {
    
    //request body만으로 표현 가능하기 때문에 미사용
    Integer userSeq;
    String positionCode;
}
