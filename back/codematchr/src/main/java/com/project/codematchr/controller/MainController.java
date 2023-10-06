package com.project.codematchr.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class MainController {
    
    // @RequestMapping 중 ("") Get method 에 대해서만 인식
    // API : 서버 오픈 여부 확인 메서드 (http://localhost:4040)
    @GetMapping("")
    public String serverOn() {
        return "server On...";
    }

}
