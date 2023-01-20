package com.ssafysignal.api.posting.dto.request;

import com.ssafysignal.api.posting.entity.PostingMeeting;
import com.ssafysignal.api.posting.entity.PostingQuestion;
import com.ssafysignal.api.posting.entity.PostingSkill;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class RegistPostingRequest {

    private Integer userSeq;
    private String subject;
    private Integer localCode;
    private Integer fieldCode;
    private boolean isContact;
    private Integer term;
    private String content;
    private LocalDateTime postingEndDt;
    private Integer level;
    private List<Map<String, Object>> postingMeetingList;
    private List<Map<String, Object>> postingPositionList;
    private List<Map<String, Object>> postingQuestionList;
    private List<Map<String, Object>> postingSkillList;

}
