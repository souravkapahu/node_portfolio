export default () => ({
    mongoUri: process.env.MONGO_URI as string,
    cryptoSecret: process.env.CRYPTO_SECRET as string,
    jwtSecret: process.env.JWT_SECRET as string,
    jwtRefreshSecert: process.env.JWT_REFRESH_SECRET as string,
    xApiKey: process.env.X_API_KEY as string,
    smtpUser: process.env.SMTP_USER as string,
    smtpPassword: process.env.SMTP_PASSWORD as string,
    email: process.env.EMAIL as string,
    cloudName: process.env.CLOUD_NAME as string,
    cloudApiKey: process.env.CLOUD_API_KEY as string,
    cloudApiSecret: process.env.CLOUD_API_SECRET as string,
    encryptionAllowed: false,
    isLive: true
});