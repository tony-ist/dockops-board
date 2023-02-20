import Dockerode from 'dockerode';

export const dockerService = {
  async getAllContainers(docker: Dockerode) {
    const containerInfos = await docker.listContainers();
    const result = containerInfos.map((info) => ({ image: info.Image }));
    return result;
  },
};
