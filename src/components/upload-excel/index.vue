<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button type="primary" :loading="loading" @click="handleUpload">{{
        $t("msg.uploadExcel.upload")
      }}</el-button>
    </div>
    <input
      ref="excelUploadInput"
      type="file"
      class="excel-upload-input"
      accept=".xlsx,.xls"
      @change="handleChange"
    />
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload"></i>
      <span>{{ $t("msg.uploadExcel.drop") }}</span>
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { ref, defineProps } from "vue";
import XLSX from "xlsx";
import { getHeaderRow, isExcel } from "./utils";

const props = defineProps({
  // 上传之前的回调
  beforeUpload: Function,
  // 上传成功的回调
  onSuccess: Function,
});
const loading = ref(false);
const excelUploadInput = ref(null);
const handleUpload = () => {
  excelUploadInput.value.click();
};
const handleChange = (e) => {
  // console.log(e);
  const files = e.target.files;
  const rawFile = files[0];
  console.log(rawFile);
  if (!rawFile) return;
  upload(rawFile);
};
const upload = (rawFile) => {
  excelUploadInput.value.value = null;
  // 没有指定上传前的回调
  if (!props.beforeUpload) {
    readerDate(rawFile);
    return;
  }

  // 指定了上传前的回调，那么只有返回true的时候，才会执行对应的后续操作
  const before = props.beforeUpload(rawFile);
  if (before) {
    readerDate(rawFile);
  }
};

// 数据读取

const readerDate = (rawFile) => {
  loading.value = true;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // 1、获取解析后的数据
      const data = e.target.result;
      // 2、利用XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: "array" });
      // 3、获取第一张表格名称
      const firstSheetName = workbook.SheetNames[0];
      // 4、读取sheet1（第一张表）对数据
      const workSheet = workbook.Sheets[firstSheetName];
      // 5、解析数据表头
      const header = getHeaderRow(workSheet);
      // 6、解析数据表体
      const result = XLSX.utils.sheet_to_json(workSheet);
      // 7、传入解析之后对数据
      // handleTime(result);
      console.log(result);
      generateData({ header, result });
      // 8、处理loading
      loading.value = false;
      // 9、完成回调
      resolve();
    };
    reader.readAsArrayBuffer(rawFile);
  });
};

// 根据导入的内容，生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData);
};
//处理时间戳
const handleTime = (data) => {
  const key = "开通时间";
  data.map((item) => {
    console.log(item[key]);
    item[key] = new Date(item[key]).getTime();
    // formatDate(item[key]);
    // item[key] = new Date(item[key]).getTime().toString();
  });
};
// 拖拽事件
const handleDrop = (e) => {
  // 上传中
  if (loading.value) return;
  const files = e.dataTransfer.files;
  if (files.length !== 1) {
    ElMessage.error("！！！");
    return;
  }
  const rawFile = files[0];
  if (!isExcel(rawFile)) {
    ElMessage.error("???");
    return;
  }
  upload(rawFile);
};
const handleDragover = (e) => {
  e.dataTransfer.dropEffect = "copy";
};
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
