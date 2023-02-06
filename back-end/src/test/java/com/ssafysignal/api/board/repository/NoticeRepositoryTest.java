package com.ssafysignal.api.board.repository;

import com.ssafysignal.api.board.entity.Notice;
import com.ssafysignal.api.board.entity.Qna;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class NoticeRepositoryTest {

    @Autowired
    private NoticeRepository noticeRepository;
    @Autowired
    private QnaRepository qnaRepository;

    @Test
    void regist() {
        for (int i = 1; i <= 50; i++){
//            noticeRepository.save(Notice.builder()
//                    .userSeq(i % 4 + 1)
//                    .title("공지사항 테스트 " + i)
//                    .content("공지사항 테스트 본문" + i)
//                    .build());
            qnaRepository.save(Qna.builder()
                    .userSeq(i % 4 + 1)
                    .title("QnA 테스트 " + i)
                    .content("QnA 테스트 본문" + i)
                    .build());
        }
    }

    @Test
    void findAll() {
        List<Notice> noticeList = noticeRepository.findAll(PageRequest.of(1, 7, Sort.Direction.ASC, "noticeSeq")).toList();
        for (Notice notice : noticeList){
            System.out.println(notice.toString());
        }
    }


}