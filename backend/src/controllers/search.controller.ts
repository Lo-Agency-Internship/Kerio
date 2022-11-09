import { Controller, Delete, Get, Query } from '@nestjs/common';
import { SearchService } from 'src/services/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Delete()
  deleteIndex() {
    this.searchService.deleteIndex();
  }

  @Get()
  async find(@Query('search') query: string) {
    return this.searchService.search(query);
  }
}
