package com.ssafysignal.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class controller {

    @GetMapping("/test")
    public String test() {
        return new Date().toString();
    }
}
