// src/app/api/templates/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Template from '@/models/Template';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectToDatabase();
    const templates = await Template.find({ userId: session.user.id }).sort({ isDefault: -1, createdAt: -1 });
    
    return NextResponse.json(templates);
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
    
    // Jeśli dodajemy domyślny szablon, usuń domyślny status z innych szablonów
    if (body.isDefault) {
      await Template.updateMany(
        { userId: session.user.id, isDefault: true },
        { isDefault: false }
      );
    }
    
    const template = new Template({
      ...body,
      userId: session.user.id
    });
    
    await template.save();
    return NextResponse.json(template);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}