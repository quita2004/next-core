module.exports = ({
  knex = {},
  name = 'name',
  tableName = 'tableName',
  selectableProps = '*'
}) => {
  const create = props => {
    return knex.insert(props)
      .returning(selectableProps)
      .into(tableName);
  };

  const addFilter = (query, filter) => {
    if (filter.sql && filter.params) {
      return query.whereRaw(filter.sql, filters.params);
    }

    if (filter && typeof filter === 'object') {
      return query.where(filter);
    }

    return query;
  }

  const findAll = (filters) => {
    const query = knex.select(selectableProps)
      .from(tableName);
    query = addFilter(filters);

    return query;
  };

  const findOne = (filters) => {
    return findAll(filters).first();
  };

  const update = (props, filters) => {
    const query = knex.update(props).from(tableName);
    query = addFilter(query, filters);
    return query.returning(selectableProps);
  };

  const remove = filters => {
    const query = knex.del().from(tableName);
    query = addFilter(query, filters);
    return query.returning(selectableProps);
  };

  return {
    knex,
    name,
    tableName,
    selectableProps,
    create,
    findAll,
    findOne,
    update,
    remove
  };
}