import axios from "axios";

export default class PostService {
    static async getAll() {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/overviews`);
        return data;
    }

    static async getById(id) {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/overviews/${id}`);
        return data;
    }

    static async getTags() {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tags`);
        return data;
    }

    static async search(value) {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/overviews/search?q=${value}`);
        return data;
    }

    static async create(post) {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/overviews`, {...post }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        return data;
    }

    static async update(id, post) {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/overviews/${id}`, {...post });
        return data;
    }

    static async delete(id) {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/overviews/${id}`);
        return data;
    }
}