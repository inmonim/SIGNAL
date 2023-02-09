package com.ssafysignal.api.board.service;

import com.ssafysignal.api.board.dto.request.QnaRegistRequest;
import com.ssafysignal.api.board.entity.Notice;
import com.ssafysignal.api.board.entity.Qna;
import com.ssafysignal.api.board.repository.NoticeRepository;
import com.ssafysignal.api.board.repository.QnaRepository;
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
public class QnaService {

    private final QnaRepository qnaRepository;

    @Transactional(readOnly = true)
    public Integer countNotice() {
        return qnaRepository.findAll().size();
    }

    @Transactional(readOnly = true)
    public Page<Qna> findAllQna(Integer page, Integer size) {
        Page<Qna> QnaList = qnaRepository.findAll(PageRequest.of(page - 1, size, Sort.Direction.DESC, "qnaSeq"));
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

    @Transactional
    public Qna findQna(Integer qnaSeq) {
        Qna qna = qnaRepository.findById(qnaSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        qna.addView(qna.getView());
        return qna;
    }

    @Transactional
    public void modifyQna(Integer qnaSeq, QnaRegistRequest qnaRegistRequest) {
        if (qnaRepository.findById(qnaSeq).isPresent()) {
            Qna qna = qnaRepository.findById(qnaSeq)
                    .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
            qna.setTitle(qnaRegistRequest.getTitle());
            qna.setContent(qnaRegistRequest.getContent());
            qnaRepository.save(qna);
        }
    }

    @Transactional
    public void deleteQna(Integer qnaSeq) {
        Qna qna = qnaRepository.findById(qnaSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.DELETE_NOT_FOUND));
        qnaRepository.delete(qna);
    }
}
