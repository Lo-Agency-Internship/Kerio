import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import  MeiliSearch, { Index }  from "meilisearch"
import { Contact } from "src/entities/contact.entity";
import { Repository } from "typeorm";

@Injectable()
export class SearchService{

    private client:MeiliSearch;
    // @InjectRepository(Contact)
    // private readonly contactRepository: Repository<Contact>

    constructor(){

        this.client = new MeiliSearch({
            host:'http://lo-kerio-search.apps.lo.agency/',
            apiKey:'c23f47e73881d3d5462ba5d265364dd1373ee7d5525f4691997d0d8eba277a82'   
        })
    }

    getContactIndex():Index{
        return this.client.index('contacts');

    }

    async addDocument(documents){
        console.log("mahsa",documents);
        const index = this.getContactIndex();
        const contacts = await  index.getDocuments();
        documents = contacts.results.concat(documents);
        const res = await index.addDocuments(documents);
        
        
    }
    // async getDocuments(){
    //     const index = this.getContactIndex();
    //     return await index.getDocuments()
    // }

}