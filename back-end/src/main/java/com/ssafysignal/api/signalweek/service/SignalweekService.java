package com.ssafysignal.api.signalweek.service;

import com.ssafysignal.api.common.entity.File;
import com.ssafysignal.api.common.repository.FileRepository;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.signalweek.dto.request.SignalweekRegistRequest;
import com.ssafysignal.api.signalweek.entity.Signalweek;
import com.ssafysignal.api.signalweek.entity.SignalweekSchedule;
import com.ssafysignal.api.signalweek.repository.SignalweekRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekScheduleRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SignalweekService {

    private final SignalweekRepository signalweekRepository;
    private final SignalweekScheduleRepository signalweekScheduleRepository;
    private final FileRepository fileRepository;

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

    @Transactional(readOnly = true)
    public List<Signalweek> findAllSignalweek() {
        List<Signalweek> signalweekList =  signalweekRepository.findAll();

        return signalweekList;
    }

    @Transactional(readOnly = true)
    public Signalweek findSignalweek(Integer signalweekSeq) {
        Signalweek signalweek = signalweekRepository.findBySignalweekSeq(signalweekSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        return signalweek;
    }

    @Transactional
    public void deleteSignalweek(Integer signalweekSeq) {
        Signalweek signalweek = signalweekRepository.findById(signalweekSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        signalweekRepository.delete(signalweek);
    }
}
