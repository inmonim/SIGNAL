package com.ssafysignal.api.common.service;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.exception.UnAuthException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class SecurityService {

    private final UserRepository userRepository;

    @Transactional
    public Integer currentUserSeq() throws ClassCastException {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDetails userDetails = (UserDetails) principal;
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND)).getUserSeq();
    }

    public Boolean isAnonymouseUser(){
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser");
    }
}
