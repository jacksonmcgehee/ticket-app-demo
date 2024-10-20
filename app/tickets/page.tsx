import prisma from '@/prisma/db';

const Tickets = async () => {

    const tickets = await prisma.ticket.findMany();

    return (
        <div>
        <h1>Tickets</h1>
        </div>
    );
};

export default Tickets;