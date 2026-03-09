package com.example.disastermgmt.controllers;

import com.example.disastermgmt.models.Role;
import com.example.disastermgmt.models.User;
import com.example.disastermgmt.payload.request.LoginRequest;
import com.example.disastermgmt.payload.request.RegisterRequest;
import com.example.disastermgmt.payload.response.JwtResponse;
import com.example.disastermgmt.payload.response.MessageResponse;
import com.example.disastermgmt.repositories.UserRepository;
import com.example.disastermgmt.security.jwt.JwtUtils;
import com.example.disastermgmt.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().iterator().next().getAuthority();

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                role));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        Role role = Role.ROLE_CITIZEN;
        if (signUpRequest.getRole() != null) {
            if (signUpRequest.getRole().equalsIgnoreCase("ADMIN")) {
                role = Role.ROLE_ADMIN;
            } else if (signUpRequest.getRole().equalsIgnoreCase("RESPONDER")) {
                role = Role.ROLE_RESPONDER;
            }
        }

        User user = new User(
                signUpRequest.getName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                role,
                signUpRequest.getPhone(),
                signUpRequest.getRegion());

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
