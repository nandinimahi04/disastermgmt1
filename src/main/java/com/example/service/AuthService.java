package com.example.service;

import com.example.entity.Profile;
import com.example.entity.User;
import com.example.repository.ProfileRepository;
import com.example.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final ProfileRepository profileRepository;

    public AuthService(UserRepository userRepository, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    public User register(String email, String password, String role, Map<String, String> profileData) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        User savedUser = userRepository.save(user);

        Profile profile = new Profile();
        profile.setUser(savedUser);
        profile.setFullName(profileData.get("fullName"));
        profile.setPhone(profileData.get("phone"));
        profile.setLocation(profileData.get("location"));

        if ("CITIZEN".equalsIgnoreCase(role)) {
            profile.setAddress(profileData.get("address"));
            profile.setBloodGroup(profileData.get("bloodGroup"));
            profile.setEmergencyContact(profileData.get("emergencyContact"));
        } else if ("RESPONDER".equalsIgnoreCase(role)) {
            profile.setOrganization(profileData.get("organization"));
            profile.setCertificationId(profileData.get("certificationId"));
            profile.setSkills(profileData.get("skills"));
        } else if ("ADMIN".equalsIgnoreCase(role)) {
            profile.setStaffId(profileData.get("staffId"));
            profile.setDepartment(profileData.get("department"));
        }

        profileRepository.save(profile);
        return savedUser;
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }
}
