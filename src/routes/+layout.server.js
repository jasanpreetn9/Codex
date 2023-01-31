import { getServerSession } from "@supabase/auth-helpers-sveltekit"
export async function load(event) {
    console.log("Ran layout load")
	return {
		session: await getServerSession(event),
	}
}

