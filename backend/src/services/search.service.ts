import { Injectable } from '@nestjs/common';
import MeiliSearch, { Document, Index } from 'meilisearch';
import { Contact } from 'src/entities/contact/contact.entity';
import { RequestContextService } from './requestContext.service';

@Injectable()
export class SearchService {
  private client: MeiliSearch;

  constructor(private readonly contextService: RequestContextService) {
    this.client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_APIKEY,
    });
  }

  getIndex(): Index {
    const organization = this.contextService.get('organization');

    return this.client.index(String(organization.id));
  }

  async addDocument(documents) {
    const index = this.getIndex();

    return await index.addDocuments(documents, {
      primaryKey: 'id',
    });
  }
  async deleteIndex() {
    return await this.client.deleteIndex('contacts');
  }

  async updateDocument(documents) {
    const index = this.getIndex();
    return await index.updateDocuments(documents);
  }

  async deleteDocument(id) {
    const index = this.getIndex();
    return await index.deleteDocument(id);
  }
}
