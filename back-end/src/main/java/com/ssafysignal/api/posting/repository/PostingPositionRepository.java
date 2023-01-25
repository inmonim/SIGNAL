package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.PostingMeeting;
import com.ssafysignal.api.posting.entity.PostingPosition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostingPositionRepository extends JpaRepository<PostingPosition, Integer> {
}
