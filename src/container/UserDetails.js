const User = async (id) => {
  var url;
  if (id === undefined) {
    url = "http://localhost:3000/api/v1/users/info/me";
  } else {
    url = `http://localhost:3000/api/v1/users/info/${id}`;
  }
  const requestGetToken = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  try {
    const responseGetUser = await fetch(url, requestGetToken);

    const data = await responseGetUser.json();
    if (responseGetUser.ok) {
      return data;
    } else {
      console.error(responseGetUser.status, data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export default User;
