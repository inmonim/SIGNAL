package com.ssafysignal.api.signalweek.service;

import com.ssafysignal.api.common.entity.ProjectFile;
import com.ssafysignal.api.common.repository.ProjectFileRepository;
import com.ssafysignal.api.common.service.FileService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.profile.entity.UserHeartLog;
import com.ssafysignal.api.profile.repository.UserHeartLogRepository;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectUser;
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
import com.ssafysignal.api.user.entity.User;
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
    private final ProjectFileRepository projectfileRepository;
    private final SignalweekVoteRepository signalweekVoteRepository;
    private final ProjectRepository projectRepository;
    private final FileService fileService;

    @Value("${app.fileUpload.uploadPath.ppt}")
    private String pptUploadDir;
    @Value("${app.fileUpload.uploadPath.readme}")
    private String readmeUploadDir;
    private final SignalweekRankRepository signalweekRankRepository;
    private final UserHeartLogRepository userHeartLogRepository;


    // 등록
    @Transactional
    public void registSinalweek(HashMap<String, Object> signalweekRegistRequest, MultipartFile pptFile, MultipartFile readmeFile) throws IOException {
        Project project = projectRepository.findById((Integer) signalweekRegistRequest.get("projectSeq")).orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        // 이미 있던 경우
        if (signalweekRepository.findByProject(project).isPresent()) {
            System.out.println("이미 있던 경우로 넘어옴");
            Signalweek signalweek = signalweekRepository.findByProject(project).get();
            if (!pptFile.isEmpty()) {
                // 피피티올리고
                ProjectFile prePptFile = signalweek.getPptFile();
                if (signalweek.getPptFile() != null) {
                    // 물리 피피티 파일 삭제
                    fileService.deleteImageFile(signalweek.getPptFile().getUrl());
                    ProjectFile newPptFile = fileService.registFile(pptFile, pptUploadDir);
                    prePptFile.setUrl(newPptFile.getUrl());
                    prePptFile.setType(newPptFile.getType());
                    prePptFile.setName(newPptFile.getName());
                    projectfileRepository.save(prePptFile);
                }
                // 시그널 위크 객체에 새로 할당
                signalweek.setPptFile(prePptFile);

            }

            if (!readmeFile.isEmpty()) {
                ProjectFile preReadmeFile = signalweek.getReadmeFile();
                // 이미 존재하는 릳미가 있으면 삭제
                if (signalweek.getReadmeFile() != null) {
                    // 물리 릳미 파일 삭제
                    fileService.deleteImageFile(signalweek.getReadmeFile().getUrl());
                    // 디비 삭제
                    ProjectFile newReadmeFile = fileService.registFile(readmeFile, readmeUploadDir);
                    preReadmeFile.setUrl(newReadmeFile.getUrl());
                    preReadmeFile.setName(newReadmeFile.getName());
                    preReadmeFile.setType(newReadmeFile.getType());
                    projectfileRepository.save(preReadmeFile);
                }
                signalweek.setReadmeFile(preReadmeFile);
            }

            signalweek.setTitle(signalweekRegistRequest.get("title").toString());
            signalweek.setUccUrl(signalweekRegistRequest.get("uccUrl").toString());
            signalweek.setDeployUrl(signalweekRegistRequest.get("deployUrl").toString());
            signalweek.setProject(projectRepository.findById((Integer) signalweekRegistRequest.get("projectSeq"))
                    .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND)));
            signalweek.setContent(signalweekRegistRequest.get("content").toString());

            signalweekRepository.save(signalweek);

            // 처음 생성인 경우
        } else {
            System.out.println("처음 생성으로 넘어옴");
            ProjectFile registPptFile = null;
            if (pptFile.getSize() >= 1) {
                registPptFile = fileService.registFile(pptFile, pptUploadDir);
                projectfileRepository.save(registPptFile);
            }

            ProjectFile registReadmeFile = null;
            if (readmeFile.getSize() >= 1) {
                registReadmeFile = fileService.registFile(readmeFile, readmeUploadDir);
                projectfileRepository.save(registReadmeFile);
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
                    .readmeFile(registReadmeFile)
                    .content(signalweekRegistRequest.get("content").toString())
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

        return SignalweekFindResponse.builder()
                .title(signalweek.getTitle())
                .pptUrl(signalweek.getPptFile().getUrl())
                .readmeUrl(signalweek.getReadmeFile().getUrl())
                .uccUrl(signalweek.getUccUrl())
                .deployUrl(signalweek.getDeployUrl())
                .vote(vote)
                .build();
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

//     띵예의 전당
    @Transactional(readOnly = true)
    public List<SignalweekRankFindResponse> findAllSiganlweekRank(Integer year, Integer quarter) {
        List<SignalweekSchedule> signalweekScheduleList = signalweekScheduleRepository.findByYearAndQuarter(year,quarter);
        Integer signalweekScheduleSeq = signalweekScheduleList.get(0).getSignalweekScheduleSeq();

        List<SignalweekRank> signalweekRankList = signalweekRankRepository.findAllBySignalweekScheduleSeq(signalweekScheduleSeq);

        List<SignalweekRankFindResponse> responseSignalweekRank = new ArrayList<>();

        for (SignalweekRank signalweekRank:signalweekRankList) {

            responseSignalweekRank.add(SignalweekRankFindResponse.builder()
                    .rank(signalweekRank.getRanking())
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

        List<List<Integer>> voteCntList = signalweekRankRepository.findByRank(nowQuarter);

        for (List<Integer> voteCnt:voteCntList.subList(0, 3)) {
            SignalweekRank signalweekRank = null;
            if (signalweekRepository.findBySignalweekSeq(voteCnt.get(0)).isPresent()) {
                signalweekRank = SignalweekRank.builder()
                        .signalweekScheduleSeq(nowQuarter)
                        .signalweek(signalweekRepository.findBySignalweekSeq(voteCnt.get(0)).get())
                        .ranking(voteCnt.get(2))
                        .build();
                signalweekRankRepository.save(signalweekRank);
            }

            List<ProjectUser> projectUserList = signalweekRank != null ? signalweekRank.getSignalweek().getProject().getProjectUserList() : null;

            int mul = Math.abs(voteCnt.get(2)-4);
            for (ProjectUser projectUser: projectUserList) {

                User rankUser = projectUser.getUser();
                rankUser.setHeartCnt(rankUser.getHeartCnt() + mul*100);

                UserHeartLog heartLog = UserHeartLog.builder()
                        .heartCnt(mul*100)
                        .userSeq(rankUser.getUserSeq())
                        .content("시그널 위크"+voteCnt.get(2)+"등")
                        .build();
                userHeartLogRepository.save(heartLog);
            }
        }
    }
}
