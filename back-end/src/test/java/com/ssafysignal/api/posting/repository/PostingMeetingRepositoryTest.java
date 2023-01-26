package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.PostingMeeting;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostingMeetingRepositoryTest {

    @Autowired
    private PostingMeetingRepository postingMeetingRepository;
    @Autowired
    private UserRepository userRepository;


    @Test
    void find() {
        List<PostingMeeting> postingMeetingList = postingMeetingRepository.findPostingMeetingsByPostingSeq(1);
        assertTrue(postingMeetingList.size() == 3);
    }

    @Test
    void regist() {
        LocalDateTime now = LocalDateTime.now();
        PostingMeeting postingMeeting = PostingMeeting.builder()
                                    .postingSeq(1)
                                    .fromUserSeq(1)
                                    .meetingDt(now)
                                    .build();
        postingMeetingRepository.save(postingMeeting);
        assertEquals(postingMeeting.getFromUserSeq(), 1);
        
        postingMeetingRepository.deleteById(postingMeeting.getPostingMeetingSeq());
    }
    @Test
    void modify() {
        PostingMeeting postingMeeting = postingMeetingRepository.findById(1).get();
        postingMeeting.setToUser(12);
        postingMeetingRepository.save(postingMeeting);

        postingMeeting = postingMeetingRepository.findById(1).get();
        assertEquals(postingMeeting.getToUserSeq(), 1);

        postingMeeting = postingMeetingRepository.findById(1).get();
        postingMeeting.setToUser(null);
        postingMeetingRepository.save(postingMeeting);
    }
}