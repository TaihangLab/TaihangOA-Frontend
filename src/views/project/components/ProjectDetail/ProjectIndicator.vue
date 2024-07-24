<template>
  <el-card header="项目指标" shadow="hover">
    <el-form ref="form" :model="form" label-position="left">
      <el-row
        v-for="(item, index) in form.items"
        :key="index"
        justify="center"
        :gutter="10"
        type="flex"
        @mouseover="isButtonShowList[index] = true"
        @mouseleave="isButtonShowList[index] = false"
      >
        <el-col :span="1" style="text-align: center">
          <el-button
            v-show="index === form.items.length - 1 && isButtonShowList[index]"
            icon="el-icon-circle-plus"
            circle
            type="success"
            plain
            @click="add"
          ></el-button>
        </el-col>

        <el-col :span="6">
          <el-form-item label-width="80px" label="指标名称">
            <el-input v-model="item.title" @input="input"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label-width="120px" label="中期指标值/状态">
            <el-input v-model="item.midterm" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" maxlength="500" show-word-limit @input="input">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label-width="120px" label="完成指标值/状态">
            <el-input v-model="item.finish" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" maxlength="500" show-word-limit @input="input">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="1" style="text-align: center">
          <el-button
            v-show="form.items.length !== 1 && isButtonShowList[index]"
            icon="el-icon-remove"
            circle
            type="danger"
            plain
            @click="remove(index)"
          ></el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['form'],
  data() {
    return {
      isButtonShowList: [false],
      id: 1,
      list: []
    };
  },
  mounted() {
    this.$props.form.items = [{ title: undefined, midterm: '', finish: '' }];
  },
  methods: {
    // 新增一条
    add() {
      this.$props.form.items.push({
        title: '',
        midterm: '',
        finish: ''
      });
      this.isButtonShowList.push(false);
      this.$forceUpdate();
    },
    // 删除一条
    remove(index) {
      this.$props.form.items.splice(index, 1);
      this.isButtonShowList.splice(index, 1);
      this.$forceUpdate();
    },
    // 输入实时回显
    input() {
      this.$forceUpdate();
    },
    // 重置表单
    reset() {
      this.$set(this.$props.form, 'items', [{ title: undefined, midterm: '', finish: '' }]);
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped>
.el-button {
  border: none;
  padding: 0;
  font-size: 2rem;
}

:deep(.el-icon-circle-plus) {
}
</style>
