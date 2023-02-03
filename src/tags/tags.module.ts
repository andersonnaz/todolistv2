import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { tagsProviders } from './tags.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [TagsController],
    providers: [TagsService, ...tagsProviders]
})
export class TagsModule {}
