import React, { useState, useEffect } from "react";
import {
    getAllDepartments,
    createDepartment,
    deleteDepartment,
    updateDepartment,
} from "../../services/authService";
import { Modal, Button } from "react-bootstrap";

function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        departmentName: "",
        userId: "",
    });
    const [editingDepartmentId, setEditingDepartmentId] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    // Fetch all departments
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

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Add or update department
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDepartmentId) {
                // Update existing department
                await updateDepartment(editingDepartmentId, formData);
                setSuccessMessage("Department updated successfully!");
            } else {
                // Create new department
                await createDepartment(formData);
                setSuccessMessage("Department added successfully!");
            }

            // Refresh list and reset form
            const data = await getAllDepartments();
            setDepartments(data);
            setFormData({ departmentName: "", userId: "" });
            setEditingDepartmentId(null);
            setShowModal(false);
            setError("");
        } catch (err) {
            console.error("Error saving department:", err);
            setError("Failed to save department. Please try again.");
        }
    };

    // Delete department
    const handleDelete = async (id) => {
        try {
            await deleteDepartment(id);
            setSuccessMessage("Department deleted successfully!");
            setDepartments(departments.filter((dept) => dept.id !== id));
        } catch (err) {
            console.error("Error deleting department:", err);
            setError("Unable to delete department. Please try again.");
        }
    };

    // Edit department
    const handleEdit = (department) => {
        setFormData({
            departmentName: department.departmentName,
            userId: department.userId,
        });
        setEditingDepartmentId(department.id);
        setShowModal(true);
    };

    // Modal controls
    const handleShowModal = () => {
        setFormData({ departmentName: "", userId: "" });
        setEditingDepartmentId(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ departmentName: "", userId: "" });
        setEditingDepartmentId(null);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Danh Sách Phòng Ban</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Button to open modal */}
            <Button variant="primary" onClick={handleShowModal} className="mb-4">
                Thêm Phòng Ban
            </Button>

            {/* Department List */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Tên Phòng Ban</th>
                            <th>Người Phụ Trách (User ID)</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((department) => (
                            <tr key={department.id}>
                                <td>{department.id}</td>
                                <td>{department.departmentName}</td>
                                <td>{department.userId}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(department)}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(department.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for adding or editing department */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingDepartmentId ? "Cập Nhật Phòng Ban" : "Thêm Phòng Ban"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="departmentName" className="form-label">
                                Tên Phòng Ban
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="departmentName"
                                name="departmentName"
                                value={formData.departmentName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userId" className="form-label">
                                Người Phụ Trách (User ID)
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="userId"
                                name="userId"
                                value={formData.userId}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <Button variant="primary" type="submit">
                            {editingDepartmentId ? "Cập Nhật" : "Thêm"}
                        </Button>
                        <Button variant="secondary" onClick={handleCloseModal} className="ms-2">
                            Hủy
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DepartmentList;
