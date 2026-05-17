import { FastifyInstance } from 'fastify';
import { 
  createFastifyWorkflowHandler,
  createPersistenceHandler 
} from '@cascaide-ts/server-fastify';
import { PostgresPersistor } from '@cascaide-ts/postgres-js';
import { getServerWorkflowConfig } from '../graphs/server/config';
import { getDb } from '../lib/pglite'; 

export default async function workflowRoutes(fastify: FastifyInstance) {

  fastify.post('/action', async (request, reply) => {
    const config = await getServerWorkflowConfig();
    const handler = createFastifyWorkflowHandler(config);
    await handler(request, reply);
  });

  fastify.post('/persistence', async (request, reply) => {
    const sql = await getDb();
    const persistor = new PostgresPersistor(sql);
    const handler = createPersistenceHandler(persistor);
    await handler(request, reply);
  });

}