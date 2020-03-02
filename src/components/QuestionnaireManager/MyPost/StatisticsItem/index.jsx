import { Vue, Component, Prop } from "vue-property-decorator";
import { List } from "ant-design-vue";

import PieChart from "./components/PieChart";

const styles = {
  wrapper: {
    display: "flex",
  },
  questionItem: {
    width: "400px",
    height: "400px",
    marginRight: "30px",
    backgroundColor: "grey",
  },
};

@Component
export default class StatisticsItem extends Vue {
  @Prop()
  record;

  @Prop()
  index;

  listRenderItem(item, index) {
    return (
      <div>
        {item.option}: {item.count}
      </div>
    );
  }

  render(h) {
    const { record } = this;
    const { question_name, options_with_count } = record;

    return (
      <div style={styles.wrapper}>
        <PieChart options={options_with_count} />

        <List
          dataSource={options_with_count}
          renderItem={this.listRenderItem}
        />
      </div>
    );
  }
}
