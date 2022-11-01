import { Injectable } from '@nestjs/common';
import MeiliSearch, { Document, Index } from 'meilisearch';
import { RequestContextService } from './requestContext.service';
import { IContactMeilisearch } from '../interfaces/contact.meilisearch.interface';

@Injectable()
export class SearchService {
  private readonly client: MeiliSearch;

  constructor(private readonly contextService: RequestContextService) {
    this.client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_APIKEY,
    });
  }

  getIndex(): Index<IContactMeilisearch> {
    const organization = this.contextService.get('organization');

    return this.client.index<IContactMeilisearch>(String(organization.id));
  }

  async addDocument(documents: Document<IContactMeilisearch>[]) {
    const index = this.getIndex();

    return await index.addDocuments(documents, {
      primaryKey: 'id',
    });
  }
  async deleteIndex() {
    const index = this.getIndex();
    return await this.client.deleteIndex(index.uid);
  }

  async updateDocument(documents: Partial<IContactMeilisearch>[]) {
    const index = this.getIndex();
    return await index.updateDocuments(documents);
  }

  async deleteDocument(id: string | number) {
    const index = this.getIndex();
    return await index.deleteDocument(id);
  }

  async deleteDocuments(ids: string[] | number[]) {
    const index = this.getIndex();
    return await index.deleteDocuments(ids);
  }
}
