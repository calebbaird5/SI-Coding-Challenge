
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association, NonAttribute } from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { sequelize } from '../sequelize';
import { Event } from './event';

export class Venue extends Model<InferAttributes<Venue>, InferCreationAttributes<Venue>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;

  declare events?: NonAttribute<Event[]>;

  declare static associations: {
    events: Association<Venue, Event>;
  };
}

Venue.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataType.STRING(128),
      allowNull: false
    },
    address: {
      type: new DataType.STRING(128),
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'Venues'
  }
)

Venue.hasMany(Event, { foreignKey: 'venue_id', as: 'events' });
Event.belongsTo(Venue, { foreignKey: 'venue_id', as: 'venue' });
