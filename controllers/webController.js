const webControllers = {
    inicio: (req, res) => {
        res.sendFile("index.html", { root: "./public/views" });
    },
    login: (req, res) => {
        res.sendFile("login.html", { root: "./public/views" });
    },
    loginError: (req, res) => {
        res.sendFile("errorLogin.html", { root: "./public/views" });
    },
    logout: (req, res) => {
        res.sendFile("logout.html", { root: "./public/views" });
    },
    signup: (req, res) => {
        res.sendFile("signup.html", { root: "./public/views" });
    },
    signupError: (req, res) => {
        res.sendFile("errorSignup.html", { root: "./public/views" });
    },
    info: (req, res) => {
        res.sendFile("info.html", { root: "./public/views" });
    },
    infoZip: (req, res) => {
        res.sendFile("infoZip.html", { root: "./public/views" });
    },
    random: (req, res) => {
        res.sendFile("random.html", { root: "./public/views" });
    },
};

export default webControllers;
