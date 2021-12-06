import express from 'express';
import { middleware } from './middlewares/middleware';
import { CommonRoutes } from './controllers/route';
// import { LoginRoutes } from './controllers/login';
import { NamespaceRoutes } from './controllers/namespace';
import { VpcRoutes } from './controllers/vpc';

const app: express.Application = express();

app.use(express.json());
app.use(middleware);
const port: number = 3001;
const routes: CommonRoutes[] = [];
// routes.push(new LoginRoutes(app));
routes.push(new NamespaceRoutes(app));
routes.push(new VpcRoutes(app));

app.get('/', (req, res) => {
  res.send('OVN-Kube mock server.');
});

app.listen(port, () => {
  console.log(`mock server running on http://localhost:${port}`);
});

export default app;