<template>
  <el-card header="项目计划" shadow="hover">
    <el-form ref="form" :model="form" label-position="left">
      <el-row
        v-for="(item, index) in props.form.items"
        :key="index"
        justify="center"
        type="flex"
        @mouseover="Mousedata(index, true)"
        @mouseout="Mousedata(index, false)"
      >
        <el-col :span="1" style="text-align: center">
          <el-button
            v-show="index === form.items.length - 1 && data.isButtonShowList[index]"
            icon="CirclePlus"
            circle
            type="success"
            plain
            @click="add"
          ></el-button>
        </el-col>

        <el-col :span="9">
          <el-form-item label-width="80px" label="时间范围" prop="id">
            <el-date-picker
              v-model="item.date"
              type="monthrange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="YYYY-MM"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="9" :offset="1">
          <el-form-item label-width="80px" label="任务计划" prop="role">
            <el-input v-model="item.task" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" maxlength="500" show-word-limit @input="input">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="text-align: center">
          <el-button
            v-show="form.items.length !== 1 && data.isButtonShowList[index]"
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

const { proxy } = getCurrentInstance();
const props = defineProps(['form']);
const data = reactive({
  isButtonShowList: [] as boolean[]
});
defineExpose({
  reset
});

onMounted(() => {
  // eslint-disable-next-line vue/no-mutating-props
  props.form.items = [{ date: undefined, task: '' }];
});

// 新增一条
function add() {
  // eslint-disable-next-line vue/no-mutating-props
  props.form.items.push({
    date: undefined,
    task: ''
  });
  data.isButtonShowList.push(false);
  // $forceUpdate();
}

// 删除一条
function remove(index) {
  // eslint-disable-next-line vue/no-mutating-props
  props.form.items.splice(index, 1);
  data.isButtonShowList.splice(index, 1);
}

// 重置表单
function reset() {
  // eslint-disable-next-line vue/no-mutating-props
  props.form.items = [{ date: undefined, task: '' }];
  proxy.$forceUpdate();
}

// 输入实时回显
function input() {
  proxy.$forceUpdate();
}

// 日期选择快捷选项
const pickerOptions = {
  shortcuts: [
    {
      text: '本月',
      onClick(picker) {
        picker.$emit('pick', [new Date(), new Date()]);
      }
    },
    {
      text: '今年至今',
      onClick(picker) {
        const end = new Date();
        const start = new Date(new Date().getFullYear(), 0);
        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '最近六个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 6);
        picker.$emit('pick', [start, end]);
      }
    }
  ]
};

function Mousedata(index: number, show: boolean) {
  data.isButtonShowList[index] = show;
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
