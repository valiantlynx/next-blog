import { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';

const pocketdb = spawn('@/pocketbase_0.14.0_linux_amd64/pocketbase', ['--ui']);

export default (req: NextApiRequest, res: NextApiResponse) => {
  pocketdb.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pocketdb.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pocketdb.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  if (req.method === 'GET') {
    // Handle GET request
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Hello from PocketDB!' }));
  } else if (req.method === 'POST') {
    // Handle POST request
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Data received!' }));
  } else {
    // Handle other request methods
    res.statusCode = 405;
    res.setHeader('Allow', 'GET, POST');
    res.end('Method Not Allowed');
  }
};
