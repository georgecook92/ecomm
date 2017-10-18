'use strict';
module.exports = function(sequelize, DataTypes) {
    const ShippingAddress = sequelize.define('address', {
        first_line: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        second_line: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postcode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    ShippingAddress.associate = models => {
        ShippingAddress.belongsTo(models.ecomm_user, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
        ShippingAddress.belongsTo(models.address_type, {
            foreignKey: 'addressTypeId',
            onDelete: 'CASCADE',
        });
    };
    return ShippingAddress;
};
