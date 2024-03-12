<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { ServiceFormSchema, provinces, type ServiceForm } from './schema';

	export let data: SuperValidated<Infer<ServiceForm>>;

	export let form = superForm(data, {
		validators: zodClient(ServiceFormSchema)
	});

	const { form: formData } = form;

	$: selected_applicant_province = $formData.applicant_province
		? {
				label: $formData.applicant_province,
				value: $formData.applicant_province
			}
		: undefined;
</script>

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
