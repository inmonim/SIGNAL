package com.ssafysignal.api.common.service;

import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.common.repository.CommonCodeRepository;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommonCodeService {
    private final CommonCodeRepository commonCodeRepository;

    @Transactional
    public List<CommonCode> findAllCommonCode(String groupCode) throws RuntimeException  {
        List<CommonCode> commonCodeList = commonCodeRepository.findByGroupCode(groupCode);
        if (commonCodeList.isEmpty()) throw new NotFoundException(ResponseCode.LIST_NOT_FOUND);
        return commonCodeList;
    }

    @Transactional
    public CommonCode findCommonCode(String code) throws RuntimeException {
        CommonCode commonCode = commonCodeRepository.findById(code)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        return commonCode;
    }
}
