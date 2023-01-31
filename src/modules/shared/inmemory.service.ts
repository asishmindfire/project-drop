import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InMemoryManager } from './interfaces/inmemory.interface';


@Injectable()
export class InMemoryService {

  constructor(@Inject(CACHE_MANAGER) private storage: InMemoryManager) { }

  async get(key: string): Promise<any> {
    return await this.storage.get(key);
  }

  async set(key: string, value: any, options?: { ttl: number }): Promise<void> {
    await this.storage.set(key, value, options);
  }

}
