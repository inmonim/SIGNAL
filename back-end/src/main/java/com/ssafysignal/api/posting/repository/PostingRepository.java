package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.Posting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostingRepository extends JpaRepository<Posting, Integer> {
}
