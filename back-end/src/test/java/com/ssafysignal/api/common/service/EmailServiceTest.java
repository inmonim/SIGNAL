package com.ssafysignal.api.common.service;

import com.ssafysignal.api.common.dto.EmailDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EmailServiceTest {

    @Autowired
    private EmailService emailService;

    @Test
    void sendMail() {
        try {
            emailService.sendMail(
                    EmailDto.builder()
                            .receiveAddress("tablemin_park@daum.net")
                            .title("이메일전송테스트")
                            .text("이메일 전송")
                            .host("http://localhost:80")
                            .url("auth/test")
                            .build());
            assertTrue(true);
        } catch (Exception e) {
            assertFalse(true);
        }
    }
}