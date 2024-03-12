<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import {
		ServiceFormSchema,
		product_categories,
		units_of_measurement,
		type ServiceForm
	} from './schema';

	export let data: SuperValidated<Infer<ServiceForm>>;

	export let form = superForm(data, {
		validators: zodClient(ServiceFormSchema)
	});

	const { form: formData } = form;

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
</script>

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
