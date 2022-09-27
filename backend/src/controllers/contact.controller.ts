import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Contact } from '../entities/contact.entity';
import { ContactService } from '../services/contact.service';
import { AddContactDto, FindOneContactByIdDto } from '../dtos/contact.dto';
import { RequestContextService } from '../services/requestContext.service';
import { JwtGuard } from '../utils/jwt.guard';
import { Organization } from '../entities/organization.entity';
import { LogService } from 'src/services/log.service';
import { EEntityTypeLog } from 'src/utils/types';

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
  getAllContacts(
    @Query() query: { status: string; page: number; size: number },
  ): Promise<Contact[]> {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;

    const { page } = query;
    const { size } = query;

    const organizationId = organization.id;
    if (!query.status) {
      return this.contactService.getAllContact(
        organizationId,
        Number(page),
        Number(size),
      );
    }

    return this.contactService.getContactsFilteredByStatus(
      query.status,
      organizationId,
      Number(page),
      Number(size),
    );
  }

  @Get(':id')
  findOneContactById(@Param() param: FindOneContactByIdDto): Promise<Contact> {
    return this.contactService.findOneContactById(param.id.toString());
  }

  @Post()
  addContact(@Body() body: AddContactDto): Promise<Contact> {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;
    const organizationId = organization.id;
    body = { ...body, organizationId };

    this.logService.addLog({
      title: 'Add Contact Successfully',
      description: `The email this Contact is ${body.email}, phone number is ${body.phone}, name is ${body.name} and Organization is ${organization.name} `,
      entityType: 'AddContact',
      entityId: EEntityTypeLog.AddContact,
      event: 'Contact',
    });
    return this.contactService.addContact(body);
  }

  @Put(':id')
  updateContact(@Param() param, @Body() contact): Promise<Contact> {
    this.logService.addLog({
      title: 'Update Contact Successfully',
      description: `Contact with id=${param.id} Updated Successfully `,
      entityType: 'Update Contact',
      entityId: EEntityTypeLog.UpdateContact,
      event: 'Contact',
    });
    return this.contactService.updateContact(param.id, contact);
  }

  @Delete(':id')
  deleteContact(@Param() param): Promise<Contact> {
    this.logService.addLog({
      title: 'Delete Contact Successfully',
      description: `Contact with id=${param.id} Deleted Successfully `,
      entityType: 'Delete Contact',
      entityId: EEntityTypeLog.DeleteContact,
      event: 'Contact',
    });
    return this.contactService.deleteContact(param.id);
  }
}
