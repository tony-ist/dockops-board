import { DockerEvent, DockerEventAction } from '../types/docker-event-types';
import { DockerState } from '../types/docker-state';
import { FastifyInstance } from 'fastify';

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

      if (dockerState !== undefined) {
        fastify.log.debug(`Changing container "${event.id}" state to "${dockerState}".`);

        await fastify.prisma.container.updateMany({
          where: {
            dockerId: event.id,
          },
          data: {
            dockerState,
          },
        });
      }
    } catch (error) {
      fastify.log.error(error);
    }
  });
}
