package com.ssafysignal.api.letter.service;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.letter.dto.response.FindLetterResponse;
import com.ssafysignal.api.letter.entity.Letter;
import com.ssafysignal.api.letter.repository.LetterRepository;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LetterService {
    private final LetterRepository letterRepository;
    private  final UserRepository userRepository;

    @Transactional
    public User findUserSeq(String nickname){
        User toUser = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        return toUser;
    }

    @Transactional
    public Letter registLetter(Letter letter){
        return letterRepository.save(letter);
    }

    @Transactional
    public List<FindLetterResponse> findFromLetter(int userSeq){
        List<Letter> letterList = letterRepository.findAllByFromUserSeqAndIsTrashOrderByLetterSeqDesc(userSeq,false);

        List<FindLetterResponse> ret = new ArrayList<>();
        for(Letter letter: letterList){
            FindLetterResponse element = FindLetterResponse.builder()
                    .letterSeq(letter.getLetterSeq())
                    .toNickname(letter.getToUser().getNickname())
                    .fromNickname(letter.getFromUser().getNickname())
                    .title(letter.getTitle())
                    .content(letter.getContent())
                    .isRead(letter.isRead())
                    .regDt(letter.getRegDt())
                    .build();
            ret.add(element);
        }
        return ret;
    }

    @Transactional
    public List<FindLetterResponse> findAllToLetter(int userSeq){
        List<Letter> letterList = letterRepository.findAllByToUserSeqAndIsTrashOrderByLetterSeqDesc(userSeq,false);
        List<FindLetterResponse> ret = new ArrayList<>();
        for(Letter letter: letterList){
            FindLetterResponse element = FindLetterResponse.builder()
                    .letterSeq(letter.getLetterSeq())
                    .toNickname(letter.getToUser().getNickname())
                    .fromNickname(letter.getFromUser().getNickname())
                    .title(letter.getTitle())
                    .content(letter.getContent())
                    .isRead(letter.isRead())
                    .regDt(letter.getRegDt())
                    .build();
            ret.add(element);
        }
        return ret;
    }

    @Transactional
    public List<FindLetterResponse> findAllTrashLetter(int userSeq){
        List<Letter> letterList = letterRepository.findAllByToUserSeqAndIsTrashOrderByLetterSeqDesc(userSeq,true);
        List<FindLetterResponse> ret = new ArrayList<>();
        for(Letter letter: letterList){
            FindLetterResponse element = FindLetterResponse.builder()
                    .letterSeq(letter.getLetterSeq())
                    .toNickname(letter.getToUser().getNickname())
                    .fromNickname(letter.getFromUser().getNickname())
                    .title(letter.getTitle())
                    .content(letter.getContent())
                    .isRead(letter.isRead())
                    .regDt(letter.getRegDt())
                    .build();
            ret.add(element);
        }
        return ret;
    }

    @Transactional
    public FindLetterResponse findLetter(int letterSeq){
        Letter letter = letterRepository.findByLetterSeq(letterSeq);
        if(letter == null) return null;
        if(!letter.isRead()) { //읽은 메시지로 변경
            letter.makeReadTrue();
            letterRepository.save(letter);
        }

        FindLetterResponse res = FindLetterResponse.builder()
                .letterSeq(letter.getLetterSeq())
                .toNickname(letter.getToUser().getNickname())
                .fromNickname(letter.getFromUser().getNickname())
                .title(letter.getTitle())
                .content(letter.getContent())
                .isRead(letter.isRead())
                .regDt(letter.getRegDt())
                .build();
        return res;
    }

    @Transactional
    public Letter deleteLetter(int letterSeq){
        Letter letter = letterRepository.findByLetterSeq(letterSeq);
        if(letter == null || letter.isTrash()==true) return null;
        letter.makeTrashTrue();
        letterRepository.save(letter);
        return letter;
    }

    @Transactional
    public Long countNotReadLetter(int userSeq){
        return letterRepository.countByToUserSeqAndIsRead(userSeq, false);
    }

}
