import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Gremlin = require('gremlin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class GremlinService {

  private readonly DB_ENDPOINT = process.env.DB_ENDPOINT;
  private readonly PRIMARYKEY = process.env.PRIMARYKEY;

  gremlinClient() {
    const authenticator = new Gremlin.driver.auth.PlainTextSaslAuthenticator(
      `/dbs/graphdb/colls/persons`,
      this.PRIMARYKEY,
    );

    const client = new Gremlin.driver.Client(
      this.DB_ENDPOINT,
      {
        authenticator,
        traversalsource: 'g',
        rejectUnauthorized: true,
        mimeType: 'application/vnd.gremlin-v2.0+json',
      },
    );
    return client;
  }
}
