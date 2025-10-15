"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.category, { foreignKey: "category_id", as: "category" });
      products.hasMany(models.cart, { foreignKey: "product_id", as: "cart" });
    }
  }
  products.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
      stock: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "products",
      tableName: "products",
      underscored: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return products;
};
