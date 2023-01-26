package com.ssafysignal.api.profile.repository;

import com.ssafysignal.api.profile.entity.UserPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPositionRepository extends JpaRepository<UserPosition, Integer> {
    List<UserPosition> findByUserSeq(Integer userSeq);
}
