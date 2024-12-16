import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getAllDepartments } from "../../services/authService"; // Import API
import { PATHS } from "../../constant/pathnames"; // Import PATHS

function AddUser() {
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        role: "",
        password: "",
        departmentName: "", // Change to departmentName
    });

    const [departments, setDepartments] = useState([]); // State for departments
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Fetch departments
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getAllDepartments();
                setDepartments(data);
            } catch (err) {
                console.error("Error fetching departments:", err);
                setError("Unable to fetch departments.");
            }
        };
        fetchDepartments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting user:", formData); // Debugging payload
        try {
            await createUser(formData); // Call API
            setMessage("User added successfully!");
            setFormData({
                username: "",
                fullName: "",
                email: "",
                role: "",
                password: "",
                departmentName: "",
            });
            setError("");
            setTimeout(() => {
                navigate(PATHS.USER);
            }, 1000);
        } catch (err) {
            console.error("Error adding user:", err);
            setError("Failed to add user. Please try again.");
            setMessage("");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Thêm User</h1>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        className="form-select"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="departmentName" className="form-label">Phòng Ban</label>
                    <select
                        className="form-select"
                        id="departmentName"
                        name="departmentName"
                        value={formData.departmentName}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Chọn Phòng Ban</option>
                        {departments.map((dept) => (
                            <option key={dept.departmentId} value={dept.departmentName}>
                                {dept.departmentName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add User</button>
            </form>
        </div>
    );
}

export default AddUser;
