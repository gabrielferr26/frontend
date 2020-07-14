import axios from 'axios'


class AuthService {
    login(email, password) {
        return axios
            .post("https://glacial-stream-93235.herokuapp.com/login", { email, password })
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('funcionario', JSON.stringify(res.data))

                }
                return res.data

            }, reason => { throw new Error('Utilizador Inválido') })
    }

    logout() {
        localStorage.removeItem('funcionario'); localStorage.removeItem('funcionario'); localStorage.removeItem('expire');
    }
    getCurrentUser() { return JSON.parse(localStorage.getItem('funcionario')) }
}

export default new AuthService()