module.exports = ({
  knex,
  tableName = 'tableName',
  selectableProps = '*'
}) => {
  const create = async props => {
    return knex.insert(props)
      .returning(selectableProps)
      .into(tableName);
  };

  const findAll = async (filters = {}) => {
    return knex.select(selectableProps)
      .where(filters)
      .from(tableName);
  };

  const findOne = async (filters) => {
    return knex.select(selectableProps)
    .where(filters)
    .from(tableName).first();
  };

  const update = async (props, filters) => {
    return knex.update(props).from(tableName)
      .where(filters)
      .returning(selectableProps);
  };

  const remove = async filters => {
    return knex.del().from(tableName)
      .where(filters)
      .returning(selectableProps);
  };

  return {
    create,
    findAll,
    findOne,
    update,
    remove,
    knex,
    tableName,
    selectableProps
  };
}