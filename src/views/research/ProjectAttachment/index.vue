<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave"></transition>
    <div v-show="showSearch" class="mb-[10px]">
      <el-card shadow="hover">
        <el-form ref="dataFormRef" :model="queryParams" :inline="true" class="demo-form-inline" style="margin-left: 30px; margin-top: 20px;">

          <el-form-item label="项目名称" prop="ProjectName">
            <el-cascader v-model="responsibleproject" :options="projecttree" clearable :show-all-levels="false"
              placeholder="请选择项目" @keyup.enter.native="handleQuery"></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search"  @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh"  @click="resetQuery">重置</el-button>
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
        <el-table ref="multipleTable" :data="attachmentslist" border style="width: 100%"
          :row-style="{ height: '50px' }" :cell-style="{ padding: '0px' }">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="文件名称" :resizable="false" align="center" :show-overflow-tooltip="true"
            width="300">
            <template #default="scope">
              {{ truncatedName(scope.row.originalName) }}
            </template>
          </el-table-column>
          <el-table-column :label="'文件格式'" align="center" prop="fileSuffix" :show-overflow-tooltip="true"
            width="120">
            <template #default="scope">
              <div width="120">
                <el-tag v-if="scope.row.fileSuffix === '.pdf'" type="success" >{{
                  scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.docx'" type="warning" >{{
                  scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.doc'" type="warning" >{{
                  scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.xls'" >{{ scope.row.fileSuffix
                }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.xlsx'" >{{ scope.row.fileSuffix
                }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.ppt'" type="danger" >{{
                  scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.pptx'" type="danger" >{{
                  scope.row.fileSuffix }}</el-tag>
                <el-tag v-else type="info" >{{ scope.row.fileSuffix }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="上传人" :resizable="false" align="center" prop="createBy" width="120">
          </el-table-column>
          <el-table-column label="所属大事记" :resizable="false" align="center" prop="milestoneTitle" width="300">
          </el-table-column>
          <el-table-column label="文件上传时间" :resizable="false" align="center" prop="createTime" width="170">
          </el-table-column>
          <el-table-column :label="'操作'" :resizable="false" align="center" min-width="100px" fixed="right">
            <template #default="scope">
              <el-button  type="text" icon="el-icon-download" @click="handleDownload(scope.row)" v-hasPermi="['project:oss:download']">下载</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <el-pagination :current-page="queryParam.pageNum" :page-size="queryParam.pageSize"
        :page-sizes="[5, 10, 20, 50, 100]" :total="total" layout="total ,sizes,prev,pager,next,jumper"
        style="margin-top: 30px" @size-change="sizeChangeHandle" @current-change="CurrentChangeHandle">
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import request from '@/utils/request';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const responsibleproject = ref([]);
const dataFormRef = ref<ElFormInstance>();
const total = ref(0);

const attachmentslist = ref([]);
const showSearch = ref(true);
const queryParams = reactive({
  projectId: undefined,
});
const queryParam = reactive({
  pageNum: 1,
  pageSize: 10,
});
const header = reactive({});
const projecttree = ref(undefined);


/** 获取附件名称 */
const truncatedName = (originalName: string) => {
  const lastDotIndex = originalName.lastIndexOf('.');
  return lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
};

/** 查询附件列表 */
const getAttachmentsList = async () => {
  await checkattachments();
  await getProjectTree();
};

/** 获取数据*/
const fetchData = () => {
  getAttachmentsList();
};

//获取全部附件列表
const checkattachments = async () => {
  try {
    const resp = await request({
      url: '/milestone/oss/getAllList',
      method: 'post',
      data: queryParams,
      params: queryParam,
    });
    attachmentslist.value = resp.rows;
    total.value = resp.total;

  } catch (error) {
    console.error('获取附件列表时出错：', error);
  }
};
//获取项目树
const getProjectTree = async () => {
  try {
    const resp = await request({
      url: '/ip/getProjectTree',
      method: 'get',
      params: header,
    });
    projecttree.value = resp.data;
    console.log(attachmentslist )
  console.log(proxy)
  

  } catch (error) {
    console.error('获取项目树时出错：', error);
  }
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.projectId = responsibleproject.value[responsibleproject.value.length - 1];
  getAttachmentsList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  responsibleproject.value = [];
  queryParams.projectId = undefined;
  queryParam.pageNum = 1;
  queryParam.pageSize = 10;
  checkattachments();
};

/** 每页显示多少条 */
const sizeChangeHandle = (val: number) => {
  queryParam.pageSize = val;
  fetchData();
};

/** 改变页数 */
const CurrentChangeHandle = (val: number) => {
  queryParam.pageNum = val;
  fetchData();
};

// 下载按钮操作
const handleDownload = function(row: any) {
  proxy?.$download.oss(row.ossId);
};

onMounted(() => {
  getAttachmentsList();
});
</script>

<style>
.box-card {
  width: 100%;
  margin-bottom: 20px;
}
</style>
