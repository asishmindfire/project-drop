export interface InMemoryManager {
  get(key: string): Promise<any>;
  set(key: string, value: string, options?: { ttl: number }): Promise<any>;
}