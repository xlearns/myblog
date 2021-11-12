<template>
	<component :is="comp"></component>
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "../testRouter/index";

let router = useRouter();

const comp = computed(() => {
	const route = router.routes[0].children.find(
		(route) => route.path === router.current.value
	);
	return route ? route.component : null;
});
</script>
