module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/hubs.db3',
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        // sqlite engine'e yapılan bağlantı sonra çalışır:
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
