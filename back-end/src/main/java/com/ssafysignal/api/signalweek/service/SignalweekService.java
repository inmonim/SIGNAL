package com.ssafysignal.api.signalweek.service;

import com.ssafysignal.api.common.entity.File;
import com.ssafysignal.api.common.repository.FileRepository;
import com.ssafysignal.api.common.service.FileService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.repository.ProjectRepository;
import com.ssafysignal.api.signalweek.dto.request.SignalweekVoteRequest;
import com.ssafysignal.api.signalweek.dto.response.SignalweekFindAllResponse;
import com.ssafysignal.api.signalweek.dto.response.SignalweekFindResponse;
import com.ssafysignal.api.signalweek.dto.response.SignalweekRankFindResponse;
import com.ssafysignal.api.signalweek.entity.Signalweek;
import com.ssafysignal.api.signalweek.entity.SignalweekRank;
import com.ssafysignal.api.signalweek.entity.SignalweekSchedule;
import com.ssafysignal.api.signalweek.entity.SignalweekVote;
import com.ssafysignal.api.signalweek.repository.SignalweekRankRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekScheduleRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SignalweekService {

    private final SignalweekRepository signalweekRepository;
    private final SignalweekScheduleRepository signalweekScheduleRepository;
    private final FileRepository fileRepository;
    private final SignalweekVoteRepository signalweekVoteRepository;
    private final ProjectRepository projectRepository;
    private final FileService fileService;

    @Value("${server.host}")
    private String host;
    @Value("${server.port}")
    private Integer port;
    @Value("${app.fileUpload.uploadDir.ppt}")
    private String pptUploadDir;
    @Value("${app.fileUpload.uploadDir.readme}")
    private String readmeUploadDir;
    private final SignalweekRankRepository signalweekRankRepository;


    // 등록
    @Transactional
    public void registSinalweek(HashMap<String, Object> signalweekRegistRequest, MultipartFile pptFile, MultipartFile readmeFile) throws IOException {
        Project project = projectRepository.findById((Integer) signalweekRegistRequest.get("projectSeq")).orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        // 이미 있던 경우
        if (signalweekRepository.findByProject(project).isPresent()) {
            Signalweek signalweek = signalweekRepository.findByProject(project)
                    .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
            if (!pptFile.isEmpty()) {
                // 피피티올리고
                if (signalweek.getPptFile().getFileSeq() != 0) {
                    // 물리 피피티 파일 삭제
                    fileService.deleteImageFile(signalweek.getPptFile().getUrl());
                    // 디비 삭제
                    fileRepository.deleteById(signalweek.getPptFile().getFileSeq());
                }
                // 피피티 파일 업로드
                File signalweekPptFile = fileService.registFile(pptFile, pptUploadDir);
                // 데이터베이스 업데이트
                signalweek.setPptFile(signalweekPptFile);
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
                File signalweekReadmeFile = fileService.registFile(readmeFile, readmeUploadDir);
                // 데이터베이스 업데이트
                signalweek.setPptFile(signalweekReadmeFile);
            }

            signalweek.setTitle(signalweekRegistRequest.get("title").toString());
            signalweek.setUccUrl(signalweekRegistRequest.get("uccUrl").toString());
            signalweek.setDeployUrl(signalweekRegistRequest.get("deployUrl").toString());
            signalweek.setProject(projectRepository.findById((Integer) signalweekRegistRequest.get("projectSeq"))
                    .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND)));

            signalweekRepository.save(signalweek);

            // 처음 생성인 경우
        } else {
            File registPptFile = null;
            if (pptFile.getSize() >= 1) {
                registPptFile = fileService.registFile(pptFile, pptUploadDir);
                fileRepository.save(registPptFile);
            }

            File signalweekReadmeFile = null;
            if (readmeFile.getSize() >= 1) {
                signalweekReadmeFile = fileService.registFile(readmeFile, readmeUploadDir);
                fileRepository.save(signalweekReadmeFile);
            }

            List<SignalweekSchedule> signalweekScheduleList = signalweekScheduleRepository.findTop1ByOrderByRegDtAsc();
            SignalweekSchedule signalweekSchedule = signalweekScheduleList.get(0);

            Signalweek signalweek = Signalweek.builder()
                    .signalweekScheduleSeq(signalweekSchedule.getSignalweekScheduleSeq())
                    .title(signalweekRegistRequest.get("title").toString())
                    .project(project)
                    .deployUrl(signalweekRegistRequest.get("deployUrl").toString())
                    .uccUrl(signalweekRegistRequest.get("uccUrl").toString())
                    .pptFile(registPptFile)
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

//     띵예의 전당
    @Transactional(readOnly = true)
    public List<SignalweekRankFindResponse> findAllSiganlweekRank(Integer year, Integer quarter) {
        List<SignalweekSchedule> signalweekScheduleList = signalweekScheduleRepository.findByYearAndQuarter(year,quarter);
        Integer signalweekScheduleSeq = signalweekScheduleList.get(0).getSignalweekScheduleSeq();

        List<SignalweekRank> signalweekRankList = signalweekRankRepository.findAllBySignalweekScheduleSeq(signalweekScheduleSeq);

        List<SignalweekRankFindResponse> responseSignalweekRank = new ArrayList<>();

        for (SignalweekRank signalweekRank:signalweekRankList) {

            responseSignalweekRank.add(SignalweekRankFindResponse.builder()
                    .rank(signalweekRank.getRank())
                    .subject(signalweekRank.getSignalweek().getTitle())
                    .signalweekSeq(signalweekRank.getSignalweek().getSignalweekSeq())
                    .projectImageUrl(signalweekRank.getSignalweek().getProject().getImageFile().getUrl())
                    .build());
        }

        return responseSignalweekRank;
    }



    // 시그널 위크 엔딩 정산
    @Transactional
    public void endSignalweek() {

        Integer nowQuarter = signalweekScheduleRepository.findTop1ByOrderByRegDtAsc().get(0).getSignalweekScheduleSeq();

        List<Signalweek> nowQuarterSignalweekList = signalweekRepository.findBySignalweekScheduleSeq(nowQuarter);

        List<List<Integer>> voteCntList = new ArrayList<>();
        for (Signalweek nowQarterSignalweek:nowQuarterSignalweekList) {
            List<Integer> voteCnt = new ArrayList<>(Arrays.asList(nowQarterSignalweek.getSignalweekSeq(), signalweekVoteRepository.countBySignalweekSeq(nowQarterSignalweek.getSignalweekSeq()).intValue()));
            voteCntList.add(voteCnt);
        }

        Collections.sort(voteCntList, (i1, i2) -> i2.get(1) - i1.get(1));

        Integer rank = 1;
        for (List<Integer> voteCnt:voteCntList.subList(0, 3)) {
            if (signalweekRepository.findBySignalweekSeq(voteCnt.get(0)).isPresent()) {
                SignalweekRank signalweekRank = SignalweekRank.builder()
                        .signalweekScheduleSeq(nowQuarter)
                        .signalweek(signalweekRepository.findBySignalweekSeq(voteCnt.get(0)).get())
                        .rank(rank)
                        .build();
                signalweekRankRepository.save(signalweekRank);
            }
            rank++;
        }

//        Signalweek fistTeam = signalweekRepository.findBySignalweekSeq(voteCntList.get(0).get(0))
//                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
//
//        Signalweek secondTeam = signalweekRepository.findBySignalweekSeq(voteCntList.get(1).get(0))
//                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
//
//        Signalweek thirdTeam = signalweekRepository.findBySignalweekSeq(voteCntList.get(2).get(0))
//                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
//
//

    }




}
