package com.ssafysignal.api.board.repository;

import com.ssafysignal.api.board.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Integer>{
    Optional<Notice> findByNoticeSeq(Integer noticeSeq);

    // JPA 는 데이터베이스 컬럼 기준으로 받아와야되서 Notice 라고 선언하면 빌드 에러는 안나지면 빌드 돌아가면서 JPA 에서 에러터짐!
//    List<Notice> findAllNotice();
}
