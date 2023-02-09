package com.ssafysignal.api.admin.service;

import com.ssafysignal.api.admin.dto.Request.BasicAdminNoticeRequest;
import com.ssafysignal.api.board.entity.Notice;
import com.ssafysignal.api.board.repository.NoticeRepository;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminNoticeService {
    private final NoticeRepository noticeRepository;

    @Transactional
    public void registNotice(BasicAdminNoticeRequest basicAdminNoticeRequest) throws RuntimeException {
        noticeRepository.save(Notice.builder()
                .userSeq(basicAdminNoticeRequest.getUserSeq())
                .title(basicAdminNoticeRequest.getTitle())
                .content(basicAdminNoticeRequest.getContent())
                .build());
    }

    @Transactional
    public void modifyNotice(Integer noticeSeq, BasicAdminNoticeRequest basicAdminNoticeRequest) throws RuntimeException {
        Notice notice = noticeRepository.findById(noticeSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));

        notice.setTitle(basicAdminNoticeRequest.getTitle());
        notice.setContent(basicAdminNoticeRequest.getContent());

        noticeRepository.save(notice);
    }

    @Transactional
    public void deleteNotice(Integer noticeSeq) throws RuntimeException {
        Notice notice = noticeRepository.findById(noticeSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
        noticeRepository.delete(notice);
    }
}
