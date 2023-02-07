package com.ssafysignal.api.signalweek.repository;

import com.ssafysignal.api.signalweek.entity.SignalweekRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SignalweekRankRepository extends JpaRepository<SignalweekRank, Integer> {
    List<SignalweekRank> findAllBySignalweekScheduleSeq(Integer signalweekScheduleSeq);

    @Query(value = "SELECT signalweek_seq, count(signalweek_seq), row_number() over (order by count(signalweek_seq) DESC) as ranking\n"
            + "from signalweek_vote \n"
            + "where signalweek_seq in (\n"
            + "   select signalweek_seq \n"
            + "    from signalweek\n"
            + "    where signalweek_schedule_seq = (:scheduleSeq) \n"
            + ")\n" + "group by signalweek_seq;", nativeQuery = true)
    List<List<Integer>> findByRank(@Param("scheduleSeq") Integer signalweekScheduleSeq);
}
