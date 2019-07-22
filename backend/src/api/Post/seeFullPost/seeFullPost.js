import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT, USER_FRAGMENT, FULL_POST_FRAGMENT } from "../../../fragments";


export default {
    Query: {
        seeFullPost: async(_, args) => {
            const { id } = args;
            const post = await prisma.post({id}).$fragment(FULL_POST_FRAGMENT);
            return post
        }
    }
}