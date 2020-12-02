<template lang="pug">
.app-wrapper(:class="classObj")
  sidebar.sidebar-container
  .main-container.hasTagsView
    div
      navbar

</template>

<script lnag="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

import { Sidebar, Navbar } from './components';
import ResizeMixin from './mixin/ResizeHandler';

export default defineComponent({
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
  },
  mixins: [ResizeMixin],
  setup() {
    const store = useStore();
    const { app } = store.state;
    const { sidebar, device } = app;

    const classObj = computed(() => ({
      hideSidebar: !sidebar.opened,
      openSidebar: sidebar.opened,
      withoutAnimation: sidebar.withoutAnimation,
      mobile: device === 'mobile',
    }));

    return { classObj };
  },
});
</script>

<style lang="scss" scoped>
@import "~@styles/mixin.scss";
@import "~@styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

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
