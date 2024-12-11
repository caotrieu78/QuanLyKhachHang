package com.API.API.service;

import com.API.API.model.User;
import com.API.API.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        return userRepository.save(user);
    }

    // Cập nhật User
    public User updateUser(Integer id, User updatedUser) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setFullName(updatedUser.getFullName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // Xóa User theo ID
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    // Đăng nhập User
    public Optional<User> login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }
}
