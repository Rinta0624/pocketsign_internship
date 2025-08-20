import { supabase } from '../lib/supabase.js'
export const authRepositories = {
    async signup(name,email,password){
        const {data,error} = await supabase.auth.signUp(
            {
                email,
                password,
                options: { data: {name}},
            }
        );
        if(error != null)throw new Error(error.message);
        return {...data.user, userName: data.user.user_metadata.name,};
    },
    async signin(email,password){
        const {data,error} = await supabase.auth.signInWithPassword(
            {
                email,
                password,
            }
        );
        if(error)throw new Error(error.message);
        return {...data.user, userName: data.user.user_metadata.name,};
    },
    async signout() {
        const {error} = await supabase.auth.signOut();
        if(error!=null)throw new Error(error.message);
        return true;
    },
};