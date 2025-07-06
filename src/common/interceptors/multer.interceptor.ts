import { memoryStorage } from 'multer';

export const dynamicMulter = () => {
    return {
        storage: memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB
        },
    };
};