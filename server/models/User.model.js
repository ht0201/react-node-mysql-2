
module.exports = (sequelize, DataTypes) =>
{
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Users.associate = (models) =>
  {
    Users.hasMany(models.Likes, {
      foreignKey: 'userId',
      onDelete: 'cascade'
    });
      
    // Users.hasMany(models.Posts, {
    //   onDelete: 'SET NULL'
    // });
  }

  return Users;
}