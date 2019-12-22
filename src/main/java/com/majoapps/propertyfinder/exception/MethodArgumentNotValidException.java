package com.majoapps.propertyfinder.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
@SuppressWarnings("unused")
public class MethodArgumentNotValidException extends RuntimeException {
    private static final long serialVersionUID = 5658258491296608815L;

    private MethodArgumentNotValidException() {
        super();
    }

    public MethodArgumentNotValidException(String message) {
        super(message);
    }

    public MethodArgumentNotValidException(String message, Throwable cause) {
        super(message, cause);
    }
}
