import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";

interface Props {
    params: { id: string };
}

const EditUser = async ({params}: Props) => {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!user) {
        return <p>User not found</p>;
    }

    user.password = ""; // Do not expose the password
    return <UserForm user={user} />;
};