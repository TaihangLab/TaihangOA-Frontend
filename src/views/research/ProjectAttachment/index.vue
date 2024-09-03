<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave"></transition>
    <div v-show="showSearchRef" class="mb-[10px]">
      <el-card shadow="hover">
        <el-form ref="dataFormRef" :model="projectParams" :inline="true" class="demo-form-inline">
          <el-form-item label="项目名称" prop="ProjectName">
            <el-cascader
              v-model="ProjectIdRef"
              :data="projectTreeRef"
              :options="projectTreeRef"
              clearable
              :show-all-levels="false"
              placeholder="请选择项目"
              @keyup.enter="handleQuery"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <el-card shadow="hover">
      <template #header>
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button disabled type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearchRef" @query-table="resetQuery"></right-toolbar>
        </el-row>
      </template>

      <div>
        <el-table ref="multipleTable" :data="attachmentsListRef" border style="width: 100%">
          <el-table-column type="selection" width="50" />
          <el-table-column label="文件名称" :resizable="false" :show-overflow-tooltip="true" width="300">
            <template #default="scope">
              {{ truncatedName(scope.row.originalName) }}
            </template>
          </el-table-column>
          <el-table-column :label="'文件格式'" prop="fileSuffix" :show-overflow-tooltip="true" width="120">
            <template #default="scope">
              <div width="120">
                <el-tag v-if="scope.row.fileSuffix === '.pdf'" type="danger">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.docx'" type="warning">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.doc'" type="warning">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.xls'" type="success">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.xlsx'" type="success">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.ppt'" type="danger">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.pptx'" type="danger">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else type="info">{{ scope.row.fileSuffix }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="上传人" :resizable="false" prop="createByName" width="120"> </el-table-column>
          <el-table-column label="所属大事记" :resizable="false" prop="milestoneTitle" width="300"> </el-table-column>
          <el-table-column label="所属项目" :resizable="false" prop="assignedSubjectName" width="300"> </el-table-column>
          <el-table-column label="文件上传时间" :resizable="false" prop="createTime" width="170"> </el-table-column>
          <el-table-column label="操作" :resizable="false" min-width="100px" fixed="right">
            <template #default="scope">
              <el-tooltip content="下载" placement="top">
                <el-button v-hasPermi="['project:oss:download']" type="text" icon="download" @click="handleDownload(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        v-if="totalRef > 0"
        v-model:total="totalRef"
        v-model:page="pageParams.pageNum"
        v-model:limit="pageParams.pageSize"
        @pagination="getAttachments()"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import api from '@/api/research/ProjectAttachment';
import { projectParams } from '@/api/research/ProjectAttachment/types';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const ProjectIdRef = ref([]);
const dataFormRef = ref<ElFormInstance>();
const totalRef = ref(0);
const attachmentsListRef = ref([]);
const showSearchRef = ref(true);
const projectTreeRef = ref(undefined);

const data = reactive({
  projectParams: { projectId: undefined },
  pageParams: {
    pageNum: 1,
    pageSize: 10
  }
});

const { projectParams, pageParams } = toRefs(data);

/** 获取附件名称 */
const truncatedName = (originalName: string) => {
  const lastDotIndex = originalName.lastIndexOf('.');
  return lastDotIndex ? originalName.substring(0, lastDotIndex) : originalName;
};

/** 查询附件树 */
const getTree = async () => {
  const projectTreeRes = await api.getProjectTree();
  projectTreeRef.value = projectTreeRes.data;
};

/** 查询附件信息 */
const getAttachments = async () => {
  const allListRes = await api.getAllList(data.projectParams, data.pageParams);
  attachmentsListRef.value = allListRes.rows;
  totalRef.value = allListRes.total;
};

/** 搜索按钮操作 */
const handleQuery = () => {
  data.projectParams.projectId = ProjectIdRef.value[ProjectIdRef.value.length - 1];
  getAttachments();
};

/** 重置按钮操作 */
const resetQuery = () => {
  ProjectIdRef.value = [];
  data.projectParams.projectId = undefined;
  data.pageParams.pageNum = 1;
  data.pageParams.pageSize = 10;
  getAttachments();
};

const handleExport = () => {
  console.log('导出');
};

// 下载按钮操作
const handleDownload = function (row: any) {
  proxy?.$download.oss(row.ossId);
};

onMounted(() => {
  getTree();
  getAttachments();
});
</script>
