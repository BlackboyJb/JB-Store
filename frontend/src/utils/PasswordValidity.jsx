// Check Password Validity Manually
export const checkPasswordValidityManual = (inputValue) => {
    const validationData = {
        upperCase: false,
        lowerCase: false,
        number: false,
        specialCharacter: false,
        length: false
    };

    // Check if password contains at least one uppercase letter
    if (!inputValue.match(/[A-Z]/)) {
        validationData.upperCase = false;
    } else {
        validationData.upperCase = true;
    }

    // Check if password contains at least one lowercase letter
    if (!inputValue.match(/[a-z]/)) {
        validationData.lowerCase = false;
    } else {
        validationData.lowerCase = true;
    }

    // Check if password contains at least one number
    if (!inputValue.match(/[0-9]/)) {
        validationData.number = false;
    } else {
        validationData.number = true;
    }

    // Check if password contains at least one special character
    if (!inputValue.match(/[!@#$%^&*(),.?":{}|<>]/)) {
        validationData.specialCharacter = false;
    } else {
        validationData.specialCharacter = true;
    }

    // Check if password is at least 8 characters long
    if (inputValue.length < 8) {
        validationData.length = false;
    } else {
        validationData.length = true;
    }

    return validationData;
};
