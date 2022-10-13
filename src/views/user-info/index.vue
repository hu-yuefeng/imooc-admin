<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" :loading="printLoading" v-print="printObj">{{
        $t("msg.userInfo.print")
      }}</el-button>
    </el-card>
    <el-card>
      <div class="user-info-box" id="userInfoBox">
        <!-- 标题 -->
        <h2 class="title">
          {{ $t("msg.userInfo.title") }}
        </h2>
        <!-- 头部 -->
        <div class="header">
          <el-descriptions :column="2" border>
            <el-descriptions-item
              :label="$t('msg.userInfo.name')"
              label-align="left"
              align="left"
              >{{ detailDate.username }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('msg.userInfo.sex')"
              label-align="left"
              align="left"
              >{{ detailDate.gender }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('msg.userInfo.nation')"
              label-align="left"
              align="left"
              >{{ detailDate.nationality }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('msg.userInfo.mobile')"
              label-align="left"
              align="left"
              >{{ detailDate.mobile }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('msg.userInfo.province')"
              label-align="left"
              align="left"
              >{{ detailDate.province }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('msg.userInfo.date')"
              label-align="left"
              align="left"
              >{{
                $filters.dateFilter(detailDate.openTime)
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('msg.userInfo.remark')"
              :span="2"
              label-align="left"
              align="left"
            >
              <el-tag
                v-for="(item, index) in detailDate.remark"
                class="remark"
                :key="index"
                >{{ item }}</el-tag
              ></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('msg.userInfo.address')"
              :span="2"
              label-align="left"
              align="left"
              >{{ detailDate.address }}</el-descriptions-item
            >
          </el-descriptions>
          <el-image class="avatar" :src="detailDate.avatar"></el-image>
        </div>
        <!-- 内容 -->

        <el-descriptions class="body" direction="vertical" :column="1" border>
          <el-descriptions-item :label="$t('msg.userInfo.experience')"
            ><ul>
              <li
                class="experience"
                v-for="(item, index) in detailDate.experience"
                :key="index"
              >
                <span>
                  {{ $filters.dateFilter(item.startTime) }}
                  ----
                  {{ $filters.dateFilter(item.endTime) }}
                </span>
                <span>{{ item.title }}</span>
                <span>{{ item.desc }}</span>
              </li>
            </ul></el-descriptions-item
          >
          <el-descriptions-item :label="$t('msg.userInfo.major')">{{
            detailDate.major
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('msg.userInfo.glory')">{{
            detailDate.glory
          }}</el-descriptions-item>
        </el-descriptions>
        <!-- 尾部 -->
        <div class="foot">
          {{ $t("msg.userInfo.foot") }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { userDetail } from "@/api/user-manage";
import { formatDate } from "@/views/import/utils";
import { watchSwitchLang } from "@/utils/i18n";
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const detailDate = ref([]);
const getUserDetail = async () => {
  detailDate.value = (await userDetail(props.id)).data;
  console.log(detailDate.value);
};
getUserDetail();
watchSwitchLang(getUserDetail);
// 打印
const printLoading = ref(false);
const printObj = {
  // 打印区域
  id: "userInfoBox",
  // 打印标题
  popTitle: "immoc-vue-admin",
  // 打印前
  beforeOpenCallback() {
    printLoading.value = true;
  },
  // 执行打印
  openCallback() {
    printLoading.value = false;
  },
};
</script>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    ::v-deep .el-descriptions {
      flex-grow: 1;
    }
    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
