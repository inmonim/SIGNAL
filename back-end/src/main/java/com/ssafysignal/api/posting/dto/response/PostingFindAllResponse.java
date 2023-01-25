package com.ssafysignal.api.posting.dto.response;

import com.ssafysignal.api.project.entity.Project;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Data
@ApiModel(value = "PostingFindAllResponse", description = "공고 목록")
public class PostingFindAllResponse {
    @Schema(description = "공고 목록", required = true)
    private List<PostingFindAllResponseItem> postingList;

    private PostingFindAllResponse(final List<PostingFindAllResponseItem> postingList) {
        this.postingList = postingList;
    }

    public static PostingFindAllResponse fromEntity(final Page<Project> findPostingList) {
        List<PostingFindAllResponseItem> postingList = findPostingList.stream()
                .map(PostingFindAllResponseItem::fromEntity)
                .collect(Collectors.toList());
        return new PostingFindAllResponse(postingList);
    }
}
