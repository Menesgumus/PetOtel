package com.ankarapethouse.api.security;

import com.ankarapethouse.api.auth.User;
import com.ankarapethouse.api.auth.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminSeedRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdminSeedRunner.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin-seed.enabled:false}")
    private boolean seedEnabled;

    @Value("${app.admin-seed.username:admin}")
    private String adminUsername;

    @Value("${app.admin-seed.email:admin@ankarapethouse.com}")
    private String adminEmail;

    @Value("${app.admin-seed.password:admin}")
    private String adminPassword;

    public AdminSeedRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!seedEnabled) {
            logger.info("Admin seed is disabled. Skipping default admin creation.");
            return;
        }

        User admin = userRepository.findByEmailOrUsername(adminEmail, adminUsername).orElse(new User());

        admin.setUsername(adminUsername);
        admin.setEmail(adminEmail);
        admin.setPasswordHash(passwordEncoder.encode(adminPassword));
        admin.setRole("ROLE_ADMIN");
        admin.setEnabled(true);
        userRepository.save(admin);

        logger.info("Development admin user created/updated: {}", adminUsername);
        logger.warn("IMPORTANT: Please change the default admin password in production!");
    }
}
