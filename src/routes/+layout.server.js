import { getServerSession } from "@supabase/auth-helpers-sveltekit"
export async function load(event) {
    console.log("Ran layout load")
	console.log(process.env.API_URL)
	return {
		session: await getServerSession(event),
	}
}