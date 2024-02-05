package com.example.backend.common.model;

import lombok.*;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    private Long id;
    private String name;
    private String username;
    private String password;
}
