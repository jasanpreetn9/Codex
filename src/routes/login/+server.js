import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"

export const POST = async ({ request, locals }) => {
	const body = Object.fromEntries(await request.formData())

	const { data, error: err } = await locals.sb.auth.signInWithPassword({
		email: body.email,
		password: body.password,
	})

	if (err) {
		if (err instanceof AuthApiError && err.status === 400) {
			return fail(400, {
				error: "Invalid credentials",
			})
		}
		return fail(500, {
			message: "Server error. Try again later.",
		})
	}

	throw redirect(303, "/")
}