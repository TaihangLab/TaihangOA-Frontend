<template>
  <el-row>
    <el-col :span="16">
      <el-card shadow="never">
        <template #header>
          <div class="card-header-content"><i class="el-icon-caret-right"></i> 直接经费（万元） <i class="el-icon-caret-left"></i></div>
        </template>
        <el-card v-for="(card1, index1) in $props.cards1" :key="index1" shadow="never" class="custom-card">
          <template #header>
            <div class="header-container">
              <!-- 左侧按钮 -->
              <div class="left-buttons">
                <el-tooltip class="box-item" effect="dark" content="新增一级目录" placement="top">
                  <el-button class="remove3-button" icon="FolderAdd" plain @click="addCard()"></el-button>
                </el-tooltip>
                <el-tooltip class="box-item" effect="dark" content="删除一级目录" placement="top">
                  <el-button v-show="true" class="remove4-button" icon="FolderDelete" plain @click="removeCard(index1)"></el-button>
                </el-tooltip>
              </div>

              <!-- 中间选择框和输入框 -->
              <div class="center-inputs">
                <el-select v-model="card1.value" class="select-container" clearable placeholder="请选择一级目录" size="default">
                  <el-option v-for="option in categoryOptions2" :key="option.value" :label="option.label" :value="option.value"></el-option>
                </el-select>
                <el-input v-model="card1.content" class="custom-input" clearable placeholder="请输入金额" size="default"></el-input>
              </div>

              <!-- 右侧按钮 -->
              <div class="right-buttons">
                <el-tooltip class="box-item" effect="dark" content="新增二级目录" placement="top">
                  <el-button v-show="true" class="remove5-button" icon="CirclePlus" circle type="success" plain @click="addCard2(index1)"></el-button>
                </el-tooltip>
                <el-tooltip class="box-item" effect="dark" content="删除二级目录" placement="top">
                  <el-button v-show="true" class="remove-button" icon="Remove" circle type="danger" plain @click="removeCard2(index1)"></el-button>
                </el-tooltip>
              </div>
            </div>
          </template>
          <div v-if="card1.value && filteredSecondOptions(index1)" class="card-container">
            <el-card
              v-for="(card2, index2) in cards2[index1]"
              :key="index2"
              shadow="always"
              style="width: 50%"
              @mouseover="setButtonShowList2(index1, index2, true)"
              @mouseleave="setButtonShowList2(index1, index2, true)"
            >
              <template #header>
                <div class="header-container content-container">
                  <el-select v-model="card2.value" class="select-container" clearable placeholder="请选择二级目录" size="default">
                    <el-option
                      v-for="option in filteredSecondOptions(index1)"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    ></el-option>
                  </el-select>
                  <el-input v-model="card2.content" class="custom-input" clearable placeholder="请输入金额" size="default"></el-input>
                </div>
              </template>
              <el-table v-if="isTableDataNotEmpty(index1, index2)" :data="tableData[index1] && tableData[index1][index2]" style="width: 100%">
                <el-table-column label="三级标签" align="center" :width="150">
                  <template #default="scope">
                    <el-select v-model="scope.row.value" clearable placeholder="请选择三级级目录" size="small">
                      <el-option
                        v-for="category in filteredThirdOptions(index1, index2)"
                        :key="category.value"
                        :label="category.label"
                        :value="category.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="涉及金额" align="center" :width="120">
                  <template #default="scope">
                    <el-input v-model="scope.row.content" clearable placeholder="请输入金额" size="small" style="width: 100%"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template #default="scope">
                    <el-tooltip class="box-item" effect="dark" content="增加三级目录" placement="top">
                      <el-button v-show="true" icon="CirclePlus" circle type="success" plain @click="addRow(index1, index2)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="box-item" effect="dark" content="删除三级目录" placement="top">
                      <el-button
                        v-show="scope.$index !== 0"
                        type="danger"
                        icon="Remove"
                        circle
                        plain
                        @click="removeRow(index1, index2, scope.$index)"
                      ></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
        </el-card>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        <template #header>
          <div class="card-header-content"><i class="el-icon-caret-right"></i> 间接经费（万元） <i class="el-icon-caret-left"></i></div>
        </template>
        <div class="card-container">
          <el-card
            v-for="(card, index) in cards3"
            :key="index"
            shadow="hover"
            class="custom-card"
            @mouseover="setButtonShowList3(index, true)"
            @mouseleave="setButtonShowList3(index, false)"
          >
            <div class="header-container content-container" style="margin-top: -8px">
              <el-button
                v-show="data.isButtonShowList3[index]"
                class="remove1-button"
                icon="Remove"
                circle
                type="danger"
                plain
                @click="removeIndirectCost(index)"
              ></el-button>
              <el-select v-model="card.value" class="select-container" placeholder="请选择经费条目" size="default">
                <el-option v-for="option in categoryOptions5" :key="option.value" :label="option.label" :value="option.value"></el-option>
              </el-select>
              <el-input v-model="card.content" class="custom-input" placeholder="请输入金额" size="default" clearable></el-input>
              <el-button
                v-show="data.isButtonShowList3[index]"
                class="remove2-button"
                icon="circlePlus"
                circle
                type="success"
                plain
                @click="addIndirectCost"
              ></el-button>
            </div>
          </el-card>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, reactive, computed, onMounted, onBeforeMount, ref } from 'vue';
