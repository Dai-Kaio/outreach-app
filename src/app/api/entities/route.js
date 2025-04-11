// src/app/api/entities/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Entity from '@/models/Entity';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectToDatabase();
    const entities = await Entity.find({ userId: session.user.id }).sort({ createdAt: -1 });
    
    return NextResponse.json(entities);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    await connectToDatabase();
    
    const entity = new Entity({
      ...body,
      userId: session.user.id
    });
    
    await entity.save();
    return NextResponse.json(entity);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}