<template>
  <Layout class="layout">
    <Header>
      <div class="header">
        <div class="title">Questionnare System</div>
        <div class="current-user">当前用户: {{ userInfo.username }}</div>
      </div>
    </Header>
    <Layout>
      <Sider width="200" theme="light">
        <Menu mode="inline" theme="light" @click="handleMenuClick">
          <!-- <SubMenu v-for="subMenu of siderMenuConfig" :key="subMenu.key">
            <span slot="title">{{ subMenu.title }}</span>
            <MenuItem v-for="item of subMenu.subs" :key="item.key">{{
              item.title
            }}</MenuItem>
          </SubMenu> -->
          <!-- <div v-for="subMenu of siderMenuConfig" :key="subMenu.key">
            <SubMenu v-if="subMenu.subs">
              <span slot="title">{{ subMenu.title }}</span>
              <MenuItem v-for="item of subMenu.subs" :key="item.key">{{
                item.title
              }}</MenuItem>
            </SubMenu>
            <MenuItem v-else>
              {{ subMenu.title }}
            </MenuItem>
          </div> -->
          <div>
            <MenuItem>test</MenuItem>
          </div>
        </Menu>
      </Sider>
      <Content>
        <router-view />
      </Content>
    </Layout>
  </Layout>
</template>
