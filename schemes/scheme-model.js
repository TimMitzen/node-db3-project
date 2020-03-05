const db = require('../data/config');
module.exports = {
   find,
   findById,
   findSteps,
   add,
   update,
   remove
};


async function find(){
   return db('schemes').select('*');
}

async function findById(id){
   return db('schemes')
   .where({id})
   .select('*');

}

function findSteps(id){
   return db('schemes as s')
   .join('steps as ss', 'ss.scheme_id', 's.id')
   .where('s.id',id)
   .orderBy('ss.step_number', 'asc')
   .select('s.scheme_name as scheme-name',
   'ss.step_number as step-number',
   'ss.instructions as step-instruction')
}

 async function add(scheme){
   const [id] = await db('schemes').insert(scheme)
   return db('schemes')
   .where({id: id})//same as 'id', id
   .first()
   .select()
}

async function update(update,id){
   await db('schemes')
   .where({id: id})
   .update(update)
   return db('id',id)
   .first()
   .select()
}

async function remove(id){
   return db('schemes')
   .where({id:id})
   .del()
}