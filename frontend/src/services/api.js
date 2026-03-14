const API_BASE_URL = "/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(payload.message || `Request failed with status ${response.status}`);
  }

  return payload;
};

const getEquipmentList = async (query = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      searchParams.append(key, value);
    }
  });

  const suffix = searchParams.size ? `?${searchParams.toString()}` : "";
  return request(`/equipment${suffix}`);
};

const createEquipment = async (equipment) =>
  request("/equipment", {
    method: "POST",
    body: JSON.stringify(equipment)
  });

const createBooking = async (booking) =>
  request("/bookings", {
    method: "POST",
    body: JSON.stringify(booking)
  });

const loginUser = async (userId) =>
  request("/users/login", {
    method: "POST",
    body: JSON.stringify({ userId })
  });

const registerUser = async (userId) =>
  request("/users/register", {
    method: "POST",
    body: JSON.stringify({ userId })
  });

const deleteEquipment = async (id, ownerId) =>
  request(`/equipment/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ ownerId })
  });

const rateEquipment = async (id, userId, rating) =>
  request(`/equipment/${id}/rate`, {
    method: "POST",
    body: JSON.stringify({ userId, rating })
  });

const createBatchBookings = async (bookings) =>
  request("/bookings/batch", {
    method: "POST",
    body: JSON.stringify({ bookings })
  });

const getMyBookings = async (renterId) =>
  request(`/bookings?renterId=${encodeURIComponent(renterId)}`);

export { API_BASE_URL, getEquipmentList, createEquipment, createBooking, loginUser, registerUser, deleteEquipment, rateEquipment, createBatchBookings, getMyBookings };

