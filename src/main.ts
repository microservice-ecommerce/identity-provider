import { ClusterService } from '@high3ar/common-api';
import { IdentityProviderConfig } from './infrastructure/configuration/identity-provider.config';
import { ServerApplication } from './loaders/server';
(async (): Promise<void> => {
  if(IdentityProviderConfig.NODE_ENV === 'production'){
    ClusterService.clusterize(runApplication);
    return;
  }
  runApplication();
})()
//
async function runApplication(): Promise<void> {
  const serverApplication: ServerApplication = ServerApplication.new()
  await serverApplication.run()
}
