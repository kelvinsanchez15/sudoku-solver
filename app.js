const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(`${process.cwd()}/views/index.html`));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port ${port}`));
