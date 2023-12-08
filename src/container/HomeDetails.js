const HomeDetails = async () => {
  const requestGetToken = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  try {
    const responseGetUser = await fetch(
      "http://localhost:3000/home/new-feed?page=0&pageSize=20",
      requestGetToken
    );

    const data = await responseGetUser.json();
    if (responseGetUser.ok) {
      console.log(data);
      return data;
    } else {
      console.error(responseGetUser.status, data.error);
    }
  } catch (error) {
    console.error(error);
  }
};
export default HomeDetails;
