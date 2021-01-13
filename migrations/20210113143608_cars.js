
exports.up = function(knex) {
  return knex.schema.createTable('cars', function(tbl){
      //primary key called ID, integer, auto-increment
    tbl.increments();

    tbl.string('make',128)
        .notNullable()
        .unique();
    
    tbl.string('model',128)
        .notNullable()
        .unique();
    
    tbl.string('VIN',128)
        .notNullable()
        .unique();
    
    tbl.string('transmission_type',128)

    tbl.string('title_status')

    tbl.integer('mileage')
        .unsigned()

    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