import { categoryOptions2, categoryOptions5 } from '@/api/project/funds/fundkeys';
import { ElMessage } from 'element-plus';

const emits = defineEmits(['update:visible']);
const props = defineProps<{
  cards1: Array<{ value: string; content: string }>;
  cards2: Array<Array<{ value: string; content: string }>>;
  tableData: Array<Array<Array<{ value: string }>>>;
  cards3: Array<{ value: string; content: string }>;
  visible: boolean;
}>();

const data = reactive({
  isTableVisible: [[]] as boolean[][],
  categoryOptions2: categoryOptions2,
  categoryOptions5: categoryOptions5,
  isButtonShowList1: [] as boolean[],
  isButtonShowList2: [] as boolean[][],
  isButtonShowList3: [] as boolean[]
});

function setButtonShowList2(index1: number, index2: number, show: boolean) {
  index2 = props.tableData[index1].length - 1;
  data.isButtonShowList2[index1][index2] = show;
}

function setButtonShowList3(index3: number, show: boolean) {
  data.isButtonShowList3[index3] = show;
}

const filteredSecondOptions = computed(() => (index1: number) => {
  const selectedFirstValue = props.cards1[index1]?.value;
  const firstOption = data.categoryOptions2.find((option) => option.value === selectedFirstValue);
  return firstOption ? firstOption.children || [] : [];
});

const filteredThirdOptions = computed(() => (index1: number, index2: number) => {
  const selectedFirstValue = props.cards1[index1].value;
  const firstOption = data.categoryOptions2.find((option) => option.value === selectedFirstValue);
  if (firstOption) {
    const children = firstOption.children as Array<{ value: string; label: string; children?: Array<{ value: string; label: string }> }>;

    const selectedSecondValue = props.cards2[index1][index2].value;
    const secondOption = children?.find((option) => option.value === selectedSecondValue);
    return secondOption ? secondOption.children || [] : [];
  }
  return [];
});

onMounted(() => {
  initializeStates();
});

onBeforeMount(() => {
  if (props.cards1.length === 0) {
    addCard();
    addIndirectCost();
  }
  console.log(props.cards1.length);
});

const initializeStates = () => {
  data.isButtonShowList1 = props.cards1 ? new Array(props.cards1.length).fill(false) : [];
  if (props.cards2) {
    data.isButtonShowList2 = props.cards2.map((card2List) => new Array(card2List.length).fill(true));
    // data.isTableVisible = props.cards2.map((card2List) => card2List.map(() => false));
    data.isTableVisible = props.cards2.map((card2List) => new Array(card2List.length).fill(true));
  } else {
    data.isButtonShowList2 = [];
    data.isTableVisible = [[]];
  }
  if (props.cards3.length === 0) {
    // eslint-disable-next-line vue/no-mutating-props
    props.cards3.push({ value: '', content: '' });
  }
  data.isButtonShowList3 = props.cards3 ? new Array(props.cards3.length).fill(false) : [];
};

const isTableDataNotEmpty = (index1: number, index2: number) => {
  return props.tableData[index1] && props.tableData[index1][index2] && props.tableData[index1][index2].length > 0;
};

const addCard = () => {
  const newCard1 = { value: '', content: '' };
  const newCard2: { value: string; content: string }[] = [];
  // eslint-disable-next-line vue/no-mutating-props
  props.cards1.push(newCard1);
  // eslint-disable-next-line vue/no-mutating-props
  props.cards2.push(newCard2);
  // eslint-disable-next-line vue/no-mutating-props
  props.tableData.push([]);
  data.isTableVisible.push([]);
};

const addCard2 = (index1: number) => {
  // 判断一级目录是否选择
  if (!props.cards1[index1].value) {
    ElMessage.warning('请选择一级目录');
    return;
  }
  if (typeof data.isTableVisible[index1] !== 'undefined') {
    data.isTableVisible[index1].push(true);
  }
  // eslint-disable-next-line vue/no-mutating-props
  props.cards2[index1].push({ value: '', content: '' });
  // eslint-disable-next-line vue/no-mutating-props
  if (props.tableData[index1][0]?.value === '') props.tableData[index1].splice(0, 1);
  // eslint-disable-next-line vue/no-mutating-props
  props.tableData[index1].push([]);
  let size = props.tableData[index1].length;
  addRow(index1, size - 1);
};

