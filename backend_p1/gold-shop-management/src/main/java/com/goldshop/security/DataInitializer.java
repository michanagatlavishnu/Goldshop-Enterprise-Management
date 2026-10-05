package com.goldshop.security;

import com.goldshop.entity.GoldRate;
import com.goldshop.entity.User;
import com.goldshop.entity.UserRole;
import com.goldshop.repository.GoldRateRepository;
import com.goldshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final GoldRateRepository goldRateRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${BOOTSTRAP_ADMIN_EMAIL:admin@goldshop.com}")
    private String adminEmail;

    @Value("${BOOTSTRAP_ADMIN_PASSWORD:GoldShopAdmin@2026!Secure}")
    private String adminPassword;

    @Value("${BOOTSTRAP_MANAGER_EMAIL:manager@goldshop.com}")
    private String managerEmail;

    @Value("${BOOTSTRAP_MANAGER_PASSWORD:GoldShopManager@2026!Secure}")
    private String managerPassword;

    @Value("${BOOTSTRAP_STAFF_EMAIL:staff@goldshop.com}")
    private String staffEmail;

    @Value("${BOOTSTRAP_STAFF_PASSWORD:GoldShopStaff@2026!Secure}")
    private String staffPassword;

    public DataInitializer(UserRepository userRepository, GoldRateRepository goldRateRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.goldRateRepository = goldRateRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        createUserIfNotExists(adminEmail, adminPassword, "System Admin", UserRole.ADMIN);
        createUserIfNotExists(managerEmail, managerPassword, "System Manager", UserRole.MANAGER);
        createUserIfNotExists(staffEmail, staffPassword, "System Staff", UserRole.STAFF);
        
        initGoldRate();
    }

    private void initGoldRate() {
        if (goldRateRepository.count() == 0) {
            GoldRate rate = new GoldRate();
            rate.setGold24(7500.0);
            rate.setGold22(6900.0);
            rate.setGold18(5700.0);
            rate.setSilver(90.0);
            rate.setYesterdayGold22(6850.0);
            rate.setLastUpdated(LocalDateTime.now());
            goldRateRepository.save(rate);
        }
    }

    private void createUserIfNotExists(String email, String password, String name, UserRole role) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isEmpty()) {
            User user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setName(name);
            user.setRole(role);
            user.setEnabled(true);
            userRepository.save(user);
        }
    }
}
