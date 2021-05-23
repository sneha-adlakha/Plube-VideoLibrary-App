import axios from "axios";

export const serverRequestHandler = async (url, reqtype, post = null) => {
  switch (reqtype) {
    case "GET":
      try {
        const { data, status } = await axios.get(url);
        if (status === 200) {
          return { response: data, error: false };
        } else {
          throw new Error("No Data Fetched");
        }
      } catch (error) {
        return { response: error, error: true };
      }
    case "POST":
      try {
        const { data, status } = await axios.post(url, postdata);
        if (status === 201) {
          return { response: data, error: false };
        } else {
          throw new Error("Data Can't be Added");
        }
      } catch (error) {
        return { response: error, error: true };
      }
    default:
      return null;
  }
};
