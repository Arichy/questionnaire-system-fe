<template>
  <div class="wrapper">
    <div class="title-wrapper"><div class="title-text">New Account</div></div>
    <Form class="form" :form="form" @submit="handleSubmit">
      <FormItem v-bind="formItemLayout" label="用户名">
        <Input
          v-decorator="[
            'username',
            {
              rules: [
                {
                  required: true,
                  message: '用户名不能为空',
                },
                {
                  min: 4,
                  max: 20,
                  message: '用户名不少于4位，不超过20位',
                },
              ],
            },
          ]"
        />
      </FormItem>
      <FormItem v-bind="formItemLayout" label="邮箱">
        <Input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: '非法邮箱格式',
                },
                {
                  required: true,
                  message: '邮箱不能为空',
                },
                {
                  max: 20,
                  message: '邮箱不超过20位',
                },
              ],
            },
          ]"
        />
      </FormItem>
      <FormItem v-bind="formItemLayout" label="密码">
        <Input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: '密码不能为空',
                },
                {
                  min: 6,
                  max: 18,
                  message: '密码不少于6位，不超过18位',
                },
              ],
            },
          ]"
          type="password"
        />
      </FormItem>
      <FormItem v-bind="formItemLayout" label="确认密码">
        <Input
          v-decorator="[
            'password2',
            {
              rules: [
                {
                  required: true,
                  message: '密码不能为空',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
        />
      </FormItem>
      <FormItem v-bind="tailFormItemLayout">
        <Button type="primary" html-type="submit">注册</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import { Form, Input, Button } from "ant-design-vue";

const { Item: FormItem } = Form;

@Component({
  components: {
    Form,
    FormItem,
    Input,
    Button,
  },
})
export default class Signup extends Vue {
  formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  handleSubmit = e => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  compareToFirstPassword = (rule, value, cb) => {
    const { form } = this;

    if (value && value !== form.getFieldValue("password")) {
      cb("两次输入的密码不一样");
    } else {
      cb();
    }
  };

  beforeCreate() {
    this.form = this.$form.createForm(this);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  $contentWidth: 600px;
  .title-wrapper {
    width: $contentWidth;
    font-size: 30px;
    padding-top: 30px;
    padding-bottom: 30px;
    height: 100px;
    align-items: center;
    justify-content: center;
  }

  .form {
    width: $contentWidth;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 2px;
  }
}
</style>
