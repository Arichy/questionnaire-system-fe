import { Vue, Component, Prop } from "vue-property-decorator";
import echarts from "echarts";

@Component
export default class PieChart extends Vue {
  @Prop()
  options;

  @Prop()
  title;

  mounted() {
    const { options, title } = this;
    const pieChart = echarts.init(this.$refs.pieChart, "light");

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: 10,
        data: options.map(({ option }) => option),
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center",
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold",
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: options.map(({ option, count }) => ({
            name: option,
            value: count,
          })),
        },
      ],
    };

    pieChart.setOption(option);
  }

  render(h) {
    return (
      <div ref="pieChart" style={{ width: "600px", height: "400px" }}></div>
    );
  }
}