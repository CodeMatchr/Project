package com.project.codematchr.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;

@RestControllerAdvice
public class BadRequestExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseDto> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException exception) {
        exception.printStackTrace();
        ResponseDto result = new ResponseDto(ResponseCode.REQUEST_PARAMETER_VALIDATION_FAIL , ResponseMessage.REQUEST_PARAMETER_VALIDATION_FAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
    
}