const removeCard = (index1: number) => {
  if (props.cards1.length > 1) {
    // eslint-disable-next-line vue/no-mutating-props
    props.cards1.splice(index1, 1);
    // eslint-disable-next-line vue/no-mutating-props
    props.cards2.splice(index1, 1);
    // eslint-disable-next-line vue/no-mutating-props
    props.tableData.splice(index1, 1);
    data.isTableVisible.splice(index1, 1);
  } else {
    console.warn('Cannot delete the last item in cards1');
  }
};

const removeCard2 = (index1: number) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.cards2[index1].pop();
  // eslint-disable-next-line vue/no-mutating-props
  props.tableData[index1].pop();
  data.isTableVisible[index1].pop();
};

const addRow = (index1: number, index2: number) => {
  // if (!props.tableData[index1] || !data.isTableVisible[index1]) {
  //   // eslint-disable-next-line vue/no-mutating-props
  //   props.tableData[index1] = [];
  //   data.isTableVisible[index1] = [];
  // }
  if (!props.tableData[index1][index2]) {
    // eslint-disable-next-line vue/no-mutating-props
    props.tableData[index1][index2] = [];
  }
  // eslint-disable-next-line vue/no-mutating-props
  props.tableData[index1][index2].push({ value: '' });
  data.isTableVisible[index1][index2] = true; // 确保可见性为true
};

const removeRow = (index1: number, index2: number, rowIndex: number) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.tableData[index1][index2].splice(rowIndex, 1);
  if (props.tableData[index1][index2].length === 0) {
    data.isTableVisible[index1][index2] = false;
  }
};

const addIndirectCost = () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.cards3.push({ value: '', content: '' });
};

const removeIndirectCost = (index: number) => {
  if (props.cards3.length > 1) {
    // eslint-disable-next-line vue/no-mutating-props
    props.cards3.splice(index, 1);
  } else {
    console.warn('Cannot delete the last item in cards3');
  }
};

const reset = () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.cards1.length = 0;
  // eslint-disable-next-line vue/no-mutating-props
  props.cards2.length = 0;
  // eslint-disable-next-line vue/no-mutating-props
  props.tableData.length = 0;
  // eslint-disable-next-line vue/no-mutating-props
  props.cards3.length = 0;
  addCard();
  addIndirectCost();
};
defineExpose({ reset });

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

const closeDialog = () => {
  emits('update:visible', false);
};

const confirmDialog = () => {
  // 处理确定逻辑
  emits('update:visible', false);
};

let activeNames = 'first';
watch(
  () => props.visible,
  (newValue, oldValue) => {
    activeNames = 'first';
  }
);

watch(
  () => props.cards2,
  (newVal) => {
    if (props.cards1.length === 0) {
      addCard();
    }
    initializeStates();
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.remove-button {
  margin-right: 10px;
}
.remove1-button {
  margin-left: -10px;
  margin-right: 10px;
}
.remove2-button {
  margin-right: -10px;
}
.remove3-button {
  color: blue;
}
.remove4-button {
  color: red;
}
.remove5-button {
  right: 5px;
}
.el-button {
  border: none;
  padding: 0;
  font-size: 2rem;
}
.select-container {
  margin-right: 10px;
  width: 200px;
}
.custom-input {
  width: 150px; /* 设置合适的宽度值 */
  margin-right: 10px;
}
.custom-divider {
  background-color: #c9c9c9; /* 设置线条颜色为红色 */
}
.custom-card {
  border-color: #c9c9c9;
  margin-top: 2px;
}
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 分配左右两侧的空间 */
  padding: 0 20px; /* 添加左右内边距 */
}
.left-buttons,
.right-buttons {
  display: flex;
  align-items: center;
  gap: 10px; /* 按钮之间的间距 */
}
.center-inputs {
  display: flex;
  align-items: center;
  gap: 10px; /* 选择框和输入框之间的间距 */
  flex-grow: 1; /* 使中间部分占满可用空间 */
  justify-content: center; /* 居中对齐 */
}
.content-container {
  justify-content: center; /* 将内容水平居中对齐 */
}
.card-container {
  display: flex;
  flex-wrap: wrap;
}
.card-header-content {
  text-align: center; /* 文本居中 */
  color: rgba(0, 0, 0, 0.8); /* 字体颜色为黑色 */
  font-size: 15px; /* 字体大小 */
  font-weight: bold; /* 字体加粗 */
  font-family: 'Microsoft YaHei', sans-serif; /* 字体设置为微软雅黑 */
}
</style>
