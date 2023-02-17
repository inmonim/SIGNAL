package com.ssafysignal.api.profile.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistProfilePositionRequest {
    Integer userSeq;
    String positionCode;
}
