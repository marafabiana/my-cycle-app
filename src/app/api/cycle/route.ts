import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cycle = await prisma.cycle.findFirst({
      where: { userId: session.user.id }, //  Use findFirst() because userId is not the primary key.
    });

    return NextResponse.json({ lastPeriod: cycle?.startDate || null });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching cycle", details: error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { lastPeriod } = await req.json();

    //  Check if the cycle already exists
    const existingCycle = await prisma.cycle.findFirst({
      where: { userId: session.user.id },
    });

    if (existingCycle) {
      //  If it exists, update the last menstruation date
      await prisma.cycle.updateMany({
        where: { userId: session.user.id },
        data: { startDate: new Date(lastPeriod) },
      });
    } else {
      // If it doesn't exist, create a new cycle.
      await prisma.cycle.create({
        data: { userId: session.user.id, startDate: new Date(lastPeriod) },
      });
    }

    return NextResponse.json({ message: "Cycle updated successfully!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error saving cycle", details: error },
      { status: 500 }
    );
  }
}
