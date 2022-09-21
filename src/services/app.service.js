export class AppService {
    static required(event, field, message) {
        if (field == null || field === '') {
            this.createErrorElement(event, message);
            return event.target.classList.add('required');
        } else {
            this.removeErrorElement(event);
            return event.target.classList.remove('required');
        }
    }

    static maxLength(event, field, length, message) {
        if (field.length > length) {
            this.createErrorElement(event, message);
            return event.target.classList.add('invalid');
        } else {
            this.removeErrorElement(event);
            return event.target.classList.remove('invalid');
        }
    }

    static minLength(event, field, length, message) {
        if (field.length < length) {
            this.createErrorElement(event, message);
            return event.target.classList.add('invalid');
        } else {
            this.removeErrorElement(event);
            return event.target.classList.remove('invalid');
        }
    }

    static createErrorElement(event, message) {
        const parentNode = event.target.parentNode;
        if (!this.findChildNodeByClassName(parentNode.childNodes, 'max')) {
            const small = document.createElement('small');
            small.setAttribute('class', 'error max');
            const textNode = document.createTextNode(message);
            small.appendChild(textNode);
            parentNode.appendChild(small);
        }
    }

    static removeErrorElement(event) {
        const parentNode = event.target.parentNode;
        const childNode = this.findChildNodeByClassName(parentNode.childNodes, 'max');
        if (childNode) {
            parentNode.removeChild(childNode);
        }
    }


    static isValidEmail(event, field, message) {
        const isValidated = (!validator.isEmpty(field) && validator.isEmail(field));

        if (!isValidated) {
            this.createErrorElement(event, message);
            return event.target.classList.add('invalid');
        } else {
            this.removeErrorElement(event);
            return event.target.classList.remove('invalid');
        }
    }

    static checkNumber(value) {
        return /^[0-9]+$/.test(value);
    }

    static onlyNumbers(event, value, message) {
        const isValidated = /^[0-9]+$/.test(value);
        if (!isValidated) {
            this.createErrorElement(event, message);
            return event.target.classList.add('invalid');
        } else {
            this.removeErrorElement(event);
            return event.target.classList.remove('invalid');
        }
    }

    static checkPassword(value) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/.test(value);
    }

    static isValidPassword(event, value, message) {
        const isValidated = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/.test(value);
        if (!isValidated) {
            this.createErrorElement(event, message);
            return event.target.classList.add('invalid');
        } else {
            this.removeErrorElement(event);
            return event.target.classList.remove('invalid');
        }
    }

    static isPasswordMatch(event, pass, confirmPass, message) {
        const isValidated = (!validator.isEmpty(pass) && !validator.isEmpty(confirmPass) && validator.equals(pass, confirmPass));
        if (!isValidated) {
            this.createErrorElement(event, message);
            return event.target.classList.add('invalid') && event.target.classList.add('required');
        } else {
            this.removeErrorElement(event);
            return event.target.classList.remove('invalid') && event.target.classList.remove('required');
        }
    }

    static handleError(httpErrRes, navigate) {

        if (httpErrRes.status === 400) {
            toast.error(httpErrRes.data.message);
        } else if (httpErrRes.status === 401) {
            this.tokenExpired(navigate);
            toast.error(httpErrRes.data.message);
        } else if (httpErrRes.status === 409) {
            toast.error(httpErrRes.message);
        } else if (httpErrRes.status === 406) {
            this.tokenExpired(navigate);
        } else if (httpErrRes.status === 422) {
            toast.error(httpErrRes.data.message);
        } else {
            toast.error(httpErrRes);
        }
    }
}

