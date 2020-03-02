<script>
import { Checkbox } from "ant-design-vue";

export default {
  props: ["value", "maxNum", "options"],

  data() {
    return {
      optionsWithInfo: [],
      chosenNum: 0,
    };
  },

  mounted() {
    console.log("onMount");
    this.optionsWithInfo = this.$props.options.map(item => ({
      option: item,
      checked: false,
      disabled: false,
    }));
  },

  beforeUpdate() {
    console.log("beforeUpdate cg");
  },

  methods: {
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

      this.$emit(
        "change",
        this.optionsWithInfo
          .filter(item => item.checked)
          .map(item => item.option),
      );
    },
  },

  render(h) {
    const { optionsWithInfo } = this;
    return (
      <div>
        {optionsWithInfo.map(({ option, checked, disabled }, index) => (
          <Checkbox
            onChange={e => this.handleChange(e.target.checked, index)}
            disabled={disabled}
            checked={checked}
          >
            {option}
          </Checkbox>
        ))}
      </div>
    );
  },
};
</script>

<style lang="scss" scoped></style>
