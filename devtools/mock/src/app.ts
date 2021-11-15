import express from 'express';
import { CommonRoutes } from './controllers/route';
import { VpcRoutes } from './controllers/vpc';

const app: express.Application = express();
const port: number = 3001;
const routes: CommonRoutes[] = [];
routes.push(new VpcRoutes(app));

app.get('/', (req, res) => {
  res.send('OVN-Kube mock server.');
});

app.listen(port, () => {
  console.log(`mock server running on http://localhost:${port}`);
});

export default app;