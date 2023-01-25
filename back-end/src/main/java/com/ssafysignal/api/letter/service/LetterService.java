package com.ssafysignal.api.letter.service;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.letter.dto.response.FindLetterRes;
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
    public List<FindLetterRes> findFromLetter(int userSeq, int page, int size){
        List<Letter> letterList = letterRepository.findAllByFromUserSeqAndIsTrash(userSeq,false, PageRequest.of(page - 1, size, Sort.Direction.DESC, "letterSeq"));
        List<FindLetterRes> ret = new ArrayList<>();
        for(Letter letter: letterList){
            FindLetterRes element = FindLetterRes.builder()
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
    public List<FindLetterRes> findAllToLetter(int userSeq, int page, int size){
        List<Letter> letterList = letterRepository.findAllByToUserSeqAndIsTrash(userSeq,false, PageRequest.of(page - 1, size, Sort.Direction.DESC, "letterSeq"));
        List<FindLetterRes> ret = new ArrayList<>();
        for(Letter letter: letterList){
            FindLetterRes element = FindLetterRes.builder()
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
    public List<FindLetterRes> findAllTrashLetter(int userSeq, int page, int size){
        List<Letter> letterList = letterRepository.findAllByToUserSeqAndIsTrash(userSeq,true, PageRequest.of(page - 1, size, Sort.Direction.DESC, "letterSeq"));
        List<FindLetterRes> ret = new ArrayList<>();
        for(Letter letter: letterList){
            FindLetterRes element = FindLetterRes.builder()
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
    public FindLetterRes findLetter(int letterSeq){
        Letter letter = letterRepository.findByLetterSeq(letterSeq);
        if(letter == null) return null;
        if(!letter.isRead()) { //읽은 메시지로 변경
            letter.makeReadTrue();
            letterRepository.save(letter);
        }

        FindLetterRes res = FindLetterRes.builder()
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


}
