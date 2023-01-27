package com.ssafysignal.api.board.service;

import com.ssafysignal.api.board.entity.Notice;
import com.ssafysignal.api.board.repository.*;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final NoticeRepository noticeRepository;

    @Transactional
    public Notice findNotice(Integer noticeSeq) {
        Notice notice = noticeRepository.findByNoticeSeq(noticeSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        notice.setView(notice.getView());
        return noticeRepository.save(notice);
    }

    @Transactional
    public List<Notice> findAllNotice() throws RuntimeException {
        List<Notice> noticeList = null;// = noticeRepository.findAllNotice();
        return noticeList;
    }
}
