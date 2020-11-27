<template lang="pug">
el-container.container
  el-header.header
    span Tom

  el-container
    el-aside.aside
      el-menu(:default-openeds="['1', '3']")
        el-submenu(index="1")
          template(#title)
            i.el-icon-message Navigator One
          el-menu-item-group
            template(slot="title") Group 1
            el-menu-item(index="1-1") Option 1
          el-menu-item(index="1-2") Option 2

    el-main
      router-view
</template>

<script lnag="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(0);

    return { count };
  },
});

</script>

<style lang="scss">
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.container {
  height: 100vh;
  border: 1px solid #eee;
  .aside {
    width: 200px;
    background-color: rgb(238, 241, 246);
  }
}

.header {
  text-align: right;
  font-size: 12px;
}

</style>
