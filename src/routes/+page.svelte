<script lang="ts">
	import Form from './form.svelte';

	export let data;
</script>

<section id="service-form" class="mx-auto max-w-2xl space-y-4 px-4 py-16 md:px-8">
	<Form data={data.form} />
</section>
