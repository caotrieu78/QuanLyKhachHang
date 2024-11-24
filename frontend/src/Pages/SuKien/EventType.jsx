import React, { useState, useEffect } from "react";
import {
    getAllEventTypes,
    createEventType,
    updateEventType,
    deleteEventType,
} from "../../services/eventServices"; // Cập nhật service API tương ứng
import { PATHS } from "../../constant/pathnames";
import { NavLink } from "react-router-dom";

function EventType() {
    const [eventTypes, setEventTypes] = useState([]); // Danh sách loại sự kiện
    const [error, setError] = useState(""); // Lỗi
    const [selectedType, setSelectedType] = useState(null); // Loại sự kiện được chọn để sửa
    const [showAddEditModal, setShowAddEditModal] = useState(false); // Hiển thị modal thêm/sửa
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Hiển thị modal xóa
    const [newTypeName, setNewTypeName] = useState(""); // Giá trị tên loại sự kiện mới

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const eventTypesPerPage = 5; // Số lượng loại sự kiện trên mỗi trang

    // Fetch the list of event types
    useEffect(() => {
        const fetchEventTypes = async () => {
            try {
                const data = await getAllEventTypes();
                setEventTypes(data);
            } catch (err) {
                console.error("Error fetching event types:", err);
                setError("Không thể tải danh sách loại sự kiện.");
            }
        };

        fetchEventTypes();
    }, []);

    // Handle pagination logic
    const indexOfLastEventType = currentPage * eventTypesPerPage;
    const indexOfFirstEventType = indexOfLastEventType - eventTypesPerPage;
    const currentEventTypes = eventTypes.slice(indexOfFirstEventType, indexOfLastEventType);

    const totalPages = Math.ceil(eventTypes.length / eventTypesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    // Open add/edit modal
    const handleShowAddEditModal = (type = null) => {
        setSelectedType(type); // Nếu chỉnh sửa, chọn loại sự kiện
        setNewTypeName(type ? type.typeName : ""); // Điền giá trị tên loại sự kiện nếu chỉnh sửa
        setShowAddEditModal(true);
    };

    // Close add/edit modal
    const handleCloseAddEditModal = () => {
        setShowAddEditModal(false);
        setSelectedType(null);
        setNewTypeName("");
    };

    // Save event type (add or update)
    const handleSaveType = async () => {
        try {
            if (selectedType) {
                // Update event type
                await updateEventType(selectedType.eventTypeId, { typeName: newTypeName });
                setEventTypes((prev) =>
                    prev.map((type) =>
                        type.eventTypeId === selectedType.eventTypeId
                            ? { ...type, typeName: newTypeName }
                            : type
                    )
                );
            } else {
                // Add new event type
                const newType = await createEventType({ typeName: newTypeName });
                setEventTypes((prev) => [...prev, newType]);
            }
            handleCloseAddEditModal();
        } catch (err) {
            console.error("Error saving event type:", err);
            setError("Không thể lưu loại sự kiện.");
        }
    };

    // Confirm delete
    const handleDeleteType = async () => {
        try {
            await deleteEventType(selectedType.eventTypeId);
            setEventTypes((prev) =>
                prev.filter((type) => type.eventTypeId !== selectedType.eventTypeId)
            );
            setShowDeleteModal(false);
        } catch (err) {
            console.error("Error deleting event type:", err);
            setError("Không thể xóa loại sự kiện.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Danh sách loại sự kiện</h1>

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="gap-2 mb-3">
                <NavLink to={`${PATHS.EVENT}`} className="btn btn-primary flex-grow-1">
                    Quay Về Trang Quản Lý Sự Kiện
                </NavLink>
            </div>

            {/* Event Types Table */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Tên loại sự kiện</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEventTypes.length > 0 ? (
                            currentEventTypes.map((type) => (
                                <tr key={type.eventTypeId}>
                                    <td>{type.eventTypeId}</td>
                                    <td>{type.typeName}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => handleShowAddEditModal()}
                                        >
                                            Thêm
                                        </button>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleShowAddEditModal(type)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedType(type);
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    Không có loại sự kiện nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {/* Add/Edit Modal */}
            {showAddEditModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {selectedType ? "Sửa Loại Sự Kiện" : "Thêm Loại Sự Kiện"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseAddEditModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên loại sự kiện"
                                        value={newTypeName}
                                        onChange={(e) => setNewTypeName(e.target.value)}
                                    />
                                    <label htmlFor="newTypeName">Tên loại sự kiện</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleCloseAddEditModal}>
                                    Hủy
                                </button>
                                <button className="btn btn-primary" onClick={handleSaveType}>
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xóa Loại Sự Kiện</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDeleteModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Bạn có chắc chắn muốn xóa loại sự kiện{" "}
                                    <strong>{selectedType?.typeName}</strong>?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                                    Hủy
                                </button>
                                <button className="btn btn-danger" onClick={handleDeleteType}>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventType;
