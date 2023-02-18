package com.ssafysignal.api.board.repository;

import com.ssafysignal.api.board.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Integer>{
    Optional<Notice> findByNoticeSeq(Integer noticeSeq);
}
