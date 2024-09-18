import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/models/Users';
import { connectToDB } from '@/lib/mongodb/mongoose';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    
    const user = await User.findOne({ clerkId: params.id }).exec();

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Failed to load user:', error);
    return new NextResponse('Failed to load user', { status: 500 });
  }
};
