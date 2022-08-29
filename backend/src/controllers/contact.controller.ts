import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Contact } from '../entities/contact.entity';
import { ContactService } from '../services/contact.service';
import { FindOneContactByIdDto } from '../dtos/contact.dto';
import { RequestContextService } from '../services/requestContext.service';
import { SecureUserWithOrganization } from '../utils/types';
import { JwtGuard } from '../utils/jwt.guard';
import {Organization} from "../entities/organization.entity";

@Controller('contacts')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly contextService: RequestContextService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  getAllContacts(): Promise<Contact[]> {
    const user = this.contextService.get(
      'userData',
    ) as SecureUserWithOrganization;

    console.log({user})

    return this.contactService.getAllContact();
  }

  @Get(':id')
  findOneContactById(@Param() param: FindOneContactByIdDto): Promise<Contact> {
    return this.contactService.findOneContactById(param.id);
  }

  @Post()
  addContact(@Body() contact): Promise<Contact> {
    const organization = this.contextService.get('organization')
    //const organizationId = organization.id
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXX',organization)
    return this.contactService.addContact(contact,333);
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
