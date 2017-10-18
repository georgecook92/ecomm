'use strict';
module.exports = function(sequelize, DataTypes) {
    const AddressType = sequelize.define('address_type', {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return AddressType;
};
