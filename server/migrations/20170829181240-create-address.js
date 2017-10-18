module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('addresses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            first_line: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            second_line: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            postcode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            userId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'ecomm_users',
                    key: 'id',
                    as: 'userId',
                },
            },
            addressTypeId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'address_types',
                    key: 'id',
                    as: 'addressTypeId',
                },
            },
        }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('addresses'),
};
