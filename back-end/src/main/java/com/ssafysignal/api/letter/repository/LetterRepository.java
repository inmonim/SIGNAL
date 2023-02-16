package com.ssafysignal.api.letter.repository;

import com.ssafysignal.api.letter.entity.Letter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Integer> {
    List<Letter> findAllByFromUserSeqAndIsTrashOrderByLetterSeqDesc(int userSeq, boolean isTrash);

    List<Letter> findAllByToUserSeqAndIsTrashOrderByLetterSeqDesc(int userSeq, boolean isTrash);

    Letter findByLetterSeq(int letterSeq);
    Long countByToUserSeqAndIsRead(int userSeq, boolean isRead);
}
