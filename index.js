"use strict";

const express = require('express');
const port = 3030;

const app = express();
const dir = './public';
app.use(express.static(dir));
app.listen(port, () => console.log(`static_server listen ${port} port, and directory: ${dir}`));