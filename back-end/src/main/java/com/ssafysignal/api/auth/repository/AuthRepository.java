package com.ssafysignal.api.auth.repository;

import com.ssafysignal.api.auth.entity.Auth;
import com.ssafysignal.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<Auth, Integer> {
    Optional<Auth> findByCodeAndIsAuth(String code, boolean isAuth);
    Optional<Auth> findByUserSeq(Integer userSeq);
    Optional<Auth> findTop1ByUserSeqAndAuthCodeOrderByRegDtDesc(Integer userSeq, String authCode);
}
