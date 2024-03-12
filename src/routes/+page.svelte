<script lang="ts">
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form/index.js';
	import Loader from 'lucide-svelte/icons/loader';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import BusinessAddress from './business-address.svelte';
	import BusinessDetails from './business-details.svelte';
	import BusinessOwnerAddress from './business-owner-address.svelte';
	import BusinessOwnerDetails from './business-owner-details.svelte';
	import ImportationDetails from './importation-details.svelte';
	import ProductDetails from './product-details.svelte';
	import { ServiceFormSchema } from './schema';

	export let data;

	const form = superForm(data.form, {
		validators: zodClient(ServiceFormSchema)
	});

	const { form: formData, enhance, delayed } = form;
</script>

<section id="service-form" class="mx-auto max-w-2xl space-y-4 px-4 py-16 md:px-8">
	<form method="POST" use:enhance class="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2">
		<BusinessOwnerDetails {form} data={data.form} />
		<BusinessOwnerAddress {form} data={data.form} />
		<BusinessDetails {form} data={data.form} />
		<BusinessAddress {form} data={data.form} />
		<ImportationDetails {form} data={data.form} />
		<ProductDetails {form} data={data.form} />
		<Form.Button disabled={$delayed}>
			{#if $delayed}
				<Loader aria-hidden class="mr-2 size-4 animate-spin" />
			{/if}
			Submit
		</Form.Button>
	</form>
</section>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
