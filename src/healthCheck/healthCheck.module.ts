import { Module } from '@nestjs/common';
import { HealthCheckController } from './healthCheck.controller';

@Module({
  controllers: [HealthCheckController],
  providers: [],
})
export class HealthModule {}
