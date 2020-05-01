const uuid = require('uuid');
const knex = require('./server/helpers/db');

const models = require('./server/helpers/model-curd')({
  knex,
  tableName: 'user',

});

// const user = models.create({
//   user_id: uuid.v4(),
//   user_name: 'qui',
//   email: 'qui@yopmail.com',
// });

const user = knex.insert({
  user_id: uuid.v4(),
  username: 'qui'
}).into('user').then(data=>{
  console.log(data);
})

