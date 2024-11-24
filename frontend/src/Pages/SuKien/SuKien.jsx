import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllEvents, deleteEvent } from "../../services/eventServices";
import { PATHS } from "../../constant/pathnames";

function Event() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [eventToDelete, setEventToDelete] = useState(null);
    const [eventDetails, setEventDetails] = useState(null); // Event details being viewed

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5; // Number of events per page

    // Fetch the list of events when the component mounts
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllEvents();
                setEvents(data);
            } catch (err) {
                setError("Không thể tải danh sách sự kiện.");
            }
        };

        fetchEvents();
    }, []);

    // Function to confirm deletion of an event
    const confirmDelete = (eventId) => {
        setEventToDelete(eventId);
    };

    // Handle deletion of an event
    const handleDelete = async () => {
        try {
            await deleteEvent(eventToDelete);
            setEvents((prevEvents) =>
                prevEvents.filter((event) => event.eventId !== eventToDelete)
            );
            setSuccessMessage("Sự kiện đã được xóa thành công!");
            setEventToDelete(null);
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            setError("Không thể xóa sự kiện.");
        }
    };

    // Function to show event details in a modal
    const viewEventDetails = (event) => {
        setEventDetails(event);
    };

    // Pagination logic
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalPages = Math.ceil(events.length / eventsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container">
            {/* Success Message */}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            {/* Add Event and View Event Types Buttons */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Danh sách sự kiện</h1>
                <div className="d-flex gap-2">
                    <NavLink to={PATHS.ADD_EVENT} className="btn btn-primary">
                        Thêm sự kiện
                    </NavLink>
                    <NavLink to={PATHS.EVENT_TYPES} className="btn btn-secondary">
                        Xem danh sách loại sự kiện
                    </NavLink>
                </div>
            </div>

            {/* Event Table */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Tên sự kiện</th>
                            <th>Khách hàng</th>
                            <th>Người phụ trách</th>
                            <th>Loại sự kiện</th>
                            <th>Ngày diễn ra</th>
                            <th>Mô tả</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEvents.map((event) => (
                            <tr key={event.eventId}>
                                <td>{event.eventId}</td>
                                <td>{event.eventName}</td>
                                <td>{event.customer?.name || "Không có khách hàng"}</td>
                                <td>{event.user?.fullName || "Không có người phụ trách"}</td>
                                <td>{event.eventType?.typeName || "Không có loại sự kiện"}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.description || "Không có mô tả"}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => viewEventDetails(event)}
                                    >
                                        Xem
                                    </button>
                                    <NavLink
                                        to={`${PATHS.EDIT_EVENT}/${event.eventId}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Sửa
                                    </NavLink>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => confirmDelete(event.eventId)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
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

            {/* Delete Confirmation Modal */}
            {eventToDelete && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    tabIndex="-1"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xác nhận xóa</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setEventToDelete(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa sự kiện này?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setEventToDelete(null)}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Event Details Modal */}
            {eventDetails && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Chi tiết sự kiện</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setEventDetails(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>ID:</strong> {eventDetails.eventId}</p>
                                <p><strong>Tên sự kiện:</strong> {eventDetails.eventName}</p>
                                <p><strong>Ngày diễn ra:</strong> {eventDetails.eventDate}</p>
                                <p><strong>Mô tả:</strong> {eventDetails.description}</p>
                                <p><strong>Khách hàng:</strong> {eventDetails.customer.name || "Không có"}</p>
                                <p><strong>Người phụ trách:</strong> {eventDetails.user.fullName || "Không có"}</p>
                                <p><strong>Loại sự kiện:</strong> {eventDetails.eventType.typeName || "Không có"}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setEventDetails(null)}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Event;
