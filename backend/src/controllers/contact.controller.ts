import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Contact } from '../entities/contact/contact.entity';
import { ContactService } from '../services/contact.service';
import {
  CreateBodyDto,
  ReadAllQueryDto,
  UpdateContactBodyDto,
} from '../dtos/contact.dto';
import { RequestContextService } from '../services/requestContext.service';
import { JwtGuard } from '../utils/jwt.guard';
import { Organization } from '../entities/organization.entity';
import { LogService } from 'src/services/log.service';
import { EContactStatus, EEntityTypeLog } from 'src/utils/types';
import { StatusService } from '../services/status.service';
import { UpdateResult } from 'typeorm';
import { constants } from 'http2';
import { ContactStatus } from '../entities/contact/contactStatus.entity';

@UseGuards(JwtGuard)
@Controller('contacts')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly contextService: RequestContextService,
    private readonly logService: LogService,
    private readonly statusService: StatusService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  readAll(@Query() query: ReadAllQueryDto): Promise<Contact[]> {
    const { id } = this.contextService.get('organization') as Organization;

    const { size, sort, page, status } = query;

    return this.contactService.find({
      size,
      sort,
      page,
      organizationId: id,
      status,
    });
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async readOneById(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;

    const contact = await this.contactService.findOneById({
      id,
      organizationId: organization.id,
    });

    if (contact) return contact;

    throw new HttpException(
      'contact not found',
      constants.HTTP_STATUS_NOT_FOUND,
    );
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body: CreateBodyDto): Promise<Contact> {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;

    const status = await this.statusService.findOneByTitle({
      title: body.status,
    });

    const contact = this.contactService.createNewContactObject({
      name: body.name,
      email: body.email,
      phone: body.phone,
      statuses: [
        {
          status,
        },
      ],
    });

    return this.contactService.create({
      contact,
      organizationId: organization.id,
    });
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() contact: UpdateContactBodyDto,
  ): Promise<UpdateResult> {
    return this.contactService.updateOneById({
      id,
      contact,
    });
  }

  @Put(':id/status/:title')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('title', new ParseEnumPipe(EContactStatus)) title: EContactStatus,
  ): Promise<ContactStatus> {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;

    const status = await this.statusService.findOneByTitle({
      title,
    });

    if (!status)
      throw new HttpException(
        'status not found',
        constants.HTTP_STATUS_NOT_FOUND,
      );

    return this.contactService.updateStatus({
      status,
      id,
      organizationId: organization.id,
    });
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  delete(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    return this.contactService.delete({ id });
  }
}