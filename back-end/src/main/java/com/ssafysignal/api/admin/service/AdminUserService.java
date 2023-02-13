package com.ssafysignal.api.admin.service;

import com.ssafysignal.api.admin.Entity.BlackUser;
import com.ssafysignal.api.admin.Repository.BlackUserRepository;
import com.ssafysignal.api.admin.dto.response.FindAdminUserResponse;
import com.ssafysignal.api.admin.dto.response.FindAllAdminUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final BlackUserRepository blackUserRepository;

    @Transactional(readOnly = true)
    public FindAllAdminUserResponse findAllUser(Integer page, Integer size) {
        Page<BlackUser> blackUserPage = blackUserRepository.findAll(PageRequest.of(page - 1, size, Sort.Direction.ASC, "blackUserSeq"));

        return FindAllAdminUserResponse.builder()
                .blackUserList(blackUserPage.stream().map(FindAdminUserResponse::fromEntity).collect(Collectors.toList()))
                .count(blackUserPage.getTotalElements())
                .build();
    }

    @Transactional
    public void deleteBanUser(List<Integer> blackUserSeqList) throws RuntimeException {
        blackUserRepository.deleteAllById(blackUserSeqList);
    }
}
