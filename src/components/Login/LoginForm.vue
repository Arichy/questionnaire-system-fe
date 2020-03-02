<template>
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

    <FormItem v-bind="tailFormItemLayout">
      <Button type="primary" html-type="submit">登陆</Button>
    </FormItem>
  </Form>
</template>

<script>
import { Form, Input, Button } from "ant-design-vue";

const { Item: FormItem } = Form;

export default {
  name: "signup_form",
  components: {
    Form,
    FormItem,
    Input,
    Button,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
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
      },
      tailFormItemLayout: {
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
      },
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // console.log(values);
          this.$emit("submit", values);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$contentWidth: 600px;

.form {
  // width: $contentWidth;
  padding: 20px;
  // border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}

.form-enter,
.form-enter-to {
  transition: opacity 2s;
}
</style>
