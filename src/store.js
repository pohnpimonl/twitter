const store = {
    state: {
        bgbegin: require('./assets/bg.jpg'),
        url: 'https://camt-twitterapi.pair-co.com',
        isMainpage: true,
        loginToken: null,
        isreopenForm: false,
        isloopenForm: false,
        ispiopenForm: false,
        ispropenForm: false,
        isgeopenForm: false,
        istwopenForm: false  
    },
    setLoginToken(loginToken) {
        this.state.loginToken = loginToken
    },
    reopenForm() {
        this.state.isreopenForm = true
    },
    recloseForm() {
        this.state.isreopenForm = false
    },
    loopenForm() {
        this.state.isloopenForm = true
    },
    locloseForm() {
        this.state.isloopenForm = false
    },
    piopenForm() {
        this.state.ispiopenForm = true
    },
    picloseForm() {
        this.state.ispiopenForm = false
    },
    propenForm() {
        this.state.ispropenForm = true
    },
    prcloseForm() {
        this.state.ispropenForm = false
    },
    gecloseForm() {
        this.state.isgeopenForm = false
    },
    twcloseForm() {
        this.state.istwopenForm = false
    }
}

export default store