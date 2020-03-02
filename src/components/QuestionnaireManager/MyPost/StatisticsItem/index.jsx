import { Vue, Component, Prop } from "vue-property-decorator";
import { List } from "ant-design-vue";

import PieChart from "./components/PieChart";

const { Item: ListItem } = List;

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "flex-start",
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
      <ListItem>
        {item.option}:{" "}
        <span style={{ color: "red", marginLeft: "5px" }}>{item.count}</span>
      </ListItem>
    );
  }

  render(h) {
    const { record } = this;
    const { question_name, options_with_count } = record;

    return (
      <div style={styles.wrapper}>
        <PieChart options={options_with_count} />

        <List
          itemLayout="horizontal"
          bordered
          split
          dataSource={options_with_count}
          renderItem={this.listRenderItem}
        />
      </div>
    );
  }
}
