package com.ssafysignal.api.signalweek.service;

import com.ssafysignal.api.common.entity.File;
import com.ssafysignal.api.common.repository.FileRepository;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.signalweek.dto.request.SignalweekModifyRequest;
import com.ssafysignal.api.signalweek.dto.request.SignalweekRegistRequest;
import com.ssafysignal.api.signalweek.dto.request.SignalweekVoteRequest;
import com.ssafysignal.api.signalweek.dto.response.SignalweekFindAllResponse;
import com.ssafysignal.api.signalweek.dto.response.SignalweekFindResponse;
import com.ssafysignal.api.signalweek.entity.Signalweek;
import com.ssafysignal.api.signalweek.entity.SignalweekSchedule;
import com.ssafysignal.api.signalweek.entity.SignalweekVote;
import com.ssafysignal.api.signalweek.repository.SignalweekRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekScheduleRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SignalweekService {

    private final SignalweekRepository signalweekRepository;
    private final SignalweekScheduleRepository signalweekScheduleRepository;
    private final FileRepository fileRepository;
    private final SignalweekVoteRepository signalweekVoteRepository;

    @Transactional
    public void registSinalweek(SignalweekRegistRequest signalweekRegistRequest) {
        List<SignalweekSchedule> signalweekScheduleList = signalweekScheduleRepository.findTop1ByOrderByRegDtAsc();
        SignalweekSchedule signalweekSchedule = signalweekScheduleList.get(0);

        File pptFile = File.builder()
                .name(signalweekRegistRequest.getPptName())
                .size(signalweekRegistRequest.getPptSize())
                .type("pptx")
                .url(signalweekRegistRequest.getPptUrl())
                .build();

        File readmeFile = File.builder()
                .name(signalweekRegistRequest.getReadmeName())
                .size(signalweekRegistRequest.getReadmeSize())
                .type("md")
                .url(signalweekRegistRequest.getReadmeUrl())
                .build();

        fileRepository.save(pptFile);
        fileRepository.save(readmeFile);

        Signalweek signalweek = Signalweek.builder()
                .signalweekSchedulSeq(signalweekSchedule.getSignalweekScheduleSeq())
                .title(signalweekRegistRequest.getTitle())
                .projectSeq(signalweekRegistRequest.getProjectSeq())
                .content(signalweekRegistRequest.getContent())
                .deployUrl(signalweekRegistRequest.getDeployUrl())
                .uccUrl(signalweekRegistRequest.getUccUrl())
                .pptFile(pptFile)
                .readmeFile(readmeFile)
                .build();

        signalweekRepository.save(signalweek);
    }


    // 목록 조회
    @Transactional(readOnly = true)
    public SignalweekFindAllResponse findAllSignalweek(Integer page, Integer size, String searchKeyword) {
        Page<Signalweek> signalweekList = signalweekRepository.findByTitleContaining(searchKeyword, PageRequest.of(page - 1, size, Sort.Direction.ASC, "signalweekSeq"));

        SignalweekFindAllResponse signalweekFindAllResponse = SignalweekFindAllResponse.fromEntity(signalweekList);

        return signalweekFindAllResponse;
    }

    // 상세 조회
    @Transactional(readOnly = true)
    public SignalweekFindResponse findSignalweek(Integer signalweekSeq, Integer userSeq) {
        Signalweek signalweek = signalweekRepository.findBySignalweekSeq(signalweekSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        boolean vote = signalweekVoteRepository.findBySignalweekSeqAndFromUserSeq(signalweekSeq, userSeq).isPresent();

        SignalweekFindResponse signalweekFindResponse =
                SignalweekFindResponse.builder()
                        .title(signalweek.getTitle())
                        .pptUrl(signalweek.getPptFile().getUrl())
                        .readmeUrl(signalweek.getReadmeFile().getUrl())
                        .uccUrl(signalweek.getUccUrl())
                        .deployUrl(signalweek.getDeployUrl())
                        .content(signalweek.getContent())
                        .vote(vote)
                        .build();

        return signalweekFindResponse;
    }

    @Transactional
    public void modifySignalweek(Integer signalweekSeq, SignalweekModifyRequest signalweekModifyRequest) {
        Signalweek signalweek = signalweekRepository.findBySignalweekSeq(signalweekSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        File pptFile = signalweek.getPptFile();
        File readmeFile = signalweek.getReadmeFile();

        pptFile.setName(signalweekModifyRequest.getPptName());
        pptFile.setUrl(signalweekModifyRequest.getPptUrl());
        pptFile.setSize(signalweekModifyRequest.getPptSize());

        fileRepository.save(pptFile);

        readmeFile.setName(signalweekModifyRequest.getReadmeName());
        readmeFile.setUrl(signalweekModifyRequest.getReadmeUrl());
        readmeFile.setSize(signalweekModifyRequest.getReadmeSize());

        fileRepository.save(readmeFile);

        signalweek.setTitle(signalweekModifyRequest.getTitle());
        signalweek.setContent(signalweekModifyRequest.getContent());
        signalweek.setDeployUrl(signalweekModifyRequest.getDeployUrl());
        signalweek.setUccUrl(signalweekModifyRequest.getUccUrl());

        signalweekRepository.save(signalweek);
    }

    // 투표

    @Transactional
    public void registSignalweekVote(SignalweekVoteRequest signalweekVoteRequest) {

        if (signalweekVoteRepository.findBySignalweekSeqAndFromUserSeq(
                signalweekVoteRequest.getSignalweekSeq(), signalweekVoteRequest.getUserSeq()).isPresent()) {
            SignalweekVote signalweekVote = signalweekVoteRepository.findBySignalweekSeqAndFromUserSeq(
                    signalweekVoteRequest.getSignalweekSeq(), signalweekVoteRequest.getUserSeq()).get();

            signalweekVoteRepository.delete(signalweekVote);

        } else {
            SignalweekVote signalweekVote = SignalweekVote.builder()
                    .signalweekSeq(signalweekVoteRequest.getSignalweekSeq())
                    .fromUserSeq(signalweekVoteRequest.getUserSeq())
                    .build();

            signalweekVoteRepository.save(signalweekVote);

        }
    }


    @Transactional
    public void deleteSignalweek(Integer signalweekSeq) {
        Signalweek signalweek = signalweekRepository.findById(signalweekSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        signalweekRepository.delete(signalweek);
    }
}
