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
import { JwtGuard } from '../utils/jwt.guard';
import { Organization } from '../entities/organization.entity';
import { LogService } from 'src/services/log.service';

@UseGuards(JwtGuard)
@Controller('contacts')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly contextService: RequestContextService,
    private readonly logService: LogService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  getAllContacts(): Promise<Contact[]> {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;

    const organizationId = organization.id;
    return this.contactService.getAllContact(organizationId);
  }

  @Get(':id')
  findOneContactById(@Param() param: FindOneContactByIdDto): Promise<Contact> {
    return this.contactService.findOneContactById(param.id.toString());
  }

  @Post()
  addContact(@Body() contact): Promise<Contact> {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;
    const organizationId = organization.id;
    contact = { ...contact, organizationId };
    this.logService.addLog({title:'Add Contact Succssfully',description:`${contact} Contact , Registered Successfully `,entityType: 'Contact',entityId: 3,event: 'Add Contact'});
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
