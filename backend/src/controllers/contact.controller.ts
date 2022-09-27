import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Contact } from '../entities/contact.entity';
import { ContactService } from '../services/contact.service';
import { AddContactDto } from '../dtos/contact.dto';
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
    @Query() query: { status: string; pageNumber: number; perPage: number },
  ): Promise<Contact[]> {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;

    const { pageNumber } = query;
    const { perPage } = query;

    const organizationId = organization.id;
    if (!query.status) {
      return this.contactService.getAllContact(
        organizationId,
        Number(pageNumber),
        Number(perPage),
      );
    }

    return this.contactService.getContactsFilteredByStatus(
      query.status,
      organizationId,
      Number(pageNumber),
      Number(perPage),
    );
  }

  @Get(':id')
  async findOneContactById(
    @Param('id', ParseIntPipe) id:number,
  ): Promise<Contact> {
    const organization = this.contextService.get('organization');
    const organizationId = organization.id;
    const contact = await this.contactService.findOneContactById(
      id,
      organizationId,
    );
    if (contact.length === 0) {
      throw new HttpException(
        `the contact does not exist in this organization`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return contact[0];
  }

  @Post()
  addContact(@Body() body: AddContactDto): Promise<Contact> {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;

    const contact = this.contactService.createNewContact({})
    
    return this.contactService.createContact(contact);
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
