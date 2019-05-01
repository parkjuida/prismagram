import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";
import userDetail from "../../User/userDetail/userDetail";

export default {
    Mutation: {
        sendMessage: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            if (roomId === undefined) {
                if (user.id !== toId) {
                    const exist = await prisma.rooms({
                        where :{
                            AND: [
                                {
                                    participants_some: {
                                        id: user.id
                                    }
                                },
                                {
                                    participants_some: {
                                        id: toId
                                    }
                                }
                            ]
                        }
                    }).$fragment(ROOM_FRAGMENT);
                    room = exist[0];
                    if(room === undefined) {
                        room = await prisma.createRoom({
                            participants: {
                                connect: [
                                    { id: toId }, 
                                    { id:user.id }
                                ],
                            }
                        }).$fragment(ROOM_FRAGMENT); 
                    } 
                }
            } else {
                room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);   
            }
            if (!room) {    
                throw Error("Roon not found");
            }
            
            const getTo = room.participants.filter(participant => participant.id !== user.id)[0];
            return prisma.createMessage({
                text:message,
                from: {
                    connect: {
                    id: user.id
                    }
                },
                to: {
                    connect: {
                        id: roomId ? getTo.id : toId
                    }
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });
        }
    }
}