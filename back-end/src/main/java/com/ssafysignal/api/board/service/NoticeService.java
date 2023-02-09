package com.ssafysignal.api.board.service;

import com.ssafysignal.api.board.dto.request.QnaRegistRequest;
import com.ssafysignal.api.board.entity.Notice;
import com.ssafysignal.api.board.entity.Qna;
import com.ssafysignal.api.board.repository.*;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    @Transactional(readOnly = true)
    public Integer countNotice() {
        return noticeRepository.findAll().size();
    }

    @Transactional(readOnly = true)
    public Page<Notice> findAllNotice(Integer page, Integer size) {
        Page<Notice> noticeList = noticeRepository.findAll(PageRequest.of(page - 1, size, Sort.Direction.DESC, "noticeSeq"));
        return noticeList;
    }


    @Transactional
    public Notice findNotice(Integer noticeSeq) throws NotFoundException {
        Notice notice = noticeRepository.findByNoticeSeq(noticeSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        notice.addView(notice.getView());
        noticeRepository.save(notice);
        return notice;
    }
}
