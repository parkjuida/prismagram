import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        allUsers: (_, args, {request}) => {
            console.log(request.user);
            return prisma.users()
        }
    }
}