package com.project.codematchr.common.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class CustomResponse {
    public static final ResponseEntity<?> serviceUnavailable = ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("컨트롤러 손봐야지");
}
