'use strict';
const express = require('express');
const app = express();
app.use(express.static('./'));
app.listen(8001, ()=> { //ポート番号は任意に変更可能
  console.log('Server Start http://localhost:8001');
});