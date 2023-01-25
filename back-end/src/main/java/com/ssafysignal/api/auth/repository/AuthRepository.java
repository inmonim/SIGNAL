package com.ssafysignal.api.auth.repository;

import com.ssafysignal.api.auth.dto.response.FindEmailRes;
import com.ssafysignal.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<User, Integer> {

    FindEmailRes findByNameAndPhone(String name, String Phone);
}
