import { EMAIL_PASSWORD, EMAIL_USER } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { render } from 'svelte-email';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ServiceFormSchema } from './schema.js';
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
			const email_html = render({
				template: ServiceForm,
				props: { payload: form.data }
			});

			const options = {
				from: 'Irembo MDS',
				to: form.data.email,
				subject: 'Service Form',
				html: email_html
			};

			await transporter.sendMail(options);

			return { form };
		} catch (error) {
			console.error(error);
			return { form };
		}
	}
};
