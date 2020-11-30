<template lang="pug">
.sidebar(:class="{'has-logo':showLogo}")
  logo(v-if="showLogo" :collapse="isCollapse")
  el-scrollbar(wrap-class="scrollbar-wrapper")
    el-menu(
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    )
      sidebar-item(
        v-for="route in permissionRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      )
</template>

<script>
import { mapGetters } from 'vuex';
import variables from '@styles/variables.scss';
import Logo from './Logo.vue';
import SidebarItem from './SidebarItem.vue';
import data from './mock.json';

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      // 'permissionRoutes',
      'sidebar',
    ]),
    permissionRoutes() {
      console.log('permissionRoutes', data);
      return data;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return false;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      // return !this.sidebar.opened;
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 250px;
}
</style>
