<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
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
	import { ServiceFormSchema, business_types, type ServiceForm } from './schema';

	export let data: SuperValidated<Infer<ServiceForm>>;

	export let form = superForm(data, {
		validators: zodClient(ServiceFormSchema)
	});

	const { form: formData } = form;

	$: selected_business_type = $formData.business_type
		? {
				label: $formData.business_type,
				value: $formData.business_type
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
