package com.API.API.service;

import com.API.API.model.Department;
import com.API.API.model.User;
import com.API.API.repository.DepartmentRepository;
import com.API.API.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

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
        if (user.getDepartment() != null && user.getDepartment().getDepartmentId() != null) {
            // Lấy department từ database
            Department department = departmentRepository.findById(user.getDepartment().getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            user.setDepartment(department);
        } else {
            user.setDepartment(null);
        }
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
            user.setRole(updatedUser.getRole());

            // Cập nhật department nếu có
            if (updatedUser.getDepartment() != null) {
                Optional<Department> department = departmentRepository.findById(updatedUser.getDepartment().getDepartmentId());
                department.ifPresent(user::setDepartment);
            }

            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // Xóa User
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    // Đăng nhập User
    public Optional<User> login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }
}
