import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactRepository } from './contact.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ContactController],
  providers: [ContactService, ContactRepository],
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      { name: Contact.name, schema: ContactSchema },
    ])]
})
export class ContactModule { }
