<template>
  <div class="home">
    <!-- 标题 -->
    <div id="curtain">
      <el-row justify="center" align="middle" style="height: 50px; background-color:cornflowerblue;">
        <el-col :span="24" >
          <h1 class="centered-title" align="center" style="color:aliceblue">云时代数据中心</h1>
        </el-col>
      </el-row>
    </div>
    <!-- 轮播器 -->
    <el-carousel :interval="4000" type="card" height="300px" style="margin-top: 20px;">
      <el-carousel-item>
        <a href="https://www.baidu.com" target="_blank">
          <img src="../assets/images/主页轮播器1.jpg" alt="Image 1" style="width: 100%;">
        </a>
      </el-carousel-item>
      <el-carousel-item>
        <a href="https://www.jd.com" target="_blank">
          <img src="../assets/images/主页轮播器2.jpg" alt="Image 2" style="width: 100%;">
        </a>
      </el-carousel-item>
      <el-carousel-item>
        <a href="https://www.taobao.com" target="_blank">
          <img src="../assets/images/主页轮播器3.jpg" alt="Image 3" style="width: 100%;">
        </a>
      </el-carousel-item>
    </el-carousel>
    <!-- 公告和成员信息 -->
    <el-row style="margin-top: 20px;" >
      <!-- 公告 -->
      <el-col :span="12">
        <el-card shadow="hover" class="scrollbar-card" style="height: 290px;">
          <p slot="header" align="center" style="color:#333;font-weight: bold">通知公告</p>
          <el-table v-loading="loading" :data="noticeList">
            <el-table-column v-if="false" label="序号" align="center" prop="noticeId" width="100" />
            <el-table-column label="公告标题" align="center" prop="noticeTitle" :show-overflow-tooltip="true" />
            <el-table-column label="公告类型" align="center" prop="noticeType" width="100">
              <template #default="scope">
                <dict-tag :options="sys_notice_type" :value="scope.row.noticeType" />
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" width="100">
              <template #default="scope">
                <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <p slot="header" align="center" style="font-size: 14; color:#333;font-weight: bold">成员信息</p>
          <el-row>
            <!-- 学历分布柱状图 -->
            <el-col :span="12" >
              <div style="height: 200px; width: 100%;" ref="educationChart"></div>
            </el-col>
            <!-- 职称分布柱状图 -->
            <el-col :span="12" style="margin-left: -5px;">
              <div style="height: 200px; width: 100%;" ref="titleChart"></div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 项目统计和知识产权 -->
    <el-row style="margin-top: 20px;">
      <el-col :span="12">
        <el-card shadow="hover">
          <div style="height: 300px;" ref="projectChart"></div>
        </el-card>
        </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div style="height: 300px;" ref="resultChart"></div>
        </el-card>
      </el-col>
    </el-row>
            
  </div>
</template>

<script setup name="Index" lang="ts">
import { listNotice } from '@/api/system/notice';
import { NoticeForm, NoticeQuery, NoticeVO } from '@/api/system/notice/types';
import request from '@/utils/request';
import * as echarts from 'echarts';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_notice_type } = toRefs<any>(proxy?.useDict('sys_notice_type'));
const noticeList = ref<NoticeVO[]>([]);
const loading = ref(true);
const total = ref(0);
const educationData = ref({ categories: [], data: [] });
const jobtitleData = ref({ categories: [], data: [] });
const projectListData = ref(null);
const typeData = ref({ categories: [], data: [] });
const educationChart = ref(null);
const titleChart = ref(null);
const projectChart = ref(null);
const resultChart = ref(null);


const initFormData: NoticeForm = {
  noticeId: undefined,
  noticeTitle: '',
  noticeType: '',
  noticeContent: '',
  status: '0',
  remark: '',
  createByName: ''
};
const data = reactive<PageData<NoticeForm, NoticeQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    noticeTitle: '',
    createByName: '',
    status: '',
    noticeType: ''
  },
  rules: {
    noticeTitle: [{ required: true, message: '公告标题不能为空', trigger: 'blur' }],
    noticeType: [{ required: true, message: '公告类型不能为空', trigger: 'change' }]
  }
});

const { queryParams } = toRefs(data);

/** 获取公告数据 */
const getList = async () => {
  loading.value = true;
  const res = await listNotice(queryParams.value);
  noticeList.value = res.rows.slice(0, 4); // 获取前五条通知
  total.value = res.total;
  loading.value = false;
};
/** 获取学历数据 */
const getDiplomaData = async (callback?: () => void) => {
  try {
    const resp = await request({
      url: '/statistic/user/diploma',
      method: 'get',
      data: {},
    });
    educationData.value = {
      categories: Object.keys(resp),
      data: Object.values(resp),
    };
    if (callback && typeof callback === 'function') {
      callback();
    }
  } catch (error) {
    console.error('Failed to fetch project list data:', error);
  }
};
/** 获取职称数据 */
const getJobtitleData = async (callback?: () => void) => {
  try {
    const resp = await request({
      url: '/statistic/user/jobtitle',
      method: 'get',
      data: {},
    });
    jobtitleData.value = {
      categories: Object.keys(resp),
      data: Object.values(resp),
    };
    if (callback && typeof callback === 'function') {
      callback();
    }
  } catch (error) {
    console.error('Failed to fetch project list data:', error);
  }
};
/** 获取项目统计数据 */
const getProjectListData = async (callback?: () => void) => {
  try {
    const resp = await request({
      url: '/statistic/project/level',
      method: 'get',
      data: {},
    });
    projectListData.value = resp;
    if (callback && typeof callback === 'function') {
      callback();
    }
  } catch (error) {
    console.error('Failed to fetch project list data:', error);
  }
};
/** 获取知识产权数据 */
const getTypeData = async (callback?: () => void) => {
  try {
    const resp = await request({
      url: '/statistic/ip/type',
      method: 'get',
      data: {},
    });
    typeData.value = {
      categories: Object.keys(resp),
      data: Object.values(resp),
    };
    if (callback && typeof callback === 'function') {
      callback();
    }
  } catch (error) {
    console.error('Failed to fetch type data:', error);
  }
};

