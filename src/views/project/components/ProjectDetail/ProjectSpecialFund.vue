<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="card-header-content"><i class="el-icon-caret-right"></i> 直接经费（万元） <i class="el-icon-caret-left"></i></div>
      </template>
      <el-card
        v-for="(card1, index1) in $props.cards1"
        :key="index1"
        shadow="hover"
        class="custom-card"
        @mouseover="setButtonShowList1(index1, true)"
        @mouseleave="setButtonShowList1(index1, false)"
      >
        <template #header>
          <div class="header-container">
            <el-button
              v-show="data.isButtonShowList1[index1]"
              class="remove3-button"
              icon="CirclePlus"
              circle
              type="success"
              plain
              @click="addCard()"
            ></el-button>
            <el-select v-model="card1.value" class="select-container" placeholder="请选择一级目录" size="default">
              <el-option v-for="option in categoryOptions1" :key="option.value" :label="option.label" :value="option.value"></el-option>
            </el-select>
            <el-input v-model="card1.content" class="custom-input" type="number" size="default"></el-input>
            <el-button v-show="data.isButtonShowList1[index1]" icon="Remove" circle type="danger" plain @click="removeCard(index1)"></el-button>
            <el-button v-show="data.isButtonShowList1[index1]" icon="CirclePlus" circle type="success" plain @click="addCard2(index1)"></el-button>
          </div>
        </template>
        <div v-if="card1.value && filteredSecondOptions(index1)" class="card-container">
          <el-card
            v-for="(card2, index2) in cards2[index1]"
            :key="index2"
            shadow="hover"
            style="width: 25%"
            @mouseover="setButtonShowList2(index1, index2, true)"
            @mouseleave="setButtonShowList2(index1, index2, false)"
          >
            <template #header>
              <div class="header-container content-container">
                <el-button
                  v-show="data.isButtonShowList2[index1][index2]"
                  class="remove-button"
                  icon="Remove"
                  circle
                  type="danger"
                  plain
                  @click="removeCard2(index1, index2)"
                ></el-button>
                <el-select v-model="card2.value" class="select-container" placeholder="请选择二级目录" size="small">
                  <el-option
                    v-for="option in filteredSecondOptions(index1)"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
                <el-input v-model="card2.content" class="custom-input" type="number" size="small"></el-input>
                <el-button
                  v-show="data.isButtonShowList2[index1][index2]"
                  icon="CirclePlus"
                  circle
                  type="success"
                  plain
                  @click="addRow(index1, index2)"
                ></el-button>
              </div>
            </template>
            <el-table
              v-if="isTableDataNotEmpty(index1, index2) || data.isTableVisible[index1][index2]"
              :data="tableData[index1] && tableData[index1][index2]"
              style="width: 100%"
            >
              <el-table-column label="三级标签" align="center" :width="150">
                <template #default="scope">
                  <el-select v-model="scope.row.value" placeholder="请选择三级级目录" size="small">
                    <el-option
                      v-for="category in filteredThirdOptions(index1, index2)"
                      :key="category.value"
                      :label="category.label"
                      :value="category.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="涉及金额" align="center" :width="140">
                <template #default="scope">
                  <el-input v-model="scope.row.content" type="number" size="small" style="width: 100%"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template #default="scope">
                  <el-button type="danger" icon="Remove" circle plain @click="removeRow(index1, index2, scope.$index)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-card>
    </el-card>
    <el-card style="margin-top: 4px" shadow="hover">
      <template #header>
        <div class="card-header-content"><i class="el-icon-caret-right"></i> 间接经费（万元） <i class="el-icon-caret-left"></i></div>
      </template>
      <div class="card-container">
        <el-card
          v-for="(card, index) in cards3"
          :key="index"
          shadow="hover"
          style="width: 25%; height: 50px"
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
            <el-select v-model="card.value" class="select-container" placeholder="请选择经费条目" size="small">
              <el-option v-for="option in categoryOptions4" :key="option.value" :label="option.label" :value="option.value"></el-option>
            </el-select>
            <el-input v-model="card.content" class="custom-input" placeholder="请输入金额" type="number" size="small"></el-input>
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
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, reactive, computed, onMounted, onBeforeMount } from 'vue';
import categoryOptions1, { categoryOptions4 } from '@/api/project/funds/fundkeys';

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
  categoryOptions1: categoryOptions1,
  categoryOptions4: categoryOptions4,
  isButtonShowList1: [] as boolean[],
  isButtonShowList2: [] as boolean[][],
  isButtonShowList3: [] as boolean[]
});

function setButtonShowList1(index1: number, show: boolean) {
  data.isButtonShowList1[index1] = show;
}

