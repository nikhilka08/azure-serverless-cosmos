import { Controller, Get } from '@nestjs/common';
import { GremlinService } from 'src/Shared/Gremlin/gremlin.service';

@Controller('healthcheck')
export class HealthCheckController {
  private readonly health = { status: 'healthy!' };
  
  @Get()
  async checkHealth() {
    return this.health;
  }
}
