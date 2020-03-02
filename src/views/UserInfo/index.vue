<template>
  <div class="card-wrapper">
    <Card style="width:400px;" title="个人信息">
      <!-- {{ JSON.stringify(this.message) }} -->
      <List :dataSource="showInfo" :renderItem="renderItem" :split="false" />
    </Card>
  </div>
</template>

<script>
import { Card, List } from "ant-design-vue";

import { reduce } from "lodash-es";

const { Item: ListItem } = List;

const map = {
  username: "用户名",
  email: "邮箱",
  company_name: "单位名称",
};

export default {
  props: ["message"],
  components: {
    Card,
    List,
  },
  data() {
    return {};
  },
  computed: {
    showInfo() {
      return reduce(
        this.message,
        (result, value, key) => {
          return map[key] ? [...result, { label: map[key], value }] : result;
        },
        [],
      );
    },
  },
  methods: {
    renderItem(item, index) {
      return (
        <ListItem>
          {item.label}: {item.value}
        </ListItem>
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  // justify-content: center;
  // align-items: center;
}
</style>
