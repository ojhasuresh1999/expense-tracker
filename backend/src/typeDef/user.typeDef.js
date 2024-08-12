const userTypeDef = `#graphql
type User{
    _id: ID!,
    username: String!,
    name: String!,
    password: String!,
    profilePicture: String,
    gender: String!,
}

type Query{
    users: [User!],
    authUser: User,
    user(userId: ID!): User,
}

type Mutation{
    signUp(input: SignUpInput!): User,
    logIn(input: LogInInput!): User,
    logOut:LogoutResponse
}

input SignUpInput{
    username: String!,
    name: String!,
    password: String!,
    gender: String!,
}

input LogInInput{
    username: String!,
    password: String!,
}

type LogoutResponse{
    message: String!
}
`;

export default userTypeDef;
