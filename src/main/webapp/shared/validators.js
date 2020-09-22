
export const validateEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
        return false;
    } else return true;
};

export const validatePassword = (pass) => {
    const regex = /^(?=.{8,}$)(?=.*?[A-Z])(?=.*?[0-9]).*$/;
    if (regex.test(pass)) {
        return true;
    } else return false;
};