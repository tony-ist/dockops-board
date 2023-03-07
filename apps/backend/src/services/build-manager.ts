type BuildStatus = 'building' | 'success' | 'error';

export class BuildManager {
  private buildStatusesByDbContainerId = new Map<number, BuildStatus>();

  public get(dbContainerId: number) {
    return this.buildStatusesByDbContainerId.get(dbContainerId);
  }

  public set(dbContainerId: number, status: BuildStatus) {
    this.buildStatusesByDbContainerId.set(dbContainerId, status);
  }

  public clear(dbContainerId: number) {
    this.buildStatusesByDbContainerId.delete(dbContainerId);
  }
}
