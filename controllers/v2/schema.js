const graphql = require('graphql');
const { Hotel, Room } = require('../../models/Hotel');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID, 
    GraphQLInt,
    GraphQLSchema, 
    GraphQLList 
} = graphql;

const HotelType = new GraphQLObjectType({
    name: 'Hotel',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        description: { type: GraphQLString },
        rooms: {
        type: RoomType,
        resolve(parent, args) {
            return Room.findById(parent.id);
        }
    }
    })
});

const RoomType = new GraphQLObjectType({
    name: 'Rooms',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        image: { type: GraphQLInt },
        hotel:{
            type: new GraphQLList(HotelType),
            resolve(parent,args){
                return Hotel.find({ id: parent.id });
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hotel: {
            type: HotelType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Hotel.findById(args.id);
            }
        },
        hoteles:{
            type: new GraphQLList(HotelType),
            resolve(parent, args) {
                return Hotel.find({});
            }
        },
        room:{
            type: RoomType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Room.findById(args.id);
            }
        },
        rooms:{
            type: new GraphQLList(RoomType),
            resolve(parent, args) {
                return Room.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});