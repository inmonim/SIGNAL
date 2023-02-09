package com.ssafysignal.api.admin.service;

import com.ssafysignal.api.board.entity.Qna;
import com.ssafysignal.api.board.repository.QnaRepository;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminQnaService {

    private final QnaRepository qnaRepository;

    @Transactional
    public void registFaq(Integer qnaSeq, boolean isTop) throws RuntimeException {
        Qna qna = qnaRepository.findById(qnaSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.REGIST_NOT_FOUNT));

        qna.setIsTop(isTop);
        qnaRepository.save(qna);
    }

    @Transactional
    public void registQna(Integer qnaSeq, String content) throws RuntimeException {
        Qna qna = qnaRepository.findById(qnaSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.REGIST_NOT_FOUNT));

        qna.setAnswer(content);
        qnaRepository.save(qna);
    }

    @Transactional
    public void modifyQna(Integer qnaSeq, String answer) throws RuntimeException {
        Qna qna = qnaRepository.findById(qnaSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));

        qna.setAnswer(answer);
        qnaRepository.save(qna);
    }

    @Transactional
    public void deleteQna(Integer qnaSeq) throws RuntimeException {
        Qna qna = qnaRepository.findById(qnaSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.DELETE_NOT_FOUND));

        qna.setAnswer(null);
        qnaRepository.save(qna);
    }
}
