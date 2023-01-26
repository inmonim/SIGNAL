package com.ssafysignal.api.letter.repository;

import com.ssafysignal.api.letter.dto.response.FindLetterRes;
import com.ssafysignal.api.letter.entity.Letter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Integer> {
    List<Letter> findAllByFromUserSeqAndIsTrash(int userSeq, boolean isTrash, PageRequest pg);

    List<Letter> findAllByToUserSeqAndIsTrash(int userSeq, boolean isTrash, PageRequest pg);

    Letter findByLetterSeq(int letterSeq);
    Long countByToUserSeqAndIsRead(int userSeq, boolean isRead);
}
