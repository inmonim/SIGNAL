package com.ssafysignal.api.signalweek.service;

import com.ssafysignal.api.common.entity.File;
import com.ssafysignal.api.common.repository.FileRepository;
import com.ssafysignal.api.common.service.FileService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.repository.ProjectRepository;
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
import com.ssafysignal.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SignalweekService {

    private final SignalweekRepository signalweekRepository;
    private final SignalweekScheduleRepository signalweekScheduleRepository;
    private final FileRepository fileRepository;
    private final SignalweekVoteRepository signalweekVoteRepository;
    private final ProjectRepository projectRepository;
    private final FileService fileService;



    // 등록
    @Transactional
    public void registSinalweek(SignalweekRegistRequest signalweekRegistRequest, MultipartFile pptFile, MultipartFile readmeFile) throws IOException {

        // 이미 있던 경우
        if (signalweekRepository.findByProject(signalweekRegistRequest.getProjectSeq()).isPresent()) {
            Signalweek signalweek = signalweekRepository.findByProject(signalweekRegistRequest.getProjectSeq()).get();
            if (!pptFile.isEmpty()) {
                // 피피티올리고
                if (signalweek.getPptFile().getFileSeq() != 0) {
                    // 물리 피피티 파일 삭제
                    fileService.deleteImageFile(signalweek.getPptFile().getUrl());
                    // 디비 삭제
                    fileRepository.deleteById(signalweek.getPptFile().getFileSeq());
                }
                // 피피티 파일 업로드
                Integer pptFileSeq = fileService.registFile(pptFile);
                // 데이터베이스 업데이트
                signalweek.setPptFile(fileRepository.findById(pptFileSeq).get());
            }

            if (!readmeFile.isEmpty()) {
                // 이미 존재하는 릳미가 있으면 삭제
                if (signalweek.getReadmeFile().getFileSeq() != 0) {
                    // 물리 릳미 파일 삭제
                    fileService.deleteImageFile(signalweek.getReadmeFile().getUrl());
                    // 디비 삭제
                    fileRepository.deleteById(signalweek.getReadmeFile().getFileSeq());
                }
                // 릳미 파일 업로드
                Integer readmeFileSeq = fileService.registFile(readmeFile);
                // 데이터베이스 업데이트
                signalweek.setReadmeFile(fileRepository.findById(readmeFileSeq).get());
            }

            signalweek.setContent(signalweekRegistRequest.getContent());
            signalweek.setTitle(signalweekRegistRequest.getTitle());
            signalweek.setUccUrl(signalweekRegistRequest.getUccUrl());
            signalweek.setDeployUrl(signalweekRegistRequest.getDeployUrl());

            signalweekRepository.save(signalweek);

            // 처음 생성인 경우
        } else {

            File signalwwekPptFile = null;
            if (!pptFile.isEmpty()) {
                // 피피티 파일 업로드
                Integer pptFileSeq = fileService.registFile(pptFile);
                // 데이터베이스 업데이트
                signalwwekPptFile = fileRepository.findById(pptFileSeq).orElseThrow(() -> new IOException("pptx 파일 등록 실패"));
            }

            File signalweekReadmeFile = null;
            if (!readmeFile.isEmpty()) {
                // 릳미올리고
                Integer readmeFileSeq = fileService.registFile(readmeFile);
                // 디비 업데이트
                signalweekReadmeFile = fileRepository.findById(readmeFileSeq).orElseThrow(() -> new IOException("Readme 파일 등록 실패"));
            }

            List<SignalweekSchedule> signalweekScheduleList = signalweekScheduleRepository.findTop1ByOrderByRegDtAsc();
            SignalweekSchedule signalweekSchedule = signalweekScheduleList.get(0);

            Project project = projectRepository.findById(signalweekRegistRequest.getProjectSeq())
                    .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));


            Signalweek signalweek = Signalweek.builder()
                    .signalweekSchedulSeq(signalweekSchedule.getSignalweekScheduleSeq())
                    .project(project)
                    .content(signalweekRegistRequest.getContent())
                    .deployUrl(signalweekRegistRequest.getDeployUrl())
                    .uccUrl(signalweekRegistRequest.getUccUrl())
                    .pptFile(signalwwekPptFile)
                    .readmeFile(signalweekReadmeFile)
                    .build();

            signalweekRepository.save(signalweek);
        }
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


    // 수정
//    @Transactional
//    public void modifySignalweek(Integer signalweekSeq, SignalweekModifyRequest signalweekModifyRequest) {
//        Signalweek signalweek = signalweekRepository.findBySignalweekSeq(signalweekSeq)
//                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
//        File pptFile = signalweek.getPptFile();
//        File readmeFile = signalweek.getReadmeFile();
//
//        pptFile.setName(signalweekModifyRequest.getPptName());
//        pptFile.setUrl(signalweekModifyRequest.getPptUrl());
//        pptFile.setSize(signalweekModifyRequest.getPptSize());
//
//        fileRepository.save(pptFile);
//
//        readmeFile.setName(signalweekModifyRequest.getReadmeName());
//        readmeFile.setUrl(signalweekModifyRequest.getReadmeUrl());
//        readmeFile.setSize(signalweekModifyRequest.getReadmeSize());
//
//        fileRepository.save(readmeFile);
//
//        signalweek.setTitle(signalweekModifyRequest.getTitle());
//        signalweek.setContent(signalweekModifyRequest.getContent());
//        signalweek.setDeployUrl(signalweekModifyRequest.getDeployUrl());
//        signalweek.setUccUrl(signalweekModifyRequest.getUccUrl());
//
//        signalweekRepository.save(signalweek);
//    }

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

    // 띵예의 전당
//    @Transactional(readOnly = true)
//    public




//    @Transactional
//    public void deleteSignalweek(Integer signalweekSeq) {
//        Signalweek signalweek = signalweekRepository.findById(signalweekSeq)
//                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
//
//        signalweekRepository.delete(signalweek);
//    }
}
