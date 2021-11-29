<template>
    <div>
    <label v-if="label">{{ label }}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default defineComponent({
    name:"uiFormItem",
    props:{
      prop:{
           type: String
      },
      label:{
          type:String,
          default: ''
      }
    }
})
</script>