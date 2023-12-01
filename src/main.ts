import { ServerApplication } from './loaders/server'
;(async (): Promise<void> => {
  await runApplication()
})()

async function runApplication(): Promise<void> {
  const serverApplication: ServerApplication = ServerApplication.new()
  await serverApplication.run()
}
