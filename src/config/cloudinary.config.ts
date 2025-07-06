import { v2 as cloudinary } from 'cloudinary';
import configuration from './configuration';

const config = configuration();

cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.cloudApiKey,
    api_secret: config.cloudApiSecret,
});

export { cloudinary };