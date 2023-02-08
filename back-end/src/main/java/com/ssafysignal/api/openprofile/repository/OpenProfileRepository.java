package com.ssafysignal.api.openprofile.repository;

import com.ssafysignal.api.openprofile.entity.OpenProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OpenProfileRepository  extends JpaRepository<OpenProfile, Integer> {
    OpenProfile findByUserSeq(int userSeq);
}
