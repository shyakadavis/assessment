<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { ServiceFormSchema, purposes_of_importation, type ServiceForm } from './schema';

	export let data: SuperValidated<Infer<ServiceForm>>;

	export let form = superForm(data, {
		validators: zodClient(ServiceFormSchema)
	});

	const { form: formData } = form;

	$: selected_purpose_of_importation = $formData.purpose_of_importation
		? {
				label: $formData.purpose_of_importation,
				value: $formData.purpose_of_importation
			}
		: undefined;
</script>

<h2 class="scroll-m-20 text-xl font-semibold tracking-tight sm:col-span-2">Importation Details</h2>
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
			<Form.Label>Specify Purpose of Importation <span class="text-destructive">*</span></Form.Label
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