function setButtonShowList2(index1: number, index2: number, show: boolean) {
  data.isButtonShowList2[index1][index2] = show;
}

function setButtonShowList3(index3: number, show: boolean) {
  data.isButtonShowList3[index3] = show;
}

function filteredSecondOptions(index1: number) {
  const selectedFirstValue = props.cards1[index1]?.value;
  const firstOption = data.categoryOptions1.find((option) => option.value === selectedFirstValue);
  return firstOption ? firstOption.children || [] : [];
}

const filteredThirdOptions = computed(() => (index1: number, index2: number) => {
  const selectedFirstValue = props.cards1[index1].value;
  const firstOption = data.categoryOptions1.find((option) => option.value === selectedFirstValue);
  if (firstOption) {
    const selectedSecondValue = props.cards2[index1][index2].value;
    const secondOption = firstOption.children?.find((option) => option.value === selectedSecondValue);
    return secondOption ? secondOption.children || [] : [];
  }
  return [];
});

onMounted(() => {
  initializeStates();
});

const initializeStates = () => {
  data.isButtonShowList1 = props.cards1 ? new Array(props.cards1.length).fill(false) : [];
  if (props.cards2) {
    data.isButtonShowList2 = props.cards2.map((card2List) => new Array(card2List.length).fill(false));
    data.isTableVisible = props.cards2.map((card2List) => card2List.map(() => false));
  } else {
    data.isButtonShowList2 = [];
    data.isTableVisible = [[]];
  }
  data.isButtonShowList3 = props.cards3 ? new Array(props.cards3.length).fill(false) : [];
};

const isTableDataNotEmpty = (index1: number, index2: number) => {
  return props.tableData[index1] && props.tableData[index1][index2] && props.tableData[index1][index2].length > 0;
};

const addCard = () => {
  const newCard1 = { value: '', content: '' };
  const newCard2: { value: string; content: string }[] = [];
  props.cards1.push(newCard1);
  props.cards2.push(newCard2);
  props.tableData.push([]);
  data.isTableVisible.push([]);
};

const addCard2 = (index1: number) => {
  data.isTableVisible[index1].push(false);
  props.cards2[index1].push({ value: '', content: '' });
  props.tableData[index1].push([]);
};

const removeCard = (index1: number) => {
  if (props.cards1.length > 1) {
    props.cards1.splice(index1, 1);
    props.cards2.splice(index1, 1);
    props.tableData.splice(index1, 1);
    data.isTableVisible.splice(index1, 1);
  } else {
    console.warn('Cannot delete the last item in cards1');
  }
};

const removeCard2 = (index1: number, index2: number) => {
  props.cards2[index1].splice(index2, 1);
  props.tableData[index1].splice(index2, 1);
  data.isTableVisible[index1].splice(index2, 1);
};

const addRow = (index1: number, index2: number) => {
  if (!props.tableData[index1] || !data.isTableVisible[index1]) {
    props.tableData[index1] = [];
    data.isTableVisible[index1] = [];
  }
  if (!props.tableData[index1][index2]) {
    props.tableData[index1][index2] = [];
  }
  props.tableData[index1][index2].push({ value: '' });
  data.isTableVisible[index1][index2] = true; // 确保可见性为true
  console.log('index2', index2);
  console.log('this.tableData[index1][index2]', props.tableData[index1][index2]);
};

const removeRow = (index1: number, index2: number, rowIndex: number) => {
  props.tableData[index1][index2].splice(rowIndex, 1);
  if (props.tableData[index1][index2].length === 0) {
    data.isTableVisible[index1][index2] = false;
  }
  console.log('this.cards1', props.cards1);
  console.log('this.cards2', props.cards2);
  console.log('this.tableData', props.tableData);
};

const addIndirectCost = () => {
  props.cards3.push({ content: '', value: '' });
};

const removeIndirectCost = (index: number) => {
  if (props.cards3.length > 1) {
    props.cards3.splice(index, 1);
  } else {
    console.warn('Cannot delete the last item in cards3');
  }
};

const reset = () => {
  props.cards1.length = 0;
  props.cards2.length = 0;
  props.tableData.length = 0;
  props.cards3.length = 0;
  addCard();
  addIndirectCost();
};

onBeforeMount(() => {
  if (props.cards1.length === 0) {
    addCard();
    addIndirectCost();
  }
});

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
  margin-right: 10px;
}
.el-button {
  border: none;
  padding: 0;
  font-size: 2rem;
}
.select-container {
  margin-right: 10px;
  width: 180px;
}
.custom-input {
  width: 120px; /* 设置合适的宽度值 */
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
  color: #fb6113; /* 字体颜色为蓝色 */
  font-size: 15px; /* 增大字体大小 */
}
</style>
