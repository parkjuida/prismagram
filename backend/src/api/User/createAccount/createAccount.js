import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async(_, args) => {
            const { username, email, firstName = "", lastName = "", bio = "" } = args;
            const username_exists = await prisma.$exists.user({
                username
            })
            if (username_exists) {
                throw Error("There username is already exists");
            }
            const email_exists = await prisma.$exists.user({email})
            if (email_exists) {
                throw Error("email already exists");
            }
            try {
                await prisma.createUser({
                    username,
                    email,
                    firstName,
                    lastName,
                    bio
                });
                return true;
            } catch {
                return false;
            }
        }
    }
}