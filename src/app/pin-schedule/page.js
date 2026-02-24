import { createClient } from "@/lib/supabase/server"
import PinScheduler from "../Components/PinScheduler"
import { getCurrentAutoPin } from "@/lib/getCurrentAutoPin";

export default async function PinSchedulePage() {
    const supabase = await createClient();
    const {data : userData} = await supabase.auth.getUser();

    if (!userData.user) {
        redirect('/signIn');
    }

    const {data, error} = await supabase.from('courses')
    .select(`pin_rotation_index, pin_rotation_start, pin_locations:pin_locations!pin_locations_course_id_fkey (id, label)`)
    .eq('user_id', userData.user.id)
    .order('id', {ascending: true})
    .maybeSingle();

    const currentPinIndex = () => {
        const currentPin = getCurrentAutoPin(data.pin_rotation_start, data.pin_rotation_index, data.pin_locations);
        return data.pin_locations.findIndex(pin => pin.id === currentPin?.id);
    } 
    
    return (
        <PinScheduler pin_locations={data.pin_locations} current_pin_index={currentPinIndex()} userId={userData.user.id} />
    )
}