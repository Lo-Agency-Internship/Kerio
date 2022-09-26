import { Controller, Get, UseGuards } from '@nestjs/common';
import { SearchService } from 'src/services/search.service';


@Controller('search')
export class SearchController{

    constructor(
        private readonly searchService:SearchService,
    ){}

    @Get()
    addDocument(){
        const res = this.searchService.addDocument([
        { id: 1, name: 'mahsa', email:'mahsa@d.com',phone:'443234566',status:'Lead',organizationId:1 },
        { id: 2, name: 'minoo', email:'minoo@d.com',phone:'443234566',status:'Lead',organizationId:1 },
        { id: 3, name: 'sara', email:'sara@d.com',phone:'443234566',status:'Lead',organizationId:1 },
        { id: 4, name: 'ebi', email:'ebi@d.com',phone:'443234566',status:'Lead',organizationId:1 },
        { id: 5, name: 'sahar', email:'sahar@d.com',phone:'443234566',status:'Lead',organizationId:1 },
        { id: 6, name: 'sanaz', email:'sanaz@d.com',phone:'443234566',status:'Lead',organizationId:1 },
    
        ])
    }

}