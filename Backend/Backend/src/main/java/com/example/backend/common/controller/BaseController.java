package com.example.backend.common.controller;

import com.example.backend.common.exception.InvalidPrincipalException;
import com.example.backend.security.UserPrincipal;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BaseController {
    public long getLoginUserId(UserPrincipal principal) throws InvalidPrincipalException {
        if (principal == null) {
            throw new InvalidPrincipalException("Empty or unknown login credentials.");
        }
        return principal.getId();
    }
}
