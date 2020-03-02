import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
import { Checkbox } from "ant-design-vue";
import e from "@/utils/event";

@Component
export default class CheckboxGroup extends Vue {
  @Prop({ default: [] })
  options;

  @Prop({ type: Number, default: Number.MAX_VALUE })
  maxNum;

  @Prop()
  value;

  @Prop({ default: 1 })
  status;

  chosenNum = 0;
  forceDisable = false;

  mounted() {
    e.on("submit", () => {
      this.forceDisable = true;
    });
  }

  beforeDestroy() {
    e.off("submit");
  }

  get optionsWithInfo() {
    return this.$props.options.map(item => ({
      option: item,
      checked: false,
      disabled: false,
    }));
  }

  @Emit("change")
  handleChange(checked, index) {
    const targetOption = this.optionsWithInfo[index];

    targetOption.checked = checked;

    if (checked) {
      this.chosenNum++;
    } else {
      this.chosenNum--;
    }
    if (this.chosenNum >= this.maxNum) {
      for (let i = 0; i < this.optionsWithInfo.length; i++) {
        if (!this.optionsWithInfo[i].checked) {
          this.optionsWithInfo[i].disabled = true;
        }
      }
    }

    if (!checked && this.chosenNum === this.maxNum - 1) {
      for (let i = 0; i < this.optionsWithInfo.length; i++) {
        this.optionsWithInfo[i].disabled = false;
      }
    }

    this.$forceUpdate();

    return this.optionsWithInfo
      .filter(item => item.checked)
      .map(item => item.option);
  }

  @Watch("maxNum")
  onMaxNumChanged() {
    for (const item of this.optionsWithInfo) {
      item.checked = false;
      item.disabled = false;
    }
    this.chosenNum = 0;
  }

  render(h) {
    const { optionsWithInfo, maxNum, status, value, forceDisable } = this; // value for update

    return (
      <div>
        {optionsWithInfo.map(({ option, checked, disabled }, index) => (
          <Checkbox
            onChange={e => this.handleChange(e.target.checked, index)}
            disabled={forceDisable || status !== 1 || disabled}
            checked={(status === -1 && value.includes(option)) || checked}
          >
            {option}
          </Checkbox>
        ))}
      </div>
    );
  }
}
