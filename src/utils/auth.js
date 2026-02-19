export const checkAdminAuth = (navigate) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    navigate("/admin/login");
  }
};
