<template>
    <form>
        <slot></slot>
    </form>
</template>
<script>
export default defineComponent({
    name:"uiForm",
    props:{
      roles:{
           type: Object
      },
      modelValue:{
          type: Object
      }
    }
})
</script>