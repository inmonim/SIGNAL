package com.ssafysignal.api.posting.service;

import com.ssafysignal.api.posting.dto.request.PostingBasicRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostingServiceTest {

    @Autowired
    private PostingService postingService;

    @Test
    void registPosting() {

        for (int i = 11; i <= 100; i++) {

            List<String> postingSkillList = new ArrayList<>();
            postingSkillList.add("WE100");
            postingSkillList.add("WE101");
            List<LocalDateTime> postingMeetingList = new ArrayList<>();
            postingMeetingList.add(LocalDateTime.now());
            postingMeetingList.add(LocalDateTime.now());
            List<Map<String, Object>> postingPositionList = new ArrayList<>();
            int finalI = i;
            postingPositionList.add(new HashMap<String, Object>(){{put("positionCode", "PO100"); put("positionCnt", finalI); }});
            postingPositionList.add(new HashMap<String, Object>(){{put("positionCode", "PO101"); put("positionCnt", finalI); }});
            List<Map<String, Object>> postingQuestionList = new ArrayList<>();
            postingQuestionList.add(new HashMap<String, Object>(){{put("num", 1); put("content", "사전 질문 " + finalI); }});
            postingQuestionList.add(new HashMap<String, Object>(){{put("num", 2); put("content", "사전 질문 " + finalI); }});

//            postingService.registPosting(new PostingBasicRequest(
//                    1,
//                    "프로젝트 주제 " + i,
//                    "11",
//                    "FI100",
//                    true,
//                    i,
//                    "공고 설명 " + i,
//                    LocalDateTime.now(),
//                    i,
//                    postingSkillList,
//                    postingMeetingList,
//                    postingPositionList,
//                    postingQuestionList
//                    ));
        }
    }

    @Test
    void findAllPosting() {
    }

    @Test
    void findPosting() {
    }

    @Test
    void modifyPosting() {
    }

    @Test
    void canclePosting() {
    }

    @Test
    void applySelect() {
    }

    @Test
    void findAllApplyPosting() {
    }

    @Test
    void findAllPostPosting() {
    }
}