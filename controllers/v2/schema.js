const graphql = require('graphql');
const { Hotel } = require('../../models/Hotel');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID, 
    GraphQLFloat,
    GraphQLSchema, 
    GraphQLList 
} = graphql;

const HotelType = new GraphQLObjectType({
    name: 'Hotel',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        stars: { type: GraphQLFloat }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hoteles:{
            type: new GraphQLList(HotelType),
            resolve(parent, args) {
                return Hotel.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});