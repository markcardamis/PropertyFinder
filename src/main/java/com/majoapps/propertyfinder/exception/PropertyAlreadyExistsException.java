package com.majoapps.propertyfinder.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@ResponseStatus(value=HttpStatus.CONFLICT)
@SuppressWarnings("unused")
public class PropertyAlreadyExistsException extends RuntimeException {
    private static final long serialVersionUID = 5658218491296608815L;

    private PropertyAlreadyExistsException() {
        super();
    }

    public PropertyAlreadyExistsException(String message) {
        super(message);
    }

    public PropertyAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
