import { EMAIL_PASSWORD, EMAIL_USER } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { render } from 'svelte-email';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ServiceFormSchema, type TServiceForm } from './schema.js';
import ServiceForm from './service-form.svelte';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	port: 587,
	secure: false,
	auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD }
});

export const load = async () => {
	return { form: await superValidate(zod(ServiceFormSchema)) };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(ServiceFormSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const to_email = form.data.email;
			// create a new data object made of only the data which is not undefined or empty
			const data = Object.fromEntries(
				Object.entries(form.data).filter(([, value]) => value !== undefined || value !== '')
			) as TServiceForm;

			const email_html = render({
				template: ServiceForm,
				props: { payload: data }
			});

			const options = {
				from: 'you@example.com',
				to: to_email,
				subject: 'Service Form',
				html: email_html
			};

			await transporter.sendMail(options);
		} catch (error) {
			console.error(error);
			return { form };
		}
	}
};
