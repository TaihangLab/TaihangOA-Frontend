<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave"></transition>
    <div v-show="showSearch" class="mb-[10px]">
      <el-card shadow="hover">
        <el-form ref="dataFormRef" :model="projectParams" :inline="true" class="demo-form-inline">
          <el-form-item label="项目名称" prop="ProjectName">
            <el-cascader
              v-model="responsibleproject"
              :data="projecttree"
              :options="projecttree"
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
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <div>
        <el-table ref="multipleTable" :data="attachmentslist" border style="width: 100%">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="文件名称" :resizable="false" align="center" :show-overflow-tooltip="true" width="300">
            <template #default="scope">
              {{ truncatedName(scope.row.originalName) }}
            </template>
          </el-table-column>
          <el-table-column :label="'文件格式'" align="center" prop="fileSuffix" :show-overflow-tooltip="true" width="120">
            <template #default="scope">
              <div width="120">
                <el-tag v-if="scope.row.fileSuffix === '.pdf'" type="success">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.docx'" type="warning">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.doc'" type="warning">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.xls'">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.xlsx'">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.ppt'" type="danger">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.pptx'" type="danger">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else type="info">{{ scope.row.fileSuffix }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="上传人" :resizable="false" align="center" prop="createByName" width="120"> </el-table-column>
          <el-table-column label="所属大事记" :resizable="false" align="center" prop="milestoneTitle" width="300"> </el-table-column>
          <el-table-column label="所属项目" :resizable="false" align="center" prop="projectName" width="300"> </el-table-column>
          <el-table-column label="文件上传时间" :resizable="false" align="center" prop="createTime" width="170"> </el-table-column>
          <el-table-column label="操作" :resizable="false" align="center" min-width="100px" fixed="right">
            <template #default="scope">
              <el-button v-hasPermi="['project:oss:download']" type="text" icon="download" @click="handleDownload(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        v-if="total > 0"
        v-model:total="total"
        :page-sizes="[5, 10, 20, 50, 100]"
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
import { projectParams , pageParams } from '@/api/research/ProjectAttachment/types'
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const responsibleproject = ref([]);
const dataFormRef = ref<ElFormInstance>();
const total = ref(0);

const attachmentslist = ref([]);
const showSearch = ref(true);

const projectParams = reactive({
  projectId: undefined
});
const pageParams = reactive({
  pageNum: 1,
  pageSize: 10
});

const projecttree = ref(undefined);

/** 获取附件名称 */
const truncatedName = (originalName: string) => {
  const lastDotIndex = originalName.lastIndexOf('.');
  return lastDotIndex? originalName.substring(0, lastDotIndex) : originalName;
};

/** 查询附件列表 */
const getAttachments = async () => {
  const projectTreereRes = await api.getProjectTree();
  projecttree.value = projectTreereRes.data;
  const allListresRes =await api.getAllList(projectParams,pageParams);
  attachmentslist.value = allListresRes.rows;
  total.value = allListresRes.total;
  console.log(total.value);
};



/** 搜索按钮操作 */
const handleQuery = () => {
  projectParams.projectId = responsibleproject.value[responsibleproject.value.length - 1];
  getAttachments();
};

/** 重置按钮操作 */
const resetQuery = () => {
  responsibleproject.value = [];
  projectParams.projectId = undefined;
  pageParams.pageNum = 1;
  pageParams.pageSize = 10;
  getAttachments();
  
};

// 下载按钮操作
const handleDownload = function (row: any) {
  proxy?.$download.oss(row.ossId);
};

onMounted(() => {
  getAttachments();
});
</script>
