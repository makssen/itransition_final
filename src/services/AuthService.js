import axios from "axios";
import jwtDecode from "jwt-decode";

export default class AuthService {
    static async signUp(username, email, password) {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
            username,
            email,
            password
        });
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token);
    }

    static async signIn(email, password) {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            email,
            password
        });
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token);
    }

    static async check() {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/auth/check`, {
            headers: { 'Authorization': localStorage.getItem('token') }
        });
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token);
    }


    static async getUser(id) {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`);
        return data;
    }
}