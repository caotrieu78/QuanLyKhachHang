import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser, getAllDepartments } from "../../services/authService";

function EditUser() {
    const { id } = useParams(); // Get user ID from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        role: "",
        departmentId: "", // Thêm departmentId vào formData
    });
    const [departments, setDepartments] = useState([]); // State lưu danh sách phòng ban
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // State for success message

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUserById(id);
                setFormData({
                    ...user,
                    departmentId: user.department?.departmentId || "", // Gán departmentId
                });

                const deptData = await getAllDepartments();
                setDepartments(deptData);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Unable to fetch user or departments.");
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Lấy departmentId và tạo payload
            const selectedDepartment = departments.find(
                (dept) => dept.departmentId === parseInt(formData.departmentId, 10)
            );

            const updatedData = {
                ...formData,
                department: {
                    departmentId: selectedDepartment?.departmentId || null,
                },
            };

            // Gọi API cập nhật user
            await updateUser(id, updatedData);
            setSuccessMessage("User updated successfully!");
            setError("");

            // Chuyển hướng sau khi cập nhật thành công
            setTimeout(() => {
                setSuccessMessage("");
                navigate("/user");
            }, 2000);
        } catch (err) {
            console.error("Error updating user:", err);
            setError("Unable to update user.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="container mt-4">
            <h1>Sửa User</h1>

            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                        className="form-select"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Phòng Ban</label>
                    <select
                        className="form-select"
                        name="departmentId"
                        value={formData.departmentId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Chọn Phòng Ban</option>
                        {departments.map((dept) => (
                            <option key={dept.departmentId} value={dept.departmentId}>
                                {dept.departmentName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Cập nhật</button>
            </form>
        </div>
    );
}

export default EditUser;
