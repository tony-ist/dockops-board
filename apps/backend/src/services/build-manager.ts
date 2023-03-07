type BuildStatus = 'building' | 'success' | 'error';

export class BuildManager {
  private buildStatusesByDbContainerId = new Map<string, BuildStatus>();

  public get(dbContainerId: string) {
    return this.buildStatusesByDbContainerId.get(dbContainerId);
  }

  public set(dbContainerId: string, status: BuildStatus) {
    this.buildStatusesByDbContainerId.set(dbContainerId, status);
  }

  public clear(dbContainerId: string) {
    this.buildStatusesByDbContainerId.delete(dbContainerId);
  }
}
