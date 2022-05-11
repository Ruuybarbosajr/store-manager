const express = require('express');
const router = require('./routes');
const middleware = require('./middlewares');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use(express.json());
app.use('/products', router.products);
app.use('/sales', router.sales);
app.use(middleware.error);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
