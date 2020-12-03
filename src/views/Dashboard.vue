<template lang="pug">
div {{ count }} {{ object.foo }}
</template>

<script lang="ts">

import { ref, reactive, defineComponent } from 'vue';

interface Foo {
  foo: string;
}

export default defineComponent({
  setup() {
    const count = ref(0);
    const object = reactive({ foo: 'bar' }) as Foo;

    // expose to template
    return {
      count,
      object,
    };
  },
});
</script>
