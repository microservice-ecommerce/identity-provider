import { Injectable } from '@nestjs/common';

const cluster = require('cluster');
import * as process from 'node:process';
import * as os from "os";

@Injectable()
export class ClusterService {
  static clusterize(callback: Function): void {
    if (cluster.isMaster) {
      const numbsLength = os.cpus().length;
      console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);
      for (let i = 0; i < numbsLength; i++) {
        console.log(`WORKER SERVER (${process.pid}) IS RUNNING `);
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      callback();
    }
  }
}
