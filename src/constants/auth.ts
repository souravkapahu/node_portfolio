const auth = {
    noAuth: 'Authorization token required.',
    notAuthorized: 'You are not authorised to perform this task',
    tokenExpire: 'Token Expired',
    noAccount: 'No account registered with this username',
    ownAccountBlock: 'Your account has been blocked by admin',
    ownAccountDelete: 'Your account has been deleted by admin',
    loggedInAnotherDevice: 'Your account has been logged into on another device.',
    phoneAlreadyExist: 'This phone number already exist.',
    phoneNotExist: 'This phone numbet not exist in DB.',
    invalidOtp: "Invalid Otp, please try again.",
    emailAlreadyExist: "This email has already exist in DB.",
    invalidEmailOrPass: 'Please enter valid email or password.',
    resendOtp: 'Otp resent successfully.',
    register: 'User register successfully.',
    loggedIn: 'Logged-in successfully.',
    invalidApiKey: 'Invalid API Key',
    accountNotVerified: 'Your account is not verified yet, Please verify first before request.',
    resetPassword: 'Password has been reset successfully.',
    logout: 'Logged-out successfully.',


    phoneEmailAlExist: (isEmail: boolean) => `This ${isEmail ? 'email address' : 'phone number'} already exist.`,
    validEmailNPhone: (isEmail: boolean) => `Please enter valid ${isEmail ? 'email address' : 'phone number'} or password.`,
    validateOtp: (valid: boolean) => valid ? `Otp verified successfully.` : 'Invalid Otp.',
    otpSent: (forgot: boolean) => `${forgot ? 'Forgot otp' : 'Otp'} sent successfully.`,
}

export default { auth }