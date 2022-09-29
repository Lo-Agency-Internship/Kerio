import { Controller, Delete, Get } from '@nestjs/common';
import { SearchService } from 'src/services/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  

  @Delete()
  deleteIndex() {
    this.searchService.deleteIndex();
  }
}
