import { supabaseAdmin } from "@/lib/supabase/server"
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {userId} = await req.json();
    const supabase = await supabaseAdmin()
    console.log('userID from params: ', userId)
    await supabase.auth.admin.deleteUser(userId)
    // e.g. Insert new user into your DB
    return NextResponse.json(
      { message: 'Success' },
      { status: 200 } // Correct usage
    );
  } catch (e) {
    console.log('error: ', e)
  }
 
  
}
