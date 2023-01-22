package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.Posting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostingRepository extends JpaRepository<Posting, Integer> {
}
