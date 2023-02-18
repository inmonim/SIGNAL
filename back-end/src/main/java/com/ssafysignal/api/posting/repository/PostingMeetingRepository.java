package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.PostingMeeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostingMeetingRepository extends JpaRepository<PostingMeeting, Integer> {
    List<PostingMeeting> findPostingMeetingsByPostingSeq(Integer postingSeq);
    PostingMeeting findByApplySeqAndToUserSeq(Integer applySeq, Integer userSeq);
}
