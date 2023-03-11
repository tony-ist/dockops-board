import { DockerEvent, DockerEventAction } from '../types/docker-event-types';
import { DockerState } from '../types/docker-state';
import { FastifyInstance } from 'fastify';
import { WebSocketResponseEvents } from 'common-src';
import { serializePrismaContainer } from '../serializers/container-serializers';

const dockerStatesByEventAction: { [key in DockerEventAction]: DockerState | undefined } = {
  [DockerEventAction.Create]: DockerState.Created,
  [DockerEventAction.Start]: DockerState.Running,
  [DockerEventAction.Stop]: undefined,
  [DockerEventAction.Destroy]: undefined,
  [DockerEventAction.Die]: DockerState.Exited,
};

export async function listenDockerEvents(fastify: FastifyInstance) {
  const eventStream = await fastify.docker.getEvents({ filters: { type: ['container'] } });

  eventStream.on('data', async (buffer: Buffer) => {
    try {
      const event: DockerEvent = JSON.parse(buffer.toString());
      const dockerState = dockerStatesByEventAction[event.Action];

      if (dockerState === undefined) {
        return;
      }

      fastify.log.debug(`Changing container "${event.id}" state to "${dockerState}".`);

      const container = await fastify.prisma.container.findFirstOrThrow({ where: { dockerId: event.id } });
      const updatedContainer = await fastify.prisma.container.update({
        where: {
          id: container.id,
        },
        data: {
          dockerState,
        },
      });

      fastify.io.emit(WebSocketResponseEvents.ContainerUpdateResponse, {
        container: serializePrismaContainer(fastify.buildManager, updatedContainer),
      });
    } catch (error) {
      fastify.log.error(error);
    }
  });
}
