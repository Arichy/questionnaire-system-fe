<template>
  <div class="wrapper">
    <Spin :spinning="isLoading">
      <Table
        :dataSource="questionnaires"
        :columns="columns"
        :expandedRowRender="expandedRowRender"
        :rowKey="'questionnaire_id'"
        :pagination="pagination"
        @change="handlePageChange"
      />
    </Spin>
  </div>
</template>

<script>
import { Button, Tooltip, Table, Spin, message } from "ant-design-vue";

import StatisticsItem from "@/components/QuestionnaireManager/MyPost/StatisticsItem";

import moment from "moment";

import IO from "../api";
import { SINGLE_CHOICE, MULTIPLE_CHOICE } from "@/common/const";

const PAGE_SIZE = 10;

export default {
  name: "MyPost",
  components: {
    Table,
    Spin,
  },

  data() {
    return {
      isLoading: false,
      questionnaires: [],
      columns: [
        {
          title: "问卷标题",
          dataIndex: "questionnaire_name",
        },
        {
          title: "问题数量",
          dataIndex: "questions",
          customRender: (value, record, index) => value.length,
        },
        {
          title: "已填写的人数",
          dataIndex: "fill_count",
        },
        {
          title: "开始时间",
          dataIndex: "start_time",
          customRender: value => moment(value).format("YYYY-MM-DD HH:mm"),
        },
        {
          title: "结束时间",
          dataIndex: "end_time",
          customRender: value => moment(value).format("YYYY-MM-DD HH:mm"),
        },
        {
          title: "问卷状态",
          dataIndex: "status",
          customRender: value => {
            switch (value) {
              case 0:
                return <span style={{ color: "#108ee9" }}>未开始</span>;
              case 1:
                return <span style={{ color: "#52c41a" }}>进行中</span>;
              case 2:
                return <span style={{ color: "#f50" }}>已结束</span>;
            }
          },
        },
      ],
      pagination: {
        pageSize: PAGE_SIZE,
        total: 0,
        current: 1,
        showTotal: total => `共 ${total} 个`,
      },
    };
  },

  mounted() {
    this.getQuestionnaire();
  },

  methods: {
    async getQuestionnaire() {
      try {
        this.isLoading = true;
        const res = await IO.getQuestionnaires({
          pageSize: PAGE_SIZE,
          pageNum: this.pagination.current,
        });
        this.questionnaires = res.data;
        this.$set(this.pagination, "total", res.total);
      } catch (err) {
        message.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    expandedRowRender(record, index, indent, expanded) {
      const columns = [
        {
          title: "问题",
          dataIndex: "question_name",
        },
        {
          title: "类型",
          dataIndex: "question_type",
          customRender: (value, record, index) => {
            switch (value) {
              case SINGLE_CHOICE:
                return "单选";
              case MULTIPLE_CHOICE:
                return "多选";
            }
          },
        },
      ];

      return (
        <Table
          dataSource={record.questions}
          columns={columns}
          pagination={false}
          rowKey={"question_id"}
          expandedRowRender={(record, index, indent, expanded) => {
            return <StatisticsItem record={record} index={index} />;
          }}
        />
      );
    },

    handlePageChange({ current, pageSize, total }) {
      this.$set(this.pagination, "current", current);
      this.$set(this.pagination, "pageSize", pageSize);

      this.getQuestionnaire();
    },
  },
};
</script>
