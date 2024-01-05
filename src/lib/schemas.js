import { z } from 'zod';

export const loginUserSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email.' })
		.transform((value) => value.toLowerCase()),
	password: z.string({ required_error: 'Password is required' })
});

export const registerUserSchema = z
	.object({
		username: z
			.string({ required_error: 'Username is required' })
			.min(3, { message: 'Username must be at least 3 characters' })
			.max(24, { message: 'Username must be 24 characters or less' })
			.regex(/^[a-zA-Z0-9]*$/, { message: 'Username can only contain letters or numbers.' }),
		email: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Email must be a valid email' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.regex(/^(?=.*\d)[A-Za-z\d@$!%*#?&]+$/, {
				message:
					'Password must contain at least one number and can include letters and special characters.'
			}),
		passwordConfirm: z.string({ required_error: 'Confirm Password is required' })
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});
