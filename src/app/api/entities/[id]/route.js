
// src/app/api/entities/[id]/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Entity from '@/models/Entity';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectToDatabase();
    const entity = await Entity.findOne({ 
      _id: params.id,
      userId: session.user.id 
    });
    
    if (!entity) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    }
    
    return NextResponse.json(entity);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    await connectToDatabase();
    
    const entity = await Entity.findOneAndUpdate(
      { _id: params.id, userId: session.user.id },
      body,
      { new: true }
    );
    
    if (!entity) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    }
    
    return NextResponse.json(entity);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectToDatabase();
    const entity = await Entity.findOneAndDelete({ 
      _id: params.id,
      userId: session.user.id 
    });
    
    if (!entity) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Entity deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
