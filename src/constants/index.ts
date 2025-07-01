import authConstant from './auth'
import profileConstant from './profile'
import skillConstant from './skill'
import projectConstant from './project'
import socialHandleConstant from './socialHandle'

export const constants = {
    maxRequest: 'Too many requests',
    notFound: 'Invalid API endpoint. Please verify the URL for the Endura project and try again.',
    validData: 'Please enter valid data',
    userOnline: 'User online',
    userOffline: 'User offline',

    //codes
    successCode: 200,
    errorCode: 400,
    unauthorized: 401,
    forbidden: 403,
    unavailable: 451,

    DBSetup: (status: boolean) => `DB setup ${status ? 'done' : 'error'}`,
}

export const envFiles = {
    dev: 'dev',
    stage: 'stage',
    prod: 'prod',
    build: 'build'
}

export const serveFolder = {
    src: 'src',
    dist: 'dist'
}

export const deviceTypes = {
    ios: 'ios',
    android: 'android',
    web: 'web'
}

export const mailSubjects = {
    resetPassword: 'Reset Password',
    otp: 'Your OTP Code',
}

export { projectConstant, socialHandleConstant, skillConstant, profileConstant, authConstant }