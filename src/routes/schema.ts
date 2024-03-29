import { coerce, z } from 'zod';

export const citizenships = ['Rwandan', 'Foreigner'] as const;

export const provinces = [
	'Kigali City',
	'Eastern Province',
	'Northern Province',
	'Southern Province',
	'Western Province'
] as const;

export const business_types = ['Retailer', 'Wholesale', 'Manufacturer'] as const;

export const purposes_of_importation = [
	'Direct sale',
	'Personal use',
	'Trial use',
	'Other'
] as const;

export const product_categories = [
	'General purpose',
	'Construction materials',
	'Chemicals'
] as const;

export const units_of_measurement = ['Kgs', 'Tonnes'] as const;

export const ServiceFormSchema = z
	.object({
		citizenship: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		applicant_province: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		nid: z.string().optional(),
		passport_number: z.string().optional(),
		other_names: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		surname: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		nationality: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		phone_number: z.string().optional(),
		email: z.string().email({ message: 'This Field is Required' }),
		business_province: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		business_type: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		company_name: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		tin_number: coerce
			.number({
				required_error: 'This field is required',
				invalid_type_error: 'Please provide a valid TIN number'
			})
			.refine((v) => v.toString().length === 9, {
				message: 'Please provide a valid TIN number'
			}),

		registration_date: z.string().refine((v) => v, { message: 'This Field is Required' }),
		purpose_of_importation: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		specify_purpose_of_importation: z.string().optional(),
		product_category: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		product_name: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		weight_kg: coerce
			.number()
			.gte(0, { message: 'Please provide a number greater than zero' })
			.optional(),
		description_of_products: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		unit_of_measurement: z
			.string({ required_error: 'This Field is Required' })
			.min(1, 'This Field is Required'),
		quantity_of_products: coerce
			.number({ required_error: 'This Field is Required' })
			.gte(0, { message: 'Please provide a number greater than zero' })
	})
	// Perform conditional validation to ensure either an nid, passport_number or specify_purpose_of_importation are provided given different conditions.
	.superRefine(
		(
			{ citizenship, nid, passport_number, purpose_of_importation, specify_purpose_of_importation },
			refinementContext
		) => {
			if (citizenship === 'Rwandan' && !nid) {
				return refinementContext.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"Sorry, we can't find your identification data from NIDA system. Please contact NIDA for more details.",
					path: ['nid']
				});
			}

			if (citizenship === 'Foreigner' && !passport_number) {
				return refinementContext.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'This field is required',
					path: ['passport_number']
				});
			}

			if (purpose_of_importation === 'Other' && !specify_purpose_of_importation) {
				return refinementContext.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'This field is required',
					path: ['specify_purpose_of_importation']
				});
			}
		}
	);

export type ServiceForm = typeof ServiceFormSchema;

export type TServiceForm = z.infer<typeof ServiceFormSchema>;
