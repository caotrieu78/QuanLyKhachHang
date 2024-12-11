package com.API.API.controller;

import com.API.API.model.User;
import com.API.API.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Lấy tất cả Users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Lấy User theo ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Tạo User mới
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (!isDepartmentNameValid(user.getDepartmentName())) {
            return ResponseEntity.badRequest().body("Department name is required");
        }
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.status(201).body(createdUser);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating user: " + e.getMessage());
        }
    }

    // Cập nhật User
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody User updatedUser) {
        if (!isDepartmentNameValid(updatedUser.getDepartmentName())) {
            return ResponseEntity.badRequest().body("Department name is required");
        }
        try {
            User user = userService.updateUser(id, updatedUser);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body("Error updating user: " + e.getMessage());
        }
    }

    // Xóa User
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting user: " + e.getMessage());
        }
    }

    // Đăng nhập User
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestParam String username, @RequestParam String password) {
        Optional<User> user = userService.login(username, password);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.status(401).build());
    }

    // Kiểm tra hợp lệ departmentName
    private boolean isDepartmentNameValid(String departmentName) {
        return departmentName != null && !departmentName.trim().isEmpty();
    }
}
