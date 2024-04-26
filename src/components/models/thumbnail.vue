<template>
  <div class="thumb overflow-hidden me-2" :style="{ backgroundColor: assistant.hexcolor || '#fff' }">
    <img v-if="!assistant.hexcolor || assistant.hexcolor == 'null'" :src="assistant.profile_pic_small || assistantThumbPlaceholder" alt="" />
    <div v-else>{{ assistant.name.substr(0, 1) }}</div>
  </div>
</template>

<script>
export default {
  name: 'AssistantThumbnail',
  props: {
    assistant: {
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    assistantThumbPlaceholder() {
      return require('@/assets/images/assistant-thumb.png');
    },
  }
}
</script>

<style scoped lang="scss">
  .thumb {
    width: 28px;
    min-width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid #ececec;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #fff;
    font-weight: 700;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
</style>