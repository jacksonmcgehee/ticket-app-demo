import { NextRequest, NextResponse } from "next/server";
import { ticketPatchSchema } from "@/ValidationSchemas/ticket";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "../../auth/[...nextauth]/options";

interface Props {
    params: { id: string}
}

export async function PATCH(request: NextRequest, { params}: Props) {

    const session = await getServerSession(options);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = ticketPatchSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const ticket = await prisma.ticket.findUnique({where: {id: parseInt(params.id)}});

    if (!ticket) {
        return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    if (body.assignedToUserId) {
        body.assignedToUserId = parseInt(body.assignedToUserId);
    }

    const updateTicket = await prisma.ticket.update({
        where: { id: ticket.id },
        data: { ...body },
    });

    return NextResponse.json(updateTicket, { status: 200 });
}

export async function DELETE(request: NextRequest, { params}: Props) {

    const session = await getServerSession(options);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Not Admin" }, { status: 403 });
    }
    
    const ticket = await prisma.ticket.findUnique({where: {id: parseInt(params.id)}});

    if (!ticket) {
        return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    await prisma.ticket.delete({where: {id: ticket.id}});

    return NextResponse.json({ message: "Ticket deleted successfully" }, { status: 200 });
}