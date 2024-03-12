<script lang="ts">
	import { Hr, Html, Text } from 'svelte-email';
	import type { TServiceForm } from './schema';

	export let payload: TServiceForm | undefined;
</script>

<Html lang="en">
	<Text>
		Hello, {payload?.other_names}.
	</Text>
	<Hr />
	<Text>
		Thank you for your interest in our services. We have received your request and will get back to
		you as soon as possible.
	</Text>
	<Hr />
	<Text>Here are the details you provided:</Text>
	<Hr />
	<Text>
		<strong>Full Name:</strong>
		{payload?.other_names}
		{payload?.surname}
	</Text>
	<Text>
		<strong>Email:</strong>
		{payload?.email}
	</Text>
	<Text>
		<strong>Phone Number:</strong>
		{payload?.phone_number}
	</Text>
	<Text>
		<strong>National ID:</strong>
		{payload?.nid}
	</Text>
	<Text>
		<strong>Passport Number:</strong>
		{payload?.passport_number}
	</Text>
	<Text>
		<strong>Company Name:</strong>
		{payload?.company_name}
	</Text>
	<Text>
		<strong>Business Type:</strong>
		{payload?.business_type}
	</Text>
	<Text>
		<strong>Business Province:</strong>
		{payload?.business_province}
	</Text>
	<Text>
		<strong>Applicant Province:</strong>
		{payload?.applicant_province}
	</Text>
	<Text>
		<strong>Product Name:</strong>
		{payload?.product_name}
	</Text>
	<Text>
		<strong>Product Category:</strong>
		{payload?.product_category}
	</Text>
	<Text>
		<strong>Quantity of Products:</strong>
		{payload?.quantity_of_products}
	</Text>
	<Text>
		<strong>Unit of Measurement:</strong>
		{payload?.unit_of_measurement}
	</Text>
	<Text>
		<strong>Weight (kg):</strong>
		{payload?.weight_kg}
	</Text>
	<Text>
		<strong>Description of Products:</strong>
		{payload?.description_of_products}
	</Text>
	<Text>
		<strong>Purpose of Importation:</strong>
		{payload?.purpose_of_importation}
	</Text>
	<Text>
		<strong>Specify Purpose of Importation:</strong>
		{payload?.specify_purpose_of_importation}
	</Text>
	<Text>
		<strong>Registration Date:</strong>
		{payload?.registration_date}
	</Text>
	<Text>
		<strong>TIN Number:</strong>
		{payload?.tin_number}
	</Text>
</Html>
