const ImgDetails = async ({postId, type}) => {
  const requestGetToken = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  try {
    const responseGetImg = await fetch(
      `http://localhost:3000/api/v1/posts/img?id=${postId}&type=${type}`,
      requestGetToken
    );

    const data = await responseGetImg.json();
    if (responseGetImg.ok) {
      console.log(data);
      return data;
    } else {
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export default ImgDetails;
