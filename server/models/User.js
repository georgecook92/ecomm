'use strict';
module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('ecomm_user', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    User.associate = models => {
        User.hasMany(models.address, {
            foreignKey: 'userId',
            as: 'addresses',
        });
    };
    return User;
};
