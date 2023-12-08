function ValidateToken() {
  if (localStorage.getItem("token") == null) {
    return false;
  }
  return true;
}
export default ValidateToken;
