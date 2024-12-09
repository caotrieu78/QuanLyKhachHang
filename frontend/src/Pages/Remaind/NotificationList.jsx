import React, { useState, useEffect } from "react";
import { getAllNotifications, sendNotification } from "../../services/eventNotificationServices";

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    eventDate: "",
    location: "",
    message: ""
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const data = await getAllNotifications();
        setNotifications(data);
      } catch (err) {
        setError("Không thể tải danh sách thông báo.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const openModal = (notificationId) => {
    setSelectedNotificationId(notificationId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      eventName: "",
      description: "",
      eventDate: "",
      location: "",
      message: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendNotification = async () => {
    const { eventName, description, eventDate, location, message } = formData;
  
    if (!eventName.trim() || !description.trim() || !eventDate.trim() || !location.trim() || !message.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
  
    setLoading(true);
    setError("");
    setSuccessMessage("");
  
    try {
      const sentAt = new Date().toISOString();
      await sendNotification(selectedNotificationId, { eventName, description, eventDate, location, message, sentAt });
  
      setSuccessMessage("Thông báo đã được gửi thành công!");
      setNotifications((prev) =>
        prev.map((n) =>
          n.notificationId === selectedNotificationId
            ? { ...n, status: "Success", sentAt, message }
            : n
        )
      );
      closeModal();
    } catch (err) {
      setError("Không thể gửi thông báo. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">Danh Sách Gửi Thông Báo</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Người Phụ Trách</th>
            <th>Khách Hàng</th>
            <th>Nội Dung Thông Báo</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, idx) => (
            <tr key={notification.notificationId}>
              <td>{idx + 1}</td>
              <td>{notification.eventUser.user.fullName}</td>
              <td>{notification.eventUser.customer.name}</td>
              <td>{notification.message || "Chưa có nội dung"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => openModal(notification.notificationId)}
                  disabled={notification.status === "Success"}
                >
                  {notification.status === "Success" ? "Đã gửi" : "Gửi thông báo"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Gửi Thông Báo</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="eventName" className="form-label">Tên Sự Kiện</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên sự kiện..."
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Mô Tả</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="2"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Nhập mô tả sự kiện..."
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="eventDate" className="form-label">Ngày Diễn Ra</label>
                  <input
                    type="date"
                    className="form-control"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Địa Điểm</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Nhập địa điểm..."
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Nội Dung Thông Báo</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Nhập nội dung thông báo..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Hủy
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSendNotification}>
                  Gửi Thông Báo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationList;