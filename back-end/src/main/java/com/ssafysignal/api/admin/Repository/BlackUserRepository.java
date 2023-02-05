package com.ssafysignal.api.admin.Repository;

import com.ssafysignal.api.admin.Entity.BlackUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlackUserRepository extends JpaRepository<BlackUser, Integer> {
}
