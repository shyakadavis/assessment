<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import { cn } from '$lib/utils.js';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		today,
		type DateValue
	} from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import {
		ServiceFormSchema,
		business_types,
		citizenships,
		product_categories,
		provinces,
		purposes_of_importation,
		units_of_measurement,
		type ServiceForm
	} from './schema';

	export let data: SuperValidated<Infer<ServiceForm>>;

	const form = superForm(data, {
		validators: zodClient(ServiceFormSchema)
	});

	const { form: formData, enhance } = form;

	$: selected_citizenship = $formData.citizenship
		? {
				label: $formData.citizenship,
				value: $formData.citizenship
			}
		: undefined;

	$: selected_applicant_province = $formData.applicant_province
		? {
				label: $formData.applicant_province,
				value: $formData.applicant_province
			}
		: undefined;

	$: selected_business_type = $formData.business_type
		? {
				label: $formData.business_type,
				value: $formData.business_type
			}
		: undefined;

	$: selected_business_province = $formData.business_province
		? {
				label: $formData.business_province,
				value: $formData.business_province
			}
		: undefined;

	$: selected_purpose_of_importation = $formData.purpose_of_importation
		? {
				label: $formData.purpose_of_importation,
				value: $formData.purpose_of_importation
			}
		: undefined;

	$: selected_product_category = $formData.product_category
		? {
				label: $formData.product_category,
				value: $formData.product_category
			}
		: undefined;

	$: selected_unit_of_measurement = $formData.unit_of_measurement
		? {
				label: $formData.unit_of_measurement,
				value: $formData.unit_of_measurement
			}
		: undefined;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let registration_date_value: DateValue | undefined;

	$: registration_date_value = $formData.registration_date
		? parseDate($formData.registration_date)
		: undefined;

	let registration_date_placeholder: DateValue = today(getLocalTimeZone());
</script>

