<script>
import { Layout, Menu, Icon, Dropdown } from "ant-design-vue";
import { siderMenuConfig } from "./config";
import IO from "./api";

import { reduceRight, map, flatten } from "lodash-es";

const { Header, Sider, Content } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

const configForGetKeysByPath = (function f(configArr) {
  const result = [];
  for (const item of configArr) {
    if (item.subs) {
      result.push(...f(item.subs));
    } else {
      result.push(item);
    }
  }
  return result;
})(siderMenuConfig);

export default {
  name: "index",

  data() {
    return {
      userInfo: { username: "" },
    };
  },

  computed: {
    defaultSelectedKeys() {
      return this.getDefaultSelectedKeys();
    },
  },

  mounted() {
    this.getDefaultSelectedKeys();
    this.getInfo();
  },

  methods: {
    async getInfo() {
      try {
        const res = await IO.getInfo();
        this.userInfo = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    handleMenuClick({ keyPath }) {
      const path = `/${reduceRight(keyPath, (result, item) => {
        return `${result}/${item}`;
      })}`;

      this.$router.replace(path);
    },
    getDefaultSelectedKeys() {
      const target = configForGetKeysByPath.find(item =>
        this.$route.path.endsWith(item.path),
      );
      return [target.key];
    },
    logout() {
      sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
  },

  render(h) {
    const { userInfo, defaultSelectedKeys } = this;

    return (
      <Layout class="layout">
        <Header>
          <div class="header">
            <div class="title">毕设：调查问卷系统</div>

            <div class="current-user">
              <Dropdown
                overlay={
                  <Menu>
                    <MenuItem>
                      <a onClick={this.logout} style={{ color: "#f5222d" }}>
                        退出登录
                      </a>
                    </MenuItem>
                  </Menu>
                }
              >
                <span>当前用户: {userInfo.username}</span>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider width="200" theme="dark">
            <Menu
              mode="inline"
              theme="dark"
              onClick={this.handleMenuClick}
              defaultSelectedKeys={defaultSelectedKeys}
            >
              {map(siderMenuConfig, (item, index) =>
                item.subs ? (
                  <SubMenu key={item.key}>
                    <span slot="title">
                      {item.icon ? <Icon type={item.icon} /> : null}
                      {item.title}
                    </span>
                    {map(item.subs, (item, index) => (
                      <MenuItem key={item.key}>
                        {item.icon ? <Icon type={item.icon} /> : null}
                        {item.title}
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  <MenuItem key={item.key}>
                    {item.icon ? <Icon type={item.icon} /> : null}
                    {item.title}
                  </MenuItem>
                ),
              )}
            </Menu>
          </Sider>
          <Content class="content">
            <router-view message={userInfo} />
          </Content>
        </Layout>
      </Layout>
    );
  },
};
</script>

<style lang="scss" scoped>
.layout {
  // width: 100%;
  height: 100%;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: white;

    .title {
      font-size: 25px;
    }
    .current-user {
      font-size: 17px;
      cursor: pointer;
    }
  }

  .content {
    padding: 20px;
    overflow: scroll;
  }
}
</style>
