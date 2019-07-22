import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: (parent) => {
            return parent.firstName + parent.lastName;
        },
        isFollowing: async (parent, _, {request}) => {
            const { user } = request;
            const { id:parentId } = parent;
            
            try { 
                return prisma.$exists.user({
                    AND: [
                    {id:parentId}, {followers_some: {id: user.id}}
                    ]
                });
                
            } catch(error) {
                console.log(error);
                return false;
            }
        },
        isSelf: (parent, _, {request}) => {
            return parent.id === request.user.id
        },
        posts: parent => prisma.user({id: parent.id}).posts(),
        likes: parent => prisma.user({id: parent.id}).likes(),
        comments: parent => prisma.user({id: parent.id}).comments(),
        followers: parent => prisma.user({id: parent.id}).followers(),
        following: parent => prisma.user({id: parent.id}).following(),
        rooms: parent => prisma.user({id: parent.id}).rooms()
    }
};