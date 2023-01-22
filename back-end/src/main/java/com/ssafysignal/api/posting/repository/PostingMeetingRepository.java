package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.PostingMeeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostingMeetingRepository extends JpaRepository<PostingMeeting, Integer> {
}
