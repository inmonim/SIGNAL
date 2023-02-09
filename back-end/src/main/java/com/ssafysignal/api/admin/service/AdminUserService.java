package com.ssafysignal.api.admin.service;

import com.ssafysignal.api.admin.Entity.BlackUser;
import com.ssafysignal.api.admin.Repository.BlackUserRepository;
import com.ssafysignal.api.admin.dto.Response.FindAdminUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final BlackUserRepository blackUserRepository;

    @Transactional(readOnly = true)
    public List<FindAdminUserResponse> findAllUser() {
        return FindAdminUserResponse.toList(blackUserRepository.findAll());
    }

    @Transactional
    public void deleteBanUser(List<Integer> blackUserSeqList) throws RuntimeException {
        blackUserRepository.deleteAllById(blackUserSeqList);
    }
}
