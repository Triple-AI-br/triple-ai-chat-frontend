import { useState, useEffect } from "react";
import { Session, createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wnumfqlakduevqrygnyn.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
if (!supabaseKey) {
    throw new Error(
        "Environment variable REACT_APP_SUPABASE_KEY should be defined"
    );
}
const supabaseClient = createClient(supabaseUrl, supabaseKey);

const useSupabaseSession = () => {
    const [session, setSession] = useState<Session | null>();

    useEffect(() => {
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    return session;
};

export { useSupabaseSession, supabaseClient };
