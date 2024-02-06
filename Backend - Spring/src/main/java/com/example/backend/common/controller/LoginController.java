package com.example.backend.common.controller;

import com.example.backend.common.dto.LoginRequest;
import com.example.backend.common.service.LoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Slf4j
public class LoginController extends BaseController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        super();
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(loginService.login(loginRequest));
        } catch (Exception e) {
            log.error("Internal error occurred when login", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal error occurred: " + e.getMessage());
        }
    }
}
