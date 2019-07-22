import { ROOM_FRAGMENT } from "../../../fragments";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeRooms: async (_, __, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.user({
                    id:user.id
            })
            .rooms()
            .$fragment(ROOM_FRAGMENT);
        }
    }
}