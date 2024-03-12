<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { ServiceFormSchema, citizenships, type ServiceForm } from './schema';

	export let data: SuperValidated<Infer<ServiceForm>>;

	export let form = superForm(data, {
		validators: zodClient(ServiceFormSchema)
	});

	const { form: formData } = form;

	$: selected_citizenship = $formData.citizenship
		? {
				label: $formData.citizenship,
				value: $formData.citizenship
			}
		: undefined;
</script>

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
