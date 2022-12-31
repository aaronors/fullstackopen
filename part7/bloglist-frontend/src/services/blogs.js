import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const updateLikes = (blogObject) => {
    const request = axios.put(`${baseUrl}/${blogObject.id}`, {likes: blogObject.likes + 1});
    return request.then((response) => response.data);
};

const remove = async (blogObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.delete(`${ baseUrl }/${blogObject.id}`, config);
    return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, updateLikes, remove };
