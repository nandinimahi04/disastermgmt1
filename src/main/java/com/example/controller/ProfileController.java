package com.example.controller;

import com.example.entity.Profile;
import com.example.repository.ProfileRepository;
import com.example.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileRepository profileRepo;
    private final UserRepository userRepo;

    public ProfileController(ProfileRepository profileRepo, UserRepository userRepo) {
        this.profileRepo = profileRepo;
        this.userRepo = userRepo;
    }

    @PostMapping("/{userId}")
    public Profile createProfile(@PathVariable Long userId, @RequestBody Map<String, String> data) {
        Profile profile = new Profile();
        profile.setFullName(data.get("fullName"));
        profile.setPhone(data.get("phone"));
        profile.setLocation(data.get("location"));
        profile.setUser(userRepo.findById(userId).orElseThrow());
        return profileRepo.save(profile);
    }
}
