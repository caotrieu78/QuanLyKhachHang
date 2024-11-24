import React, { useState, useEffect } from 'react';
import { createEvent } from '../../services/eventServices';
import { getAllUsers } from '../../services/authService';
import { getAllCustomers } from '../../services/customerServices';
import { getAllEventTypes } from '../../services/eventServices';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constant/pathnames';

const AddEvent = () => {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [userId, setUserId] = useState('');
    const [eventTypeId, setEventTypeId] = useState('');
    const [message, setMessage] = useState('');
    const [customers, setCustomers] = useState([]);
    const [users, setUsers] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customersResponse = await getAllCustomers();
                setCustomers(customersResponse);

                const usersResponse = await getAllUsers();
                setUsers(usersResponse.filter(user => user.role !== 'admin'));

                const eventTypesResponse = await getAllEventTypes();
                setEventTypes(eventTypesResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEvent = {
            eventName,
            description,
            eventDate,
            customer: { customerId: parseInt(customerId) },
            user: { userId: parseInt(userId) },
            eventType: { eventTypeId: parseInt(eventTypeId) }
        };

        try {
            await createEvent(newEvent);
            setMessage('Event created successfully!');
            navigate(PATHS.EVENT); // Navigate to the event list page
        } catch (error) {
            setMessage('Error creating event: ' + error.message);
        }
    };

    const handleUserSelect = (user) => {
        setUserId(user.userId);
        setSelectedUser(user);
        setShowUserModal(false);
    };

    const handleCustomerSelect = (customer) => {
        setCustomerId(customer.customerId);
        setSelectedCustomer(customer);
        setShowCustomerModal(false);
    };

    const toggleUserModal = () => {
        setShowUserModal(!showUserModal);
    };

    const toggleCustomerModal = () => {
        setShowCustomerModal(!showCustomerModal);
    };

    const handleEventTypeChange = (e) => {
        setEventTypeId(e.target.value);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 display-4">Tạo Sự Kiện Mới</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <label htmlFor="eventName" className="h4">Tên Sự Kiện</label>
                    <input
                        id="eventName"
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="form-control form-control-lg"
                        required
                        placeholder="Nhập tên sự kiện"
                    />
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="description" className="h4">Mô Tả</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control form-control-lg"
                        required
                        placeholder="Nhập mô tả sự kiện"
                    />
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="eventDate" className="h4">Ngày Diễn Ra</label>
                    <input
                        id="eventDate"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="form-control form-control-lg"
                        required
                    />
                </div>

                {/* Customer Button */}
                <div className="form-group mb-4">
                    <label className="h4 ">Khách Hàng</label>
                    <button type="button" onClick={toggleCustomerModal} className="btn btn-outline-primary btn-lg btn-block ms-4">
                        {selectedCustomer ? `${selectedCustomer.name}` : 'Chọn Khách Hàng'}
                    </button>
                </div>

                {/* Modal for selecting customer */}
                {showCustomerModal && (
                    <div className="modal show" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Chọn Khách Hàng</h5>
                                    <button type="button" className="close" onClick={toggleCustomerModal}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Tên</th>
                                                <th>Email</th>
                                                <th>Số điện thoại</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customers.map((customer) => (
                                                <tr key={customer.customerId}>
                                                    <td>{customer.name}</td>
                                                    <td>{customer.email}</td>
                                                    <td>{customer.phone}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-success"
                                                            onClick={() => handleCustomerSelect(customer)}
                                                        >
                                                            Chọn
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleCustomerModal}>
                                        Đóng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Display selected customer info */}
                {selectedCustomer && (
                    <div className="customer-selection-info mt-3">
                        <h5 className="h4">Thông Tin Khách Hàng</h5>
                        <h5><strong>Tên:</strong> {selectedCustomer.name}</h5>
                        <h5><strong>Email:</strong> {selectedCustomer.email}</h5>
                        <h5><strong>Số điện thoại:</strong> {selectedCustomer.phone}</h5>
                        <button
                            type="button"
                            onClick={() => setSelectedCustomer(null)}
                            className="btn btn-outline-primary btn-lg"
                        >
                            Chọn Lại Khách Hàng
                        </button>
                    </div>
                )}

                {/* User Button */}
                <div className="form-group mb-4 mt-4">
                    <label className="h4">Người Phụ Trách</label>
                    <button type="button" onClick={toggleUserModal} className="btn btn-outline-primary btn-lg btn-block ms-4">
                        {selectedUser ? `${selectedUser.username}` : 'Chọn Người Phụ Trách'}
                    </button>
                </div>

                {/* Modal for selecting user */}
                {showUserModal && (
                    <div className="modal show" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Chọn Người Phụ Trách</h5>
                                    <button type="button" className="close" onClick={toggleUserModal}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Tên người dùng</th>
                                                <th>Họ tên</th>
                                                <th>Vai trò</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.filter(user => user.role !== 'Admin').map((user) => (
                                                <tr key={user.userId}>
                                                    <td>{user.username}</td>
                                                    <td>{user.fullName}</td>
                                                    <td>{user.role}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-success"
                                                            onClick={() => handleUserSelect(user)}
                                                        >
                                                            Chọn
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleUserModal}>
                                        Đóng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Display selected user info */}
                {selectedUser && (
                    <div className="user-selection-info mt-3">
                        <h5 className="h4">Thông Tin Người Phụ Trách</h5>
                        <h5><strong>Tên:</strong> {selectedUser.username}</h5>
                        <h5><strong>Vai trò:</strong> {selectedUser.role}</h5>
                        <button
                            type="button"
                            onClick={() => setSelectedUser(null)}
                            className="btn btn-outline-primary btn-lg"
                        >
                            Chọn Lại Người Phụ Trách
                        </button>
                    </div>
                )}

                <div className="form-group mb-4">
                    <label className="h4">Loại Sự Kiện</label>
                    <select
                        value={eventTypeId}
                        onChange={handleEventTypeChange}
                        className="form-control form-control-lg"
                        required
                    >
                        <option value="">Chọn Loại Sự Kiện</option>
                        {eventTypes.map((eventType) => (
                            <option key={eventType.eventTypeId} value={eventType.eventTypeId}>
                                {eventType.typeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group mb-4">
                    <button type="submit" className="btn btn-primary btn-lg btn-block">Tạo Sự Kiện</button>
                </div>
            </form>

            {message && <p className="text-center mt-3">{message}</p>}
        </div>
    );
};

export default AddEvent;
