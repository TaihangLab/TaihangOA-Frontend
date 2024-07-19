<template>
  <el-dialog :model-value="visible" width="50%" @update:model-value="updateVisible">
    <div class="sticky-container">
      <el-tabs v-model="activeNames">
        <el-tab-pane label="基本信息" name="first">
          <div style="margin-top: 10px"></div>
          <el-descriptions-item label="基本信息" :span="2"></el-descriptions-item>
          <el-descriptions class="margin-top" title="" :column="2" :label-style="{ width: '25%' }" :content-style="{ width: '25%' }" border>
            <el-descriptions-item label="项目名称">{{}} </el-descriptions-item>
            <el-descriptions-item label="项目任务书编号">{{}} </el-descriptions-item>
            <el-descriptions-item label="负责课题">{{}} </el-descriptions-item>
            <el-descriptions-item label="课题任务书编号">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目牵头单位">{{}}</el-descriptions-item>
            <el-descriptions-item label="是否牵头单位">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目负责人">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目专员/联系人">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目级别">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目来源">{{}}</el-descriptions-item>
            <el-descriptions-item label="立项时间">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目计划验收时间">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目执行时间（年）">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目推进情况">{{}}</el-descriptions-item>
            <el-descriptions-item label="合作单位">{{}}</el-descriptions-item>
            <el-descriptions-item label="涉及专家、团队">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目经费总额">{{}}</el-descriptions-item>
            <el-descriptions-item label="专项经费">{{}}</el-descriptions-item>
            <el-descriptions-item label="自筹经费">{{}}</el-descriptions-item>
          </el-descriptions>
          <el-collapse>
            <el-collapse-item style="font-size: 20px" name="2">
              <template #title>
                <span style="font-size: 14px">项目简介</span>
              </template>
              <div class="unselectable-textbox" style="font-size: 14px; color: #606266"></div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="项目计划" name="second">
          <div style="margin-top: 10px"></div>
          <div>
            <el-descriptions class="margin-top" :column="2" border>
              <el-descriptions-item label-style="width: 15%; text-align: center; width: auto;" content-style="width: 30%">
                <template #label>开始时间</template>
                {{}}
              </el-descriptions-item>
              <el-descriptions-item label-style="width: 15%; text-align: center; width: auto;" content-style="width: 30%">
                <template #label>结束时间</template>
                {{}}
              </el-descriptions-item>
              <el-descriptions-item label-style="width: 15%; text-align: center; width: auto;" :span="3">
                <template #label>任务详情</template>
                {{}}
              </el-descriptions-item>
            </el-descriptions>
            <div style="margin-bottom: 20px">
              <hr style="margin: 20px 0; border: 1px solid #e4e7ed" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目指标" name="third">
          <div style="margin-top: 10px"></div>
          <div>
            <el-descriptions class="margin-top" :column="2" border>
              <el-descriptions-item label-style="width: 20%; text-align: center; width: auto;" content-style="width: 80%" :span="3">
                <template #label>项目指标</template>
                {{}}
              </el-descriptions-item>
              <el-descriptions-item label-style="width: 20%; text-align: center; width: auto;" content-style="width: 80%" :span="3">
                <template #label>中期指标值/状态</template>
                {{}}
              </el-descriptions-item>
              <el-descriptions-item label-style="width: 20%; text-align: center; width: auto;" content-style="width: 80%" :span="3">
                <template #label>完成时指标值/状态</template>
                {{}}
              </el-descriptions-item>
            </el-descriptions>
            <div style="margin-bottom: 20px">
              <hr style="margin: 20px 0; border: 1px solid #e4e7ed" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目成员" name="fourth">
          <div style="margin-top: 10px"></div>
          <el-table style="margin: 0; padding: 0">
            <el-table-column label="用户名称" align="center" prop="nickName" :show-overflow-tooltip="true" />
            <el-table-column label="职称" align="center" prop="jobTitle" :show-overflow-tooltip="true" />
            <el-table-column label="学历" align="center" prop="diploma" :show-overflow-tooltip="true" />
            <el-table-column label="手机号码" align="center" prop="phonenumber" :show-overflow-tooltip="true" />
            <el-table-column label="所属部门" align="center" prop="deptName" :show-overflow-tooltip="true" />
            <el-table-column label="项目角色" align="center" prop="projectUserRole" :show-overflow-tooltip="true" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="项目经费" name="fifth">
          <ProjectFunds></ProjectFunds>
        </el-tab-pane>
        <el-tab-pane label="项目申报附件" name="sixth">
          <div style="margin-top: 10px"></div>
          <el-table style="margin: 0; padding: 0">
            <el-table-column :label="'文件名称'" align="center" prop="originalName" :show-overflow-tooltip="true" />
            <el-table-column :label="'文件格式'" align="center" prop="fileSuffix" :show-overflow-tooltip="true">
              <template #default="scope">
                <div>
                  <el-tag v-if="scope.row.fileSuffix === '.pdf'" type="success" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.docx'" type="warning" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.doc'" type="warning" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.xls'" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.xlsx'" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.ppt'" type="danger" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.pptx'" type="danger" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else type="info" size="small">{{ scope.row.fileSuffix }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="'上传人'" align="center" prop="createBy" :show-overflow-tooltip="true" />
            <el-table-column :label="'上传时间'" align="center" prop="createTime" :show-overflow-tooltip="true" />
            <el-table-column :label="'操作'" align="center">
              <template #default="scope">
                <el-button size="small" type="text" icon="el-icon-download" @click="handleDownload(scope.row)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="项目推进情况" name="seventh">
          <div style="margin-top: 10px"></div>
          <el-collapse>
            <el-collapse-item name="1">
              <template #title>
                <span>项目推进情况</span>
              </template>
              <div style="margin-top: 10px"></div>
              <el-descriptions class="margin-top" title="" :column="2" :label-style="{ width: '20%' }" :content-style="{ width: '30%' }" border>
                <el-descriptions-item label="推进情况" :span="1">{{}} </el-descriptions-item>
                <el-descriptions-item label="" :span="1">{{}} </el-descriptions-item>
                <el-descriptions-item label="完成进度" :span="2">{{}} </el-descriptions-item>
              </el-descriptions>
            </el-collapse-item>

            <el-collapse-item name="2">
              <template #title>
                <span>项目经费情况</span>
                <span style="font-size: 12px; color: #f56c6c">（单位：万元）</span>
              </template>
              <div style="margin-top: 10px"></div>
              <el-descriptions class="margin-top" title="" :column="2" :label-style="{ width: '20%' }" :content-style="{ width: '30%' }" border>
                <el-descriptions-item label="经费总额" :span="2">{{}} </el-descriptions-item>
                <el-descriptions-item label="专项到款总额" :span="1">{{}} </el-descriptions-item>
                <el-descriptions-item label="专项经费总额" :span="1">{{}} </el-descriptions-item>
                <el-descriptions-item label="已完成自筹投资" :span="1">{{}} </el-descriptions-item>
                <el-descriptions-item label="已完成专项投资" :span="1">{{}} </el-descriptions-item>
                <el-descriptions-item label="自筹经费公司配套" :span="1">{{}} </el-descriptions-item>
                <el-descriptions-item label="专项经费公司留存(计划)" :span="1">{{}} </el-descriptions-item>
              </el-descriptions>
            </el-collapse-item>

            <el-collapse-item name="3">
              <template #title>
                <span>项目成果情况</span>
              </template>
              <div style="margin-top: 10px"></div>
              <el-descriptions class="margin-top" title="" :column="2" :label-style="{ width: '20%' }" :content-style="{ width: '30%' }" border>
                <el-descriptions-item label="获奖情况（项）" :span="1">{{}} </el-descriptions-item>
                <el-descriptions-item label="论文情况（项）" :span="1">{{}} </el-descriptions-item>
                <el-descriptions-item label="专利情况" :span="1">{{}} </el-descriptions-item>
                <el-descriptions-item label="软著情况" :span="1">{{}} </el-descriptions-item>
                <el-descriptions-item label="标准情况" :span="1">{{}} </el-descriptions-item>
              </el-descriptions>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';
import ProjectFunds from '@/views/project/components/ProjectDetailDialog/ProjectFunds.vue';

const props = defineProps<{ visible: boolean }>();
const emits = defineEmits(['update:visible']);

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
