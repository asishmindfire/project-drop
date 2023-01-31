import { Module } from '@nestjs/common';
import { InMemoryService } from './inmemory.service';


@Module({
    imports: [],
    controllers: [],
    providers: [],
    exports: [InMemoryService]
})


export class InmemoryModule { }
