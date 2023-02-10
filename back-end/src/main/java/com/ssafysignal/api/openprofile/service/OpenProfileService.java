package com.ssafysignal.api.openprofile.service;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.openprofile.dto.response.FindAllOpenProfile;
import com.ssafysignal.api.openprofile.dto.response.FindAllOpenProfileRes;
import com.ssafysignal.api.openprofile.entity.OpenProfile;
import com.ssafysignal.api.openprofile.repository.OpenProfileRepository;
import com.ssafysignal.api.profile.dto.response.ProfileBasicResponse;
import com.ssafysignal.api.profile.service.ProfileService;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OpenProfileService {
    private final OpenProfileRepository openProfileRepository;
    private final UserRepository userRepository;
    private final ProfileService profileService;

    @Transactional
    public void registOpenProfile(int userSeq){
        userRepository.findByUserSeq(userSeq)
            .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        if(openProfileRepository.findByUserSeq(userSeq) !=null)
                throw new NotFoundException(ResponseCode.REGIST_ALREADY);
        OpenProfile openProfile = OpenProfile.builder()
                .userSeq(userSeq)
                .build();
        openProfileRepository.save(openProfile);
    }

    @Transactional(readOnly = true)
    public FindAllOpenProfileRes findAllOpenProfile(int size, int page){
        Page<OpenProfile> openProfileList = openProfileRepository.findAll(PageRequest.of(page - 1, size, Sort.Direction.DESC, "openProfileSeq"));

        List<FindAllOpenProfile> profileList = new ArrayList<>();
        for(OpenProfile openProfile : openProfileList){
            int userSeq = openProfile.getUserSeq();
            User user = userRepository.findByUserSeq(userSeq).get();
            String nickname = user.getNickname();
            String imageUrl = user.getImageFile().getUrl();
            ProfileBasicResponse profileBasic =profileService.findProfile(userSeq);

            FindAllOpenProfile profile = FindAllOpenProfile.builder()
                    .userSeq(userSeq)
                    .nickname(nickname)
                    .regDt(openProfile.getRegDt())
                    .userPositionList(profileBasic.getUserPositionList())
                    .userSkillList(profileBasic.getUserSkillList())
                    .userCareerList(profileBasic.getUserCareerList())
                    .userExpList(profileBasic.getUserExpList())
                    .imageUrl(imageUrl)
                    .build();
            profileList.add(profile);
        }

        FindAllOpenProfileRes openProfileRes = FindAllOpenProfileRes.builder()
                .openProfileList(profileList)
                .totalNum(openProfileList.getTotalElements())
                .totalPage(openProfileList.getTotalPages())
                .build();
        return openProfileRes;

    }
}
