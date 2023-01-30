package com.ssafysignal.api.user.repository;

import com.ssafysignal.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserSeq(int userSeq);
    Optional<User> findByEmail(String email);
    Optional<User> findByNickname(String nickname);
    Optional<User> findByNameAndPhone(String name, String Phone);

    Optional<User> findByEmailAndPassword(String email, String password);
}
