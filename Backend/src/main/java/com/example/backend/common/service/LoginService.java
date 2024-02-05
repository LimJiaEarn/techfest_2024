package com.example.backend.common.service;

import com.example.backend.common.dto.LoginRequest;
import com.example.backend.common.dto.LoginResponse;
import com.example.backend.common.exception.InvalidPrincipalException;
import com.example.backend.common.model.Users;
import com.example.backend.common.repository.UserRepository;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.security.UserPrincipal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class LoginService implements UserDetailsService {

    //    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    public LoginService(/*PasswordEncoder passwordEncoder, */JwtTokenProvider tokenProvider, UserRepository userRepository) {
//        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
    }

    public LoginResponse login(LoginRequest loginRequest) throws Exception {
        try {
            log.info("Try to login: {}", loginRequest.getUsername());
            Users user = this.userRepository.findUserByUsername(loginRequest.getUsername());
            if (user == null) {
                throw new InvalidPrincipalException("Empty or unknown login credentials.");
            }
//            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
//                throw new InvalidPrincipalException("Empty or unknown login credentials.");
//            }
            String accessToken = tokenProvider.generateAccessToken(user.getId());
            String refreshToken = tokenProvider.generateRefreshToken(user.getId());

            this.userRepository.save(user);
            return new LoginResponse("", accessToken, refreshToken);

        } catch (AuthenticationException e) {
            // Handle authentication failure
            throw new InvalidPrincipalException("Invalid username or password");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = this.userRepository.findUserByUsername(username);
        return new UserPrincipal(user.getId(), user.getName(), user.getUsername(), "", null);
    }

    public UserDetails loadUserById(Long userId) {
        Users user = this.userRepository.findById(userId).orElseThrow();
        return new UserPrincipal(user.getId(), user.getName(), user.getUsername(), "", null);
    }
}
