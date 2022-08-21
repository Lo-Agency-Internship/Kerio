import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Contact } from '../entities/contact.entity';
import { ContactService } from '../services/contact.service';
import { FindOneContactByIdDto } from '../dtos/contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findAllContancts(): Promise<Contact[]> {
    return this.contactService.findAllContact();
  }

  @Get(':id')
  findOneContact(@Param() param: FindOneContactByIdDto): Promise<Contact> {
    return this.contactService.findOneContact(param.id);
  }

  @Post()
  addContact(@Body() contact): Promise<Contact> {
    return this.contactService.addContact(contact);
  }

  @Put(':id')
  updateContact(@Param() param, @Body() contact): Promise<Contact> {
    return this.contactService.updateContact(param.id, contact);
  }

  @Delete(':id')
  deleteContact(@Param() param): Promise<Contact> {
    return this.contactService.deleteContact(param.id);
  }
}
