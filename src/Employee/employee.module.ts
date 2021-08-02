import { Module } from '@nestjs/common';
import { GroupController } from './employee.controller';
import { GroupService } from './employee.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
