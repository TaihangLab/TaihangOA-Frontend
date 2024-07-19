<template>
  <div>
    <div style="margin-top: 10px"></div>
    <el-collapse>
      <el-collapse-item name="1">
        <template #title>
          <span>项目经费</span>
          <span style="font-size: 12px; color: #f56c6c">（单位：万元）</span>
        </template>
        <div style="margin-top: 10px"></div>
        <el-descriptions class="margin-top" :column="4" border>
          <el-descriptions-item label-style="font-weight: 550; text-align: center;" :span="4">
            <template #label> 项目经费总额 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
            <template #label> 专项经费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
            <template #label> 专项设备费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
            <template #label> 专项直接经费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
            <template #label> 专项间接经费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
            <template #label> 自筹经费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
            <template #label> 自筹设备费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
            <template #label> 自筹直接经费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
            <template #label> 自筹间接经费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
          <span>专项经费</span>
          <span style="font-size: 12px; color: #f56c6c">（单位：万元）</span>
        </template>
        <div style="margin-top: 10px"></div>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> (一) {{ '\xa0\xa0' }} 直接费用 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550;" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}设备费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 20%; text-align: center; ">
            <template #label> 购置设备费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 20%; text-align: center; ">
            <template #label> 试制设备费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 20%; text-align: center; ">
            <template #label> 设备升级改造费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 20%; text-align: center; ">
            <template #label> 设备租赁费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}业务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 材料费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 资料费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 数据/样本采集费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 测试化验加工费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 燃料动力费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 办公费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 印刷/出版费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 知识产权事务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 车辆使用费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 差旅费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 会议/会务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 国内协作费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 国际合作交流费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 会议/差旅/国际合作与交流费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 出版/文献/信息传播/知识产权事务费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}劳务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 专家咨询费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 人员劳务费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}材料费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 材料费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}科研活动费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 资料费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 数据/样本采集费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 测试化验加工费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 燃料动力费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 办公费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 印刷/出版费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 知识产权事务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 车辆使用费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}科研服务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 会议/会务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 差旅费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 国内协作费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 国际合作交流费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 专家咨询费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}人员和劳务补助费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 人员劳务费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> (二) {{ '\xa0\xa0' }} 间接费用 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 绩效支出 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 管理费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 房屋租赁费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 日常水、电、暖费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 设备费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 材料费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 资料费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 数据/样本采集费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 测试化验加工费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 燃料动力费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 办公费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 印刷/出版费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 知识产权事务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 车辆使用费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 差旅费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 会议/会务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 专家咨询费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 其他 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template #title>
          <span>自筹经费</span>
          <span style="font-size: 12px; color: #f56c6c">（单位：万元）</span>
        </template>
        <div style="margin-top: 10px"></div>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> (一) {{ '\xa0\xa0' }} 直接费用 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550;" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}设备费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 20%; text-align: center; ">
            <template #label> 购置设备费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 20%; text-align: center; ">
            <template #label> 试制设备费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 20%; text-align: center; ">
            <template #label> 设备升级改造费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 20%; text-align: center; ">
            <template #label> 设备租赁费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}业务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 材料费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 资料费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 数据/样本采集费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 测试化验加工费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 燃料动力费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 办公费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 印刷/出版费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 知识产权事务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 车辆使用费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 差旅费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 会议/会务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 国内协作费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 国际合作交流费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 会议/差旅/国际合作与交流费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 出版/文献/信息传播/知识产权事务费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}劳务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 专家咨询费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 人员劳务费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}材料费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 材料费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}科研活动费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 资料费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 数据/样本采集费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 测试化验加工费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 燃料动力费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 办公费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center; ">
            <template #label> 印刷/出版费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 知识产权事务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 车辆使用费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}科研服务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 会议/会务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 差旅费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 国内协作费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 国际合作交流费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 专家咨询费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> {{ '\xa0\xa0\xa0' }}人员和劳务补助费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 人员劳务费 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
            <template #label> (二) {{ '\xa0\xa0' }} 间接费用 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 绩效支出 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 管理费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 房屋租赁费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 日常水、电、暖费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 设备费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 材料费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 资料费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 数据/样本采集费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 测试化验加工费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 燃料动力费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 办公费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 印刷/出版费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 知识产权事务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 车辆使用费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 差旅费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 会议/会务费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 专家咨询费 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 18%; text-align: center;">
            <template #label> 其他 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template #title>
          <span>经费来源</span>
          <span style="font-size: 12px; color: #f56c6c">（单位：万元）</span>
        </template>
        <div style="margin-top: 10px"></div>
        <!-- 这里放置专项经费的详细信息 -->
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item label-style="font-weight: 550;" :span="3">
            <template #label> {{ '\xa0\xa0' }}(一) {{ '\xa0\xa0' }} 申请从专项经费获得的资助 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="font-weight: 550;" :span="3">
            <template #label> {{ '\xa0\xa0' }}(二) {{ '\xa0\xa0' }} 自筹经费来源 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 15%; text-align: center; width: auto;" content-style="width: 15%">
            <template #label> 其他财政拨款 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 15%; text-align: center; width: auto;" content-style="width: 15%">
            <template #label> 单位自有货币资金 </template>
            {{}}
          </el-descriptions-item>
          <el-descriptions-item label-style="width: 15%; text-align: center; width: auto;" content-style="width: 15%">
            <template #label> 其他资金 </template>
            {{}}
          </el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
    </el-collapse>
    <div style="color: #909399; font-size: 14px; text-align: center">暂无数据</div>
  </div>
</template>
<script setup lang="ts"></script>
