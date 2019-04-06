import { generateSecret } from "../../../utils"
import { prisma } from "../../../../generated/prisma-client";


export default {
    Mutation: {
        requestSecret: async(_, args) => {
            const { email } = args;
            const secret = generateSecret();
            console.log(secret);
            try {
                await prisma.updateUser({
                    data: {
                        loginSecret: secret,
                    },
                    where: {
                        email: email,
                    }
                });
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        }
    }
}