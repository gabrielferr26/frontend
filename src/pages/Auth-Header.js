export default function authHeader() {
    const funcionario = JSON.parse(localStorage.getItem('funcionario'))

    console.log(funcionario.token)

    if (funcionario && funcionario.token) {
        return { Authorization: 'Bearer ' + funcionario.token }
    }
    else {
        return {}
    }
}