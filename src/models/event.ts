import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association, NonAttribute } from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { sequelize } from '../sequelize';
import { Venue } from './venue';


export class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare event_date: string;
  declare venue_id: number;


  declare venue?: NonAttribute<Venue>;

  declare static associations: {
    venue: Association<Event, Venue>;
  };
}

Event.init(
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
    event_date: {
      type: new DataType.DATE,
      allowNull: false
    },
    venue_id: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Events'
  }
)
