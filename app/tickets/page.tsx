import prisma from '@/prisma/db';
import DataTable from './DataTable';

const Tickets = async () => {

    const tickets = await prisma.ticket.findMany();

    return (
        <div>
        <h1><DataTable tickets={tickets} /></h1>
        </div>
    );
};

export default Tickets;