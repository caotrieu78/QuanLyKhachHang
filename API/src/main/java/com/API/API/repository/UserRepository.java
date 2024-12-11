package com.API.API.repository;

import com.API.API.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    // Phương thức hỗ trợ tìm kiếm User theo username và password
    Optional<User> findByUsernameAndPassword(String username, String password);
}
