<template>
  <div>
    <!-- 统计卡 -->
    <div class="stat-row">
      <div class="stat" v-for="s in stats" :key="s.key">
        <div class="k">{{ s.key }}</div>
        <div class="v">{{ s.value }}<small>{{ s.unit }}</small></div>
        <div class="d" :style="{ color: s.color }">{{ s.delta }}</div>
      </div>
    </div>

    <!-- 工具栏 -->
    <div class="toolbar">
      <span class="seg"><em class="on">周</em></span>
      <span class="range">06-12 ~ 06-18</span>
      <span class="fill"></span>
      <el-button size="small">导出</el-button>
      <el-button type="primary" size="small">＋ 新建寄养订单</el-button>
    </div>

    <!-- 笼位看板（写死数据） -->
    <el-card shadow="never">
      <div class="cal-head">
        <div class="cage-col">笼位</div>
        <div v-for="d in days" :key="d.key" :class="{ today: d.today }">{{ d.label }}</div>
      </div>
      <div class="cal-row" v-for="row in calendar" :key="row.cage">
        <div class="cage-col">{{ row.cage }}<small>{{ row.type }}</small></div>
        <div v-for="(cell, i) in row.cells" :key="i" class="cell" :class="{ today: days[i].today }">
          <div v-if="cell" class="occ" :style="{ background: cell.color }">
            {{ cell.name }}<small>{{ cell.until }}</small>
          </div>
          <div v-else class="free">可订</div>
        </div>
      </div>
      <div class="legend">
        <span><i style="background:#FF9B6E"></i>标准间</span>
        <span><i style="background:#6BA8D8"></i>豪华间</span>
        <span><i style="background:#7FC49B"></i>猫咪房</span>
        <span><i class="free-dot"></i>空闲可订</span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '../../api/request'

const stats = ref([
  { key: '今日在住', value: '--', unit: '只', delta: '', color: '#2E9E5B' },
  { key: '入住率', value: '--', unit: '%', delta: '', color: '#2E9E5B' },
  { key: '今日洗护完成', value: '--', unit: '单', delta: '', color: '#2E9E5B' },
  { key: '客单价', value: '--', unit: '', delta: '', color: '#2E9E5B' }
])

onMounted(async () => {
  try {
    const data: any = await request.get('/reports/summary')
    stats.value = [
      { key: '今日在住', value: String(data.inBoarding ?? 0), unit: '只', delta: '笼位 ' + (data.totalCages ?? 0), color: '#2E9E5B' },
      { key: '入住率', value: String(data.occupancyRate ?? 0), unit: '%', delta: '', color: '#2E9E5B' },
      { key: '今日洗护完成', value: String(data.todayGroomingDone ?? 0), unit: '单', delta: '', color: '#2E9E5B' },
      { key: '客单价', value: '¥' + (data.avgOrderAmount ?? 0), unit: '', delta: '', color: '#2E9E5B' }
    ]
  } catch (e) {
    /* 后端未启动时保持占位 */
  }
})

const days = [
  { key: '0612', label: '06-12 三', today: false },
  { key: '0613', label: '06-13 四', today: true },
  { key: '0614', label: '06-14 五', today: false },
  { key: '0615', label: '06-15 六', today: false },
  { key: '0616', label: '06-16 日', today: false },
  { key: '0617', label: '06-17 一', today: false },
  { key: '0618', label: '06-18 二', today: false }
]

const calendar = [
  {
    cage: 'A01', type: '标准间',
    cells: [
      { name: '可乐', until: '至 06-14', color: '#FF9B6E' },
      { name: '可乐', until: '', color: '#FF9B6E' },
      { name: '可乐', until: '', color: '#FF9B6E' },
      null, null, null, null
    ]
  },
  {
    cage: 'A03', type: '标准间',
    cells: [
      { name: '豆豆', until: '至 06-15', color: '#FF9B6E' },
      { name: '豆豆', until: '', color: '#FF9B6E' },
      { name: '豆豆', until: '', color: '#FF9B6E' },
      { name: '豆豆', until: '', color: '#FF9B6E' },
      null, null, null
    ]
  },
  {
    cage: 'B01', type: '豪华间',
    cells: [
      null, null,
      { name: '布丁', until: '至 06-16', color: '#6BA8D8' },
      { name: '布丁', until: '', color: '#6BA8D8' },
      { name: '布丁', until: '', color: '#6BA8D8' },
      { name: '布丁', until: '', color: '#6BA8D8' },
      null
    ]
  },
  {
    cage: 'C02', type: '猫咪房',
    cells: [
      { name: '团子', until: '至 06-15', color: '#7FC49B' },
      { name: '团子', until: '', color: '#7FC49B' },
      { name: '团子', until: '', color: '#7FC49B' },
      { name: '团子', until: '', color: '#7FC49B' },
      null, null, null
    ]
  },
  {
    cage: 'D01', type: '猫咪房',
    cells: [
      null,
      { name: '雪球', until: '至 06-14', color: '#B79BDB' },
      { name: '雪球', until: '', color: '#B79BDB' },
      null, null, null, null
    ]
  }
]
</script>

<style scoped>
.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}
.stat {
  background: #fff;
  border-radius: 10px;
  padding: 15px 16px;
}
.stat .k {
  font-size: 12px;
  color: #8c8680;
}
.stat .v {
  font-size: 24px;
  font-weight: 700;
  margin-top: 7px;
}
.stat .v small {
  font-size: 12px;
  font-weight: 400;
  color: #8c8680;
  margin-left: 4px;
}
.stat .d {
  font-size: 12px;
  margin-top: 7px;
}
.toolbar {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 16px;
}
.seg {
  background: #fff;
  border: 1px solid #eae5df;
  border-radius: 8px;
  padding: 5px 14px;
}
.seg em {
  font-style: normal;
}
.seg .on {
  color: #ff7a45;
  font-weight: 600;
}
.range {
  font-size: 13px;
  color: #8c8680;
}
.fill {
  flex: 1;
}
.cal-head,
.cal-row {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
}
.cal-head {
  background: #faf8f5;
  border-bottom: 1px solid #eae5df;
}
.cal-head > div {
  padding: 10px 6px;
  font-size: 12px;
  color: #8c8680;
  text-align: center;
  font-weight: 600;
}
.cal-head .today {
  color: #ff7a45;
  background: #fff6f0;
}
.cal-row {
  border-bottom: 1px solid #f5f2ee;
}
.cal-row:last-child {
  border-bottom: none;
}
.cage-col {
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
}
.cage-col small {
  font-size: 11px;
  color: #8c8680;
  font-weight: 400;
}
.cell {
  min-height: 52px;
  border-left: 1px solid #f5f2ee;
  padding: 5px;
}
.cell.today {
  background: #fffbf8;
}
.occ {
  border-radius: 6px;
  padding: 6px 7px;
  font-size: 11px;
  color: #fff;
  font-weight: 500;
  height: 100%;
  min-height: 42px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.occ small {
  opacity: 0.85;
  font-size: 10px;
  margin-top: 1px;
}
.free {
  height: 100%;
  min-height: 42px;
  border-radius: 6px;
  border: 1px dashed #e7e2db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #c9c2b9;
}
.legend {
  display: flex;
  gap: 18px;
  margin-top: 14px;
  font-size: 12px;
  color: #8c8680;
}
.legend i {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  display: inline-block;
  margin-right: 5px;
}
.legend .free-dot {
  border: 1px dashed #d8d2ca;
  background: transparent;
}
</style>
