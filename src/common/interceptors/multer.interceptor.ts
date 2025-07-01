import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const dynamicMulter = (folder: string) => {
    const destination = join(__dirname, `../../../public/${folder}`);

    // Ensure destination directory exists
    if (!existsSync(destination)) {
        mkdirSync(destination, { recursive: true });
    }

    return {
        storage: diskStorage({
            destination: `public/${folder}`,
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
        limits: {
            fileSize: 5 * 1024 * 1024, // 5 MB limit
        }
    };
};