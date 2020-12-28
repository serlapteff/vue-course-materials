<template>
  <img class="icon" alt="icon" :src="iconSrc" />
</template>

<script>
export default {
  name: 'AppIcon',

  props: {
    icon: {
      type: String,
      required: true,
    },
  },

  computed: {
    iconSrc() {
      return require(`@/assets/icons/icon-${this.icon}.svg`);
    },
  },
};
</script>

<style scoped></style>