const initEducationChart = () => {
  // 获取学历图表容器
  const educationChartInstance = echarts.init(educationChart.value);
  // 将数据转换为 ECharts 饼图所需的格式
  const pieData = educationData.value.data.map((count, index) => ({
    value: count,
    name: educationData.value.categories[index],
  }));
  // 配置饼图选项
  const option = {
    backgroundColor: 'rgba(0, 0, 0, 0)', // 设置背景为透明
    title: {
      text: '学历',
      left: 'center',
      textStyle: {
        color: '#333',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} 人 ({d}%)',
    },
    series: [{
      name: '学历数量',
      type: 'pie',
      radius: ['40%', '60%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}: \n{c} 人',
        rotate: 45, // 设置文字旋转角度
        fontSize: 9 // 设置字体大小
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '14',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: true,
        length2: 10,
      },
      data: pieData,
    }],
  };

  // 设置饼图的选项
  educationChartInstance.setOption(option);
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
        educationChartInstance.resize();
      });
};

const initTitleChart = () => {
  // 获取职称图表容器
  const titleChartInstance = echarts.init(titleChart.value);

  // 将数据转换为 ECharts 实心饼图所需的格式
  const pieData = jobtitleData.value.data.map((count, index) => ({
    value: count,
    name: jobtitleData.value.categories[index],
  }));

  // 配置实心饼图选项
  const option = {
    backgroundColor: 'rgba(0, 0, 0, 0)', // 设置背景为透明
    title: {
      text: '职称',
      left: 'center',
      textStyle: {
        color: '#333',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} 人 ({d}%)',
    },
    series: [{
      name: '职称数量',
      type: 'pie',
      radius: '60%',
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}:\n {c} 人',
        rotate: 45, // 设置文字旋转角度
        fontSize: 9 // 设置字体大小
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '14',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: true,
        length2: 10,
      },
      data: pieData,
    }],
  };

  // 设置实心饼图的选项
  titleChartInstance.setOption(option);
};

const initProjectChart = () => {
  // 获取项目列表图表容器
  const projectChartInstance = echarts.init(projectChart.value);
  // 将数据转换为 ECharts 柱状图所需的格式
  const barData = Object.entries(projectListData.value).map(([category, count]) => ({
    value: count,
    name: category,
  }));
  const option = {
    title: {
      text: '项目数量', // 设置标题文本
      left: 'center', // 标题居中显示
      textStyle: {
        color: '#333', // 标题颜色
        fontSize: 16, // 标题字体大小
      },
    },
    xAxis: {
      type: 'category',
      data: Object.keys(projectListData.value), // 使用项目类别作为横坐标数据
      axisLabel: {
        interval: 0,
        rotate: -45, // 将横坐标文字逆时针旋转45度，适应柱状图显示
      },
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} 个',
    },
    series: [{
      type: 'bar',
      data: barData,
      itemStyle: {
        color: "cornflowerblue", // 可以使用 getRandomColor 方法为每个柱设置不同的颜色
      },
    }],
  };
  projectChartInstance.setOption(option);
    // 监听窗口大小变化
  window.addEventListener('resize', () => {
    projectChartInstance.resize();
    });
};

const initResultChart = () => {
  // 获取知识产权图表容器
  const resultChartInstance = echarts.init(resultChart.value);
  // 将数据转换为 ECharts 柱状图所需的格式
  const barData = typeData.value.data.map((count, index) => ({
    value: count,
    name: typeData.value.categories[index],
  }));
  // 配置柱状图选项
  const option = {
    title: {
      text: '知识产权', // 设置标题文本
      left: 'center', // 标题居中显示
      textStyle: {
        color: '#333', // 标题颜色
        fontSize: 16, // 标题字体大小
      },
    },
    xAxis: {
      type: 'category',
      data: typeData.value.categories, // 使用知识产权类别作为横坐标数据
      axisLabel: {
        interval: 0,
        rotate: -45, // 将横坐标文字逆时针旋转45度，适应柱状图显示
      },
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} 个',
    },
    series: [{
      type: 'bar',
      data: barData,
      itemStyle: {
        color: "cornflowerblue", 
      },
    }],
  };
  // 设置柱状图的选项
  resultChartInstance.setOption(option);
  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    resultChartInstance.resize();
      });
};

// 监听窗口的 resize 事件
const handleResize = () => {
  // 重新初始化图表
  initEducationChart();
  initTitleChart();
  initProjectChart();
  initResultChart();
};
// 异步
const fetchData = async () => {
  await Promise.all([getList(), getDiplomaData(), getJobtitleData(), getProjectListData(), getTypeData()]);
  initEducationChart();
  initTitleChart();
  initProjectChart();
  initResultChart();
};

onMounted(() => {
  fetchData();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