<form method="POST" use:enhance class="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2">
	<h2 class="scroll-m-20 text-xl font-semibold tracking-tight sm:col-span-2">
		Business Owner Details
	</h2>
	<!-- Citizenship -->
	<Form.Field {form} name="citizenship">
		<Form.Control let:attrs>
			<Form.Label>Applicant Citizenship <span class="text-destructive">*</span></Form.Label>
			<Select.Root
				selected={selected_citizenship}
				onSelectedChange={(v) => {
					v && ($formData.citizenship = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select citizenship" />
				</Select.Trigger>
				<Select.Content>
					{#each citizenships as c}
						<Select.Item value={c} label={c} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.citizenship} name={attrs.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	{#if selected_citizenship && selected_citizenship.value === 'Rwandan'}
		<!-- NID -->
		<Form.Field {form} name="nid">
			<Form.Control let:attrs>
				<Form.Label>NID <span class="text-destructive">*</span></Form.Label>
				<Input {...attrs} placeholder="Enter NID Number" bind:value={$formData.nid} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<div aria-hidden="true" />
	{:else if selected_citizenship && selected_citizenship.value === 'Foreigner'}
		<!-- PASSPORT NUMBER -->
		<Form.Field {form} name="passport_number">
			<Form.Control let:attrs>
				<Form.Label>Passport Number <span class="text-destructive">*</span></Form.Label>
				<Input
					{...attrs}
					placeholder="Enter Passport Number"
					bind:value={$formData.passport_number}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<div aria-hidden="true" />
	{/if}
	<div aria-hidden="true" />
	<!-- Phone Number -->
	<Form.Field {form} name="phone_number">
		<Form.Control let:attrs>
			<Form.Label>Phone Number</Form.Label>
			<Input {...attrs} placeholder="0781231567" bind:value={$formData.phone_number} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Email -->
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email address</Form.Label>
			<Input {...attrs} placeholder="Enter an email address" bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Surname -->
	<Form.Field {form} name="surname">
		<Form.Control let:attrs>
			<Form.Label>Surname <span class="text-destructive">*</span></Form.Label>
			<Input {...attrs} placeholder="Enter surname" bind:value={$formData.surname} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Other Names -->
	<Form.Field {form} name="other_names">
		<Form.Control let:attrs>
			<Form.Label>Other Names <span class="text-destructive">*</span></Form.Label>
			<Input {...attrs} placeholder="Enter other names" bind:value={$formData.other_names} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Nationality -->
	<Form.Field {form} name="nationality">
		<Form.Control let:attrs>
			<Form.Label>Nationality <span class="text-destructive">*</span></Form.Label>
			<Input {...attrs} placeholder="Enter nationality" bind:value={$formData.nationality} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<h2 class="scroll-m-20 text-xl font-semibold tracking-tight sm:col-span-2">
		Business Owner Address
	</h2>
	<!-- Business Owner Province -->
	<Form.Field {form} name="applicant_province">
		<Form.Control let:attrs>
			<Form.Label>Province <span class="text-destructive">*</span></Form.Label>
			<Select.Root
				selected={selected_applicant_province}
				onSelectedChange={(v) => {
					v && ($formData.applicant_province = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select province" />
				</Select.Trigger>
				<Select.Content>
					{#each provinces as p}
						<Select.Item value={p} label={p} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.applicant_province} name={attrs.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<h2 class="scroll-m-20 text-xl font-semibold tracking-tight sm:col-span-2">Business Details</h2>
	<!-- Business Type -->
	<Form.Field {form} name="business_type">
		<Form.Control let:attrs>
			<Form.Label>Business Type <span class="text-destructive">*</span></Form.Label>
			<Select.Root
				selected={selected_business_type}
				onSelectedChange={(v) => {
					v && ($formData.business_type = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select business type" />
				</Select.Trigger>
				<Select.Content>
					{#each business_types as b}
						<Select.Item value={b} label={b} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.business_type} name={attrs.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Company Name -->
	<Form.Field {form} name="company_name">
		<Form.Control let:attrs>
			<Form.Label>Company Name <span class="text-destructive">*</span></Form.Label>
			<Input {...attrs} placeholder="Enter company name" bind:value={$formData.company_name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- TIN Number -->
	<Form.Field {form} name="tin_number">
		<Form.Control let:attrs>
			<Form.Label>TIN Number <span class="text-destructive">*</span></Form.Label>
			<Input {...attrs} placeholder="Enter TIN Number" bind:value={$formData.tin_number} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Registration Date -->
	<Form.Field {form} name="registration_date" class="mt-2.5 flex flex-col">
		<Form.Control let:attrs>
			<Form.Label>Registration date <span class="text-destructive">*</span></Form.Label>
			<Popover.Root>
				<Popover.Trigger
					{...attrs}
					class={cn(
						buttonVariants({ variant: 'outline' }),
						'w-[280px] justify-start pl-4 text-left font-normal',
						!registration_date_value && 'text-muted-foreground'
					)}
				>
					{registration_date_value
						? df.format(registration_date_value.toDate(getLocalTimeZone()))
						: 'Pick a date'}
					<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0" side="top">
					<Calendar
						value={registration_date_value}
						bind:placeholder={registration_date_placeholder}
						minValue={new CalendarDate(1900, 1, 1)}
						maxValue={today(getLocalTimeZone())}
						calendarLabel="Date of birth"
						initialFocus
						onValueChange={(v) => {
							if (v) {
								$formData.registration_date = v.toString();
							} else {
								$formData.registration_date = '';
							}
						}}
					/>
				</Popover.Content>
			</Popover.Root>
			<Form.FieldErrors />
			<input hidden value={$formData.registration_date} name={attrs.name} />
		</Form.Control>
	</Form.Field>
	<h2 class="scroll-m-20 text-xl font-semibold tracking-tight sm:col-span-2">Business Address</h2>
	<!-- Business Province -->
	<Form.Field {form} name="business_province">
		<Form.Control let:attrs>
			<Form.Label>Province <span class="text-destructive">*</span></Form.Label>
			<Select.Root
				selected={selected_business_province}
				onSelectedChange={(v) => {
					v && ($formData.business_province = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select province" />
				</Select.Trigger>
				<Select.Content>
					{#each provinces as p}
						<Select.Item value={p} label={p} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.business_province} name={attrs.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<h2 class="scroll-m-20 text-xl font-semibold tracking-tight sm:col-span-2">
		Importation Details
	</h2>
	<!-- Purpose of Importation -->
	<Form.Field {form} name="purpose_of_importation">
		<Form.Control let:attrs>
			<Form.Label>Purpose of Importation <span class="text-destructive">*</span></Form.Label>
			<Select.Root
				selected={selected_purpose_of_importation}
				onSelectedChange={(v) => {
					v && ($formData.purpose_of_importation = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Enter the purpose of importation" />
				</Select.Trigger>
				<Select.Content>
					{#each purposes_of_importation as p}
						<Select.Item value={p} label={p} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.purpose_of_importation} name={attrs.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Specify Purpose of Importation -->
	{#if $formData.purpose_of_importation === 'Other'}
		<Form.Field {form} name="specify_purpose_of_importation">
			<Form.Control let:attrs>
				<Form.Label
					>Specify Purpose of Importation <span class="text-destructive">*</span></Form.Label
				>
				<Input
					{...attrs}
					placeholder="Specify the purpose of importation"
					bind:value={$formData.specify_purpose_of_importation}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	{:else}
		<div aria-hidden="true" />
	{/if}
	<h2 class="scroll-m-20 text-xl font-semibold tracking-tight sm:col-span-2">Product Details</h2>
	<!-- Product Name -->
	<Form.Field {form} name="product_name">
		<Form.Control let:attrs>
			<Form.Label>Product Name</Form.Label>
			<Input {...attrs} placeholder="Product Name" bind:value={$formData.product_name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Product Category -->
	<Form.Field {form} name="product_category">
		<Form.Control let:attrs>
			<Form.Label>Product Category <span class="text-destructive">*</span></Form.Label>
			<Select.Root
				selected={selected_product_category}
				onSelectedChange={(v) => {
					v && ($formData.product_category = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select product category" />
				</Select.Trigger>
				<Select.Content>
					{#each product_categories as p}
						<Select.Item value={p} label={p} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.product_category} name={attrs.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Weight -->
	<Form.Field {form} name="weight_kg">
		<Form.Control let:attrs>
			<Form.Label>Weight (Kg)</Form.Label>
			<Input {...attrs} placeholder="Weight (Kg)" bind:value={$formData.weight_kg} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Unit of Measurement -->
	<Form.Field {form} name="unit_of_measurement">
		<Form.Control let:attrs>
			<Form.Label>Unit of Measurement <span class="text-destructive">*</span></Form.Label>
			<Select.Root
				selected={selected_unit_of_measurement}
				onSelectedChange={(v) => {
					v && ($formData.unit_of_measurement = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select unit of measurement" />
				</Select.Trigger>
				<Select.Content>
					{#each units_of_measurement as u}
						<Select.Item value={u} label={u} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.unit_of_measurement} name={attrs.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Quantity of products -->
	<Form.Field {form} name="quantity_of_products">
		<Form.Control let:attrs>
			<Form.Label>Quantity of products <span class="text-destructive">*</span></Form.Label>
			<Input
				{...attrs}
				placeholder="Enter Quantity of products"
				bind:value={$formData.quantity_of_products}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div aria-hidden="true" />
	<!-- Description of products -->
	<Form.Field {form} name="description_of_products" class="sm:col-span-2">
		<Form.Control let:attrs>
			<Form.Label>Description of products <span class="text-destructive">*</span></Form.Label>
			<Textarea
				{...attrs}
				placeholder="Enter product description"
				class="resize-none"
				bind:value={$formData.description_of_products}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
