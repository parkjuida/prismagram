import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        myProfile: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const profile = await prisma.user({id:user.id});
            const posts = await prisma.user({id:user.id}).posts();
            return {
                user: profile,
                posts: posts
            };
        }
    },
}