package com.ssafysignal.api.admin.Repository;

import com.ssafysignal.api.admin.Entity.BlackUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlackUserRepository extends JpaRepository<BlackUser, Integer> {

    Optional<BlackUser> findByUserSeqAndProjectSeq(Integer userSeq, Integer ProjectSeq);
}
