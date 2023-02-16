package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.PostingPosition;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostingPositionRepositoryTest {

    @Autowired
    private PostingPositionRepository postingPositionRepository;

    @Test
    void find() {
        List<PostingPosition> postingPositionList = postingPositionRepository.findPostingPositiosnByPostingSeq(1);

        assertEquals(postingPositionList.get(0).getPositionCode(), "PO100");
        assertEquals(postingPositionList.get(1).getPositionCode(), "PO101");
    }

    @Test
    void regist() {
        PostingPosition postingPosition = PostingPosition.builder()
                .postingSeq(1)
                .positionCode("PO100")
                .positionCnt(3)
                .build();
        postingPositionRepository.save(postingPosition);

        postingPositionRepository.findById(postingPosition.getPostingPositionSeq()).get();
        assertEquals(postingPosition.getPositionCode(), "PO100");

        postingPositionRepository.deleteById(postingPosition.getPostingPositionSeq());
    }
}