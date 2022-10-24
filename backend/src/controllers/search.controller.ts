import { Controller, Delete, Get, Param } from '@nestjs/common';
import { SearchService } from 'src/services/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @Delete()
  deleteIndex() {
    this.searchService.deleteIndex();
  }

  @Get(":query")
  async find(@Param('query') query: string) {
    return this.searchService.search(query)
  }
}
