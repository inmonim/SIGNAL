package com.ssafysignal.api.user.repository;

import com.ssafysignal.api.user.dto.response.FindUserRes;
import com.ssafysignal.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    public FindUserRes findByUserSeq(int userSeq);
    User findByNickname(String nickname);
}
