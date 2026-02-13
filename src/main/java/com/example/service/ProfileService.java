package com.example.service;

import com.example.entity.Profile;
import com.example.entity.User;
import com.example.repository.ProfileRepository;
import com.example.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public Profile createProfile(Long userId, String fullName, String phone, String location) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = new Profile();
        profile.setFullName(fullName);
        profile.setPhone(phone);
        profile.setLocation(location);
        profile.setUser(user);

        return profileRepository.save(profile);
    }
}