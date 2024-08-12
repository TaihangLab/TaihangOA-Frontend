<template>
  <div>
    <div v-if="props.projectFundForm">
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
              {{ props.projectFundForm.totalFundsAll }}
            </el-descriptions-item>
            <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
              <template #label> 专项经费 </template>
              {{ props.projectFundForm.totalFundsZx }}
            </el-descriptions-item>
            <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
              <template #label> 专项设备费 </template>
              {{ props.projectFundForm.sbfZx }}
            </el-descriptions-item>
            <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
              <template #label> 专项直接经费 </template>
              {{ props.projectFundForm.totalFundsZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
              <template #label> 专项间接经费 </template>
              {{ props.projectFundForm.totalFundsZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
              <template #label> 自筹经费 </template>
              {{ props.projectFundForm.totalFundsZc }}
            </el-descriptions-item>
            <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
              <template #label> 自筹设备费 </template>
              {{ props.projectFundForm.sbfZc }}
            </el-descriptions-item>
            <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
              <template #label> 自筹直接经费 </template>
              {{ props.projectFundForm.totalFundsZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="text-align: center; " :content-style="{ width: '10%' }">
              <template #label> 自筹间接经费 </template>
              {{ props.projectFundForm.totalFundsZcJj }}
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
              {{ props.projectFundForm.totalFundsZxZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550;" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}设备费 </template>
              {{ props.projectFundForm.sbfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 20%; text-align: center; ">
              <template #label> 购置设备费 </template>
              {{ props.projectFundForm.sbfGzsbZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 20%; text-align: center; ">
              <template #label> 试制设备费 </template>
              {{ props.projectFundForm.sbfSzsbZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 20%; text-align: center; ">
              <template #label> 设备升级改造费 </template>
              {{ props.projectFundForm.sbfSbsjgzZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 20%; text-align: center; ">
              <template #label> 设备租赁费 </template>
              {{ props.projectFundForm.sbfSbzlZxZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}业务费 </template>
              {{ props.projectFundForm.ywfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 材料费 </template>
              {{ props.projectFundForm.ywfClfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 资料费 </template>
              {{ props.projectFundForm.ywfZlfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 数据/样本采集费 </template>
              {{ props.projectFundForm.ywfSjybcjfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 测试化验加工费 </template>
              {{ props.projectFundForm.ywfCshyjgfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 燃料动力费 </template>
              {{ props.projectFundForm.ywfRldlfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 办公费 </template>
              {{ props.projectFundForm.ywfBgfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 印刷/出版费 </template>
              {{ props.projectFundForm.ywfYscbfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 知识产权事务费 </template>
              {{ props.projectFundForm.ywfZscqswfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 车辆使用费 </template>
              {{ props.projectFundForm.ywfClsyfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 差旅费 </template>
              {{ props.projectFundForm.ywfChlfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 会议/会务费 </template>
              {{ props.projectFundForm.ywfHyhwfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 国内协作费 </template>
              {{ props.projectFundForm.ywfGnxzfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 国际合作交流费 </template>
              {{ props.projectFundForm.ywfGjhzjlfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 会议/差旅/国际合作与交流费 </template>
              {{ props.projectFundForm.ywfHyclgjhzyjlfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 出版/文献/信息传播/知识产权事务费 </template>
              {{ props.projectFundForm.ywfCbwxxxcbzscqswfZxZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}劳务费 </template>
              {{ props.projectFundForm.lwfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 专家咨询费 </template>
              {{ props.projectFundForm.lwfZjzxfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 人员劳务费 </template>
              {{ props.projectFundForm.lwfRylwfZxZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}材料费 </template>
              {{ props.projectFundForm.clfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 材料费 </template>
              {{ props.projectFundForm.clfClfZxZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}科研活动费 </template>
              {{ props.projectFundForm.kyhdfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 资料费 </template>
              {{ props.projectFundForm.kyhdfZlZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 数据/样本采集费 </template>
              {{ props.projectFundForm.kyhdfSjybcjZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 测试化验加工费 </template>
              {{ props.projectFundForm.kyhdfCshyjgZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 燃料动力费 </template>
              {{ props.projectFundForm.kyhdfRldlZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 办公费 </template>
              {{ props.projectFundForm.kyhdfBgZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 印刷/出版费 </template>
              {{ props.projectFundForm.kyhdfYscbZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 知识产权事务费 </template>
              {{ props.projectFundForm.kyhdfZscqswZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 车辆使用费 </template>
              {{ props.projectFundForm.kyhdfClsyZxZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}科研服务费 </template>
              {{ props.projectFundForm.kyfwfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 会议/会务费 </template>
              {{ props.projectFundForm.kyfwfHyhwZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 差旅费 </template>
              {{ props.projectFundForm.kyfwfClZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 国内协作费 </template>
              {{ props.projectFundForm.kyfwfGnxzZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 国际合作交流费 </template>
              {{ props.projectFundForm.kyfwfGjhzjlZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 专家咨询费 </template>
              {{ props.projectFundForm.kyfwfZjzxZxZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}人员和劳务补助费 </template>
              {{ props.projectFundForm.ryhlwbzfZxZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 人员劳务费 </template>
              {{ props.projectFundForm.ryhlwbzfRylwZxZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> (二) {{ '\xa0\xa0' }} 间接费用 </template>
              {{ props.projectFundForm.totalFundsZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 绩效支出 </template>
              {{ props.projectFundForm.jxzcZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 管理费 </template>
              {{ props.projectFundForm.glfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 房屋租赁费 </template>
              {{ props.projectFundForm.fwzjfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 日常水、电、暖费 </template>
              {{ props.projectFundForm.rcsdnfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 设备费 </template>
              {{ props.projectFundForm.sbfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 材料费 </template>
              {{ props.projectFundForm.clfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 资料费 </template>
              {{ props.projectFundForm.zlfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 数据/样本采集费 </template>
              {{ props.projectFundForm.sjybcjfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 测试化验加工费 </template>
              {{ props.projectFundForm.cshyjgfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 燃料动力费 </template>
              {{ props.projectFundForm.rldlfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 办公费 </template>
              {{ props.projectFundForm.bgfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 印刷/出版费 </template>
              {{ props.projectFundForm.yscbfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 知识产权事务费 </template>
              {{ props.projectFundForm.zscqswfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 车辆使用费 </template>
              {{ props.projectFundForm.clsyfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 差旅费 </template>
              {{ props.projectFundForm.chlfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 会议/会务费 </template>
              {{ props.projectFundForm.hyhwfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 专家咨询费 </template>
              {{ props.projectFundForm.zjzxfZxJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 其他 </template>
              {{ props.projectFundForm.othersZxJj }}
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
              {{ props.projectFundForm.totalFundsZcZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550;" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}设备费 </template>
              {{ props.projectFundForm.sbfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 20%; text-align: center; ">
              <template #label> 购置设备费 </template>
              {{ props.projectFundForm.sbfGzsbZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 20%; text-align: center; ">
              <template #label> 试制设备费 </template>
              {{ props.projectFundForm.sbfSzsbZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 20%; text-align: center; ">
              <template #label> 设备升级改造费 </template>
              {{ props.projectFundForm.sbfSbsjgzZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 20%; text-align: center; ">
              <template #label> 设备租赁费 </template>
              {{ props.projectFundForm.sbfSbzlZcZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}业务费 </template>
              {{ props.projectFundForm.ywfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 材料费 </template>
              {{ props.projectFundForm.ywfClfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 资料费 </template>
              {{ props.projectFundForm.ywfZlfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 数据/样本采集费 </template>
              {{ props.projectFundForm.ywfSjybcjfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 测试化验加工费 </template>
              {{ props.projectFundForm.ywfCshyjgfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 燃料动力费 </template>
              {{ props.projectFundForm.ywfRldlfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 办公费 </template>
              {{ props.projectFundForm.ywfBgfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 印刷/出版费 </template>
              {{ props.projectFundForm.ywfYscbfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 知识产权事务费 </template>
              {{ props.projectFundForm.ywfZscqswfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 车辆使用费 </template>
              {{ props.projectFundForm.ywfClsyfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 差旅费 </template>
              {{ props.projectFundForm.ywfChlfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 会议/会务费 </template>
              {{ props.projectFundForm.ywfHyhwfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 国内协作费 </template>
              {{ props.projectFundForm.ywfGnxzfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 国际合作交流费 </template>
              {{ props.projectFundForm.ywfGjhzjlfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 会议/差旅/国际合作与交流费 </template>
              {{ props.projectFundForm.ywfHyclgjhzyjlfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 出版/文献/信息传播/知识产权事务费 </template>
              {{ props.projectFundForm.ywfCbwxxxcbzscqswfZcZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}劳务费 </template>
              {{ props.projectFundForm.lwfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 专家咨询费 </template>
              {{ props.projectFundForm.lwfZjzxfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 人员劳务费 </template>
              {{ props.projectFundForm.lwfRylwfZcZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}材料费 </template>
              {{ props.projectFundForm.clfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 材料费 </template>
              {{ props.projectFundForm.clfClfZcZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}科研活动费 </template>
              {{ props.projectFundForm.kyhdfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 资料费 </template>
              {{ props.projectFundForm.kyhdfZlZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 数据/样本采集费 </template>
              {{ props.projectFundForm.kyhdfSjybcjZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 测试化验加工费 </template>
              {{ props.projectFundForm.kyhdfCshyjgZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 燃料动力费 </template>
              {{ props.projectFundForm.kyhdfRldlZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 办公费 </template>
              {{ props.projectFundForm.kyhdfBgZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center; ">
              <template #label> 印刷/出版费 </template>
              {{ props.projectFundForm.kyhdfYscbZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 知识产权事务费 </template>
              {{ props.projectFundForm.kyhdfZscqswZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 车辆使用费 </template>
              {{ props.projectFundForm.kyhdfClsyZcZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}科研服务费 </template>
              {{ props.projectFundForm.kyfwfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 会议/会务费 </template>
              {{props.projectFundForm. kyfwfHyhwZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 差旅费 </template>
              {{ props.projectFundForm.kyfwfClZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 国内协作费 </template>
              {{ props.projectFundForm.kyfwfGnxzZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 国际合作交流费 </template>
              {{ props.projectFundForm.kyfwfGjhzjlZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 专家咨询费 </template>
              {{ props.projectFundForm.kyfwfZjzxZcZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> {{ '\xa0\xa0\xa0' }}人员和劳务补助费 </template>
              {{ props.projectFundForm.ryhlwbzfZcZj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 人员劳务费 </template>
              {{ props.projectFundForm.ryhlwbzfRylwZcZj }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item label-style="font-weight: 550; width: 18%;" content-style="width: 72%" :span="3">
              <template #label> (二) {{ '\xa0\xa0' }} 间接费用 </template>
              {{ props.projectFundForm.totalFundsZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 绩效支出 </template>
              {{ props.projectFundForm.jxzcZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 管理费 </template>
              {{ props.projectFundForm.glfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 房屋租赁费 </template>
              {{ props.projectFundForm.fwzjfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 日常水、电、暖费 </template>
              {{ props.projectFundForm.rcsdnfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 设备费 </template>
              {{ props.projectFundForm.sbfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 材料费 </template>
              {{ props.projectFundForm.clfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 资料费 </template>
              {{ props.projectFundForm.zlfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 数据/样本采集费 </template>
              {{ props.projectFundForm.sjybcjfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 测试化验加工费 </template>
              {{ props.projectFundForm.cshyjgfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 燃料动力费 </template>
              {{ props.projectFundForm.rldlfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 办公费 </template>
              {{ props.projectFundForm.bgfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 印刷/出版费 </template>
              {{ props.projectFundForm.yscbfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 知识产权事务费 </template>
              {{ props.projectFundForm.zscqswfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 车辆使用费 </template>
              {{ props.projectFundForm.clsyfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 差旅费 </template>
              {{ props.projectFundForm.chlfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 会议/会务费 </template>
              {{ props.projectFundForm.hyhwfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 专家咨询费 </template>
              {{ props.projectFundForm.zjzxfZcJj }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 18%; text-align: center;">
              <template #label> 其他 </template>
              {{ props.projectFundForm.othersZcJj }}
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
              {{ props.projectFundForm.jflyZx }}
            </el-descriptions-item>
            <el-descriptions-item label-style="font-weight: 550;" :span="3">
              <template #label> {{ '\xa0\xa0' }}(二) {{ '\xa0\xa0' }} 自筹经费来源 </template>
              {{ props.projectFundForm.jflyZc }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 15%; text-align: center; width: auto;" content-style="width: 15%">
              <template #label> 其他财政拨款 </template>
              {{ props.projectFundForm.jflyQtczbkZc }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 15%; text-align: center; width: auto;" content-style="width: 15%">
              <template #label> 单位自有货币资金 </template>
              {{ props.projectFundForm.jflyDwzyhbzjZc }}
            </el-descriptions-item>
            <el-descriptions-item label-style="width: 15%; text-align: center; width: auto;" content-style="width: 15%">
              <template #label> 其他资金 </template>
              {{ props.projectFundForm.jflyQtzjZc }}
            </el-descriptions-item>
          </el-descriptions>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-else class="no-data-message" style="color: #909399; font-size: 14px; text-align: center">暂无数据</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  projectFundForm: Array<{ ProjectFundsV0List }>;
}>();
</script>
