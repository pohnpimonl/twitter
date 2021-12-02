const store = {
    state: {
        bgbegin: require('./assets/bg.jpg'),
        isMainpage: true,
        loginToken: null,
    },
    setLoginToken(loginToken) {
        this.state.loginToken = loginToken
    },
}

export default store