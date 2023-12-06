import { IdentityProviderConfig } from './config/identity-provider.config';
import { ServerApplication } from './loaders/server';
import {ClusterService} from '@high3ar/common-api'
(async (): Promise<void> => {
  if(IdentityProviderConfig.NODE_ENV === 'production'){
    ClusterService.clusterize(runApplication);
  }
  else{
    runApplication()
  }
})()

async function runApplication(): Promise<void> {
  const serverApplication: ServerApplication = ServerApplication.new()
  await serverApplication.run()
}
