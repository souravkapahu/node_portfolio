import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

export const uploadToCloudinary = (
    file: Express.Multer.File,
    folder = 'uploads',
): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (!file || !file.buffer) return reject(new Error('Invalid file input'));

        const uploadStream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            },
        );

        try {
            const readable = new Readable();
            readable.push(file.buffer);
            readable.push(null);
            readable.pipe(uploadStream);
        } catch (error) {
            reject(error);
        }
    });
};