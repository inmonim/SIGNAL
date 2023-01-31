package com.ssafysignal.api.auth.repository;

import com.ssafysignal.api.auth.entity.Auth;
import com.ssafysignal.api.auth.entity.UserAuth;
import com.ssafysignal.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAuthRepository extends JpaRepository<UserAuth, Integer> {
    void deleteByUser(User user);
}
