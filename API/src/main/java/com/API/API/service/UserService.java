package com.API.API.service;

import com.API.API.model.User;
import com.API.API.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Lấy tất cả User
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Lấy User theo ID
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    // Tạo mới User
    public User createUser(User user) {
        validateDepartmentName(user.getDepartmentName());
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating user", e);
        }
    }

    // Cập nhật User
    public User updateUser(Integer id, User updatedUser) {
        validateDepartmentName(updatedUser.getDepartmentName());

        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setFullName(updatedUser.getFullName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());

            // Cập nhật departmentName nếu có
            if (updatedUser.getDepartmentName() != null) {
                user.setDepartmentName(updatedUser.getDepartmentName().trim());
            }

            try {
                return userRepository.save(user);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update user", e);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    // Xóa User theo ID
    public void deleteUser(Integer id) {
        try {
            if (userRepository.existsById(id)) {
                userRepository.deleteById(id);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete user", e);
        }
    }

    // Đăng nhập User
    public Optional<User> login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    // Kiểm tra departmentName
    private void validateDepartmentName(String departmentName) {
        if (departmentName == null || departmentName.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Department name is required");
        }
    }
}
