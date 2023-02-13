package com.ssafysignal.api.board.service;

import com.ssafysignal.api.board.dto.request.RegistQnaRequest;
import com.ssafysignal.api.board.dto.response.FindQnaResponse;
import com.ssafysignal.api.board.entity.Qna;
import com.ssafysignal.api.board.repository.QnaRepository;
import com.ssafysignal.api.common.service.SecurityService;
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
    private final SecurityService securityService;

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
    public void registQna(RegistQnaRequest registQnaRequest) {
        Qna qna = Qna.builder()
                .userSeq(registQnaRequest.getUserSeq())
                .title(registQnaRequest.getTitle())
                .content(registQnaRequest.getContent())
                .build();
        qnaRepository.save(qna);
    }

    @Transactional
    public FindQnaResponse findQna(Integer qnaSeq) {
        Qna qna = qnaRepository.findById(qnaSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        qna.setView(qna.getView() + 1);
        qnaRepository.save(qna);

        FindQnaResponse findQnaResponse = FindQnaResponse.fromEntity(qna);
        findQnaResponse.setIsMyQna(false);

        if (!securityService.isAnonymouseUser()){
            Integer userSeq = securityService.currentUserSeq();
            findQnaResponse.setIsMyQna(userSeq.equals(findQnaResponse.getUserSeq()));
        }

        return findQnaResponse;
    }

    @Transactional
    public void modifyQna(Integer qnaSeq, RegistQnaRequest registQnaRequest) {
        if (qnaRepository.findById(qnaSeq).isPresent()) {
            Qna qna = qnaRepository.findById(qnaSeq)
                    .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
            qna.setTitle(registQnaRequest.getTitle());
            qna.setContent(registQnaRequest.getContent());
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
