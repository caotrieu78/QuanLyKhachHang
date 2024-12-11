package com.API.API.service;

import com.API.API.model.Department;
import com.API.API.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Optional<Department> getDepartmentById(Integer id) {
        return departmentRepository.findById(id);
    }

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Department updateDepartment(Integer id, Department updatedDepartment) {
        Optional<Department> existingDepartment = departmentRepository.findById(id);
        if (existingDepartment.isPresent()) {
            Department department = existingDepartment.get();
            department.setDepartmentName(updatedDepartment.getDepartmentName());
            return departmentRepository.save(department);
        } else {
            throw new RuntimeException("Department not found");
        }
    }

    public void deleteDepartment(Integer id) {
        departmentRepository.deleteById(id);
    }
}
