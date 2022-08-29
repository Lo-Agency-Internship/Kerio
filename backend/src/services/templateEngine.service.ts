import { Injectable } from '@nestjs/common';
import { renderFile } from 'twig';
import { join } from 'path';

@Injectable()
export class TemplateEngineService {
  async render(filename: string, data: any) {
    return new Promise((resolve, reject) => {
      const path = join(__dirname, '..', '..', 'templates', `${filename}.twig`);

      renderFile(path, data, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }
}
