package com.ssafysignal.api.board.service;

import com.ssafysignal.api.board.dto.request.QnaRegistRequest;
import com.ssafysignal.api.board.entity.Notice;
import com.ssafysignal.api.board.entity.Qna;
import com.ssafysignal.api.board.repository.*;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final NoticeRepository noticeRepository;

    private final QnaRepository qnaRepository;


    @Transactional(readOnly = true)
    public List<Notice> findAllNotice() {
        List<Notice> noticeList = noticeRepository.findAll();
        return noticeList;
    }


    @Transactional
    public Notice findNotice(Integer noticeSeq) throws NotFoundException {
        Notice notice = noticeRepository.findByNoticeSeq(noticeSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        notice.setView(notice.getView());
        noticeRepository.save(notice);
        return notice;
    }


    @Transactional(readOnly = true)
    public List<Qna> findAllQna() {
        List<Qna> QnaList = qnaRepository.findAll();
        return QnaList;
    }

    @Transactional
    public void registQna(QnaRegistRequest qnaRegistRequest) {
        Qna qna = Qna.builder()
                .userSeq(qnaRegistRequest.getUserSeq())
                .title(qnaRegistRequest.getTitle())
                .content(qnaRegistRequest.getContent())
                .build();
        qnaRepository.save(qna);
    }
}
