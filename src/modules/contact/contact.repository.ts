import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './schemas/contact.schema';
import { Model } from 'mongoose';

@Injectable()
export class ContactRepository {
    constructor(
        @InjectModel(Contact.name) private readonly Contact: Model<Contact>,
    ) { }

    async insert(data: any) {
        return await this.Contact.create(data)
    }
}