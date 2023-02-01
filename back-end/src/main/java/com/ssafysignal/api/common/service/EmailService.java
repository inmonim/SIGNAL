package com.ssafysignal.api.common.service;

import javax.mail.internet.MimeMessage;

import com.ssafysignal.api.common.dto.EmailDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Service
@RequiredArgsConstructor
public class EmailService {
    @Value("${spring.mail.username}")
    private String sendAddress;
    @Value("${spring.mail.template.name}")
    private String templateName;
    private final JavaMailSender emailSender;
    private final SpringTemplateEngine templateEngine;

    public void sendMail(EmailDto emailDto) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(emailDto.getReceiveAddress());

        Context context = new Context();
        context.setVariable("text", emailDto.getText());
        context.setVariable("content", emailDto.getContent());
        context.setVariable("url", String.format("%s:%s%s", emailDto.getHost(), emailDto.getPort(), emailDto.getUrl()));

        String html = templateEngine.process(templateName, context);

        helper.setSubject(emailDto.getTitle());
        helper.setText(html, true);
        emailSender.send(message);
    }
}
