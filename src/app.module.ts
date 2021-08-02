import { Module } from '@nestjs/common';
import { GremlinModule } from './Shared/Gremlin/gremlin.module';
import { HealthModule } from './healthCheck/healthCheck.module';
import { GroupModule } from './Employee/employee.module';

@Module({
  imports: [HealthModule, GremlinModule, GroupModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
