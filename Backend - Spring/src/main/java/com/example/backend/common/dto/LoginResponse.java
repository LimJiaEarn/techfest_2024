package com.example.backend.common.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String tokenType = "Bearer";
    private String accessToken;
    private String refreshToken;
}
