package com.ssafysignal.api.auth.service;

import com.ssafysignal.api.auth.dto.response.FindEmailRes;
import com.ssafysignal.api.auth.repository.AuthRepository;
import com.ssafysignal.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthRepository repository;
    @Transactional(readOnly = true)
    public FindEmailRes findEmail(final String name, final String phone) {

        FindEmailRes ret = repository.findByNameAndPhone(name,phone);
        return ret;
    }
}
