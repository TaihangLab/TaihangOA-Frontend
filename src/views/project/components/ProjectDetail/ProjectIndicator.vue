<template>
  <el-card header="项目指标" shadow="hover">
    <el-form ref="form" :model="form" label-position="left">
      <el-row
        v-for="(item, index) in form.items"
        :key="index"
        justify="center"
        :gutter="10"
        type="flex"
        @mouseover="Mousedata(index, true)"
        @mouseout="Mousedata(index, false)"
      >
        <el-col :span="1" style="text-align: center">
          <el-button
            v-show="index === form.items.length - 1 && showdata.isButtonShowList[index]"
            icon="CirclePlus"
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
            v-show="form.items.length !== 1 && showdata.isButtonShowList[index]"
            icon="RemoveFilled"
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

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';

const props = defineProps(['form']);
const instance = getCurrentInstance();
const data = {
  return: {
    id: 1,
    list: []
  }
};
const showdata = reactive({
  isButtonShowList: [] as boolean[]
});

onMounted(() => {
  // eslint-disable-next-line vue/no-mutating-props
  props.form.items = [{ title: undefined, midterm: '', finish: '' }];
});

// 新增一条
function add() {
  // eslint-disable-next-line vue/no-mutating-props
  props.form.items.push({
    title: '',
    midterm: '',
    finish: ''
  });
  showdata.isButtonShowList.push(false);
  instance.proxy.$forceUpdate();
}
// 删除一条
function remove(index) {
  // eslint-disable-next-line vue/no-mutating-props
  props.form.items.splice(index, 1);
  showdata.isButtonShowList.splice(index, 1);
  instance.proxy.$forceUpdate();
}
// 输入实时回显
function input() {
  instance.proxy.$forceUpdate();
}
// 重置表单
function reset() {
  // eslint-disable-next-line vue/no-mutating-props
  props.form.items = [{ title: undefined, midterm: '', finish: '' }];
  instance.proxy.$forceUpdate();
}

function Mousedata(index: number, show: boolean) {
  showdata.isButtonShowList[index] = show;
}
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
