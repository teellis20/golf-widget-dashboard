import { createClient } from "@/lib/supabase/server"
import PinScheduler from "../Components/PinScheduler"

export default async function PinSchedulePage() {
    const supabase = await createClient();
    const {data : userData} = await supabase.auth.getUser();

    if (!userData.user) {
        redirect('/signIn');
    }

    const {data, error} = await supabase.from('courses')
    .select(`pin_rotation_start, pin_locations:pin_locations!pin_locations_course_id_fkey (id, label)`)
    .eq('user_id', userData.user.id)
    .maybeSingle();
    
    return (
        <PinScheduler pin_locations={data.pin_locations} pin_rotation_start={data.pin_rotation_start} userId={userData.user.id} />
    )
}