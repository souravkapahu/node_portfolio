import { ObjectId } from "mongoose";

export interface Profile {
    _id: ObjectId,
    name: string,
    email: string,
    phone: string,
    countryCode: string,
    about: string,
    jobTitle: string,
    image: string
}