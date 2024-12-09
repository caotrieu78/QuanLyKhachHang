import React, { useEffect, useState } from "react";
import { getAllNotifications } from "../../services/eventNotificationServices";

function Remaind() {
    const [groupedNotifications, setGroupedNotifications] = useState({});
    const [error, setError] = useState("");
    const [sortConfig, setSortConfig] = useState({ column: null, order: "asc" });

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getAllNotifications();

                // Nhóm thông báo theo sự kiện
                const grouped = data.reduce((acc, notification) => {
                    const eventName = notification.eventUser.event.eventType.eventTypeName;
                    const eventDate = notification.eventUser.event.eventDate;

                    const eventKey = `${eventName} - ${new Date(eventDate).toLocaleDateString()}`;
                    if (!acc[eventKey]) acc[eventKey] = [];
                    acc[eventKey].push(notification);
                    return acc;
                }, {});

                setGroupedNotifications(grouped);
            } catch (err) {
                setError("Không thể tải danh sách thông báo.");
            }
        };

        fetchNotifications();
    }, []);

    const handleSort = (column, keyExtractor) => {
        const newOrder = sortConfig.column === column && sortConfig.order === "asc" ? "desc" : "asc";
        setSortConfig({ column, order: newOrder });

        const sortFunction = (a, b) => {
            const valueA = keyExtractor(a) ?? "";
            const valueB = keyExtractor(b) ?? "";
            if (valueA < valueB) return newOrder === "asc" ? -1 : 1;
            if (valueA > valueB) return newOrder === "asc" ? 1 : -1;
            return 0;
        };

        const updatedGroups = Object.fromEntries(
            Object.entries(groupedNotifications).map(([key, notifications]) => [
                key,
                [...notifications].sort(sortFunction),
            ])
        );

        setGroupedNotifications(updatedGroups);
    };

    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="table-responsive">
            <h2 className="text-center">Danh Sách Thông Báo Theo Sự Kiện</h2>

            {Object.entries(groupedNotifications).map(([eventKey, notifications], index) => (
                <div key={index} className="mb-5">
                    <h3>{eventKey}</h3>
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th onClick={() => handleSort("notificationId", (n) => n.notificationId)}>
                                    ID {sortConfig.column === "notificationId" && (sortConfig.order === "asc" ? "↑" : "↓")}
                                </th>
                                <th onClick={() => handleSort("manager", (n) => n.eventUser.user.fullName)}>
                                    Người Phụ Trách {sortConfig.column === "manager" && (sortConfig.order === "asc" ? "↑" : "↓")}
                                </th>
                                <th onClick={() => handleSort("customer", (n) => n.eventUser.customer.name)}>
                                    Khách Hàng {sortConfig.column === "customer" && (sortConfig.order === "asc" ? "↑" : "↓")}
                                </th>
                                <th onClick={() => handleSort("status", (n) => n.status)}>
                                    Trạng Thái {sortConfig.column === "status" && (sortConfig.order === "asc" ? "↑" : "↓")}
                                </th>
                                <th onClick={() => handleSort("method", (n) => n.method)}>
                                    Hình Thức Thông Báo {sortConfig.column === "method" && (sortConfig.order === "asc" ? "↑" : "↓")}
                                </th>
                                <th onClick={() => handleSort("sentAt", (n) => n.sentAt || "")}>
                                    Thời Gian Gửi {sortConfig.column === "sentAt" && (sortConfig.order === "asc" ? "↑" : "↓")}
                                </th>
                                <th onClick={() => handleSort("message", (n) => n.message)}>
                                    Nội Dung {sortConfig.column === "message" && (sortConfig.order === "asc" ? "↑" : "↓")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map((notification, idx) => (
                                <tr key={notification.notificationId}>
                                    <td>{notification.notificationId}</td>
                                    <td>{notification.eventUser.user.fullName}</td>
                                    <td>{notification.eventUser.customer.name}</td>
                                    <td>{notification.status}</td>
                                    <td>{notification.method}</td>
                                    <td>
                                        {notification.sentAt
                                            ? new Date(notification.sentAt).toLocaleString()
                                            : "Chưa gửi"}
                                    </td>
                                    <td>{notification.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default Remaind;
