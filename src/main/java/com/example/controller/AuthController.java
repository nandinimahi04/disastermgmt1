package com.example.controller;

import com.example.entity.User;
import com.example.security.JwtUtil;
import com.example.service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public User register(@RequestBody Map<String, String> data) {
        return authService.register(
                data.get("email"),
                data.get("password"),
                data.get("role"),
                data);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> data) {
        User user = authService.login(data.get("email"), data.get("password"));
        String token = jwtUtil.generateToken(user.getId(), user.getRole());
        return Map.of("token", token);
    }
}
