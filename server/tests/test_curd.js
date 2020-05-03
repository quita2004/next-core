const uuid = require('uuid');
const knex = require('./server/helpers/db');

const models = require('./server/helpers/model-curd')({
  knex,
  tableName: 'user',

});

// const user = models.create({
//   user_id: uuid.v4(),
//   username: 'qui 111',
//   email: 'qui@yopmail.com',
// }).then(data => {
//   console.log(data);

// })

// models.findOne().then(data=>{
//   console.log(data);
// })

// models.update({
//   username: 'qui dz'
// },{
//   user_id: '5ac96bd4-df02-447f-882d-b57989870a57'
// }).then(data=>{
//   console.log(data);
// })


models.remove({
  user_id: '5ac96bd4-df02-447f-882d-b57989870a57'
}).then(data=>{
  console.log(data);
  
})