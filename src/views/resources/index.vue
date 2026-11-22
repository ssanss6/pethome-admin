<template>
  <div>
    <el-tabs v-model="activeTab">
      <!-- 房型管理 -->
      <el-tab-pane label="房型管理" name="roomType">
        <div class="toolbar">
          <el-button type="primary" size="small" @click="openRoomTypeDialog()">＋ 新增房型</el-button>
        </div>
        <el-table :data="roomTypes" border stripe>
          <el-table-column prop="id" label="ID" width="60" />
          <el-table-column prop="name" label="房型" />
          <el-table-column prop="size" label="规格" />
          <el-table-column label="日价" width="100">
            <template #default="{ row }">¥{{ row.dailyPrice }}</template>
          </el-table-column>
          <el-table-column prop="description" label="描述" />
          <el-table-column label="操作" width="140">
            <template #default="{ row }">
              <el-button link type="primary" @click="openRoomTypeDialog(row)">编辑</el-button>
              <el-button link type="danger" @click="removeRoomType(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 笼位管理 -->
      <el-tab-pane label="笼位管理" name="cage">
        <div class="toolbar">
          <el-button type="primary" size="small" @click="openCageDialog()">＋ 新增笼位</el-button>
        </div>
        <el-table :data="cages" border stripe>
          <el-table-column prop="cageNo" label="笼位号" width="120" />
          <el-table-column label="房型">
            <template #default="{ row }">{{ roomTypeName(row.roomTypeId) }}</template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="cageStatusType(row.status)">{{ cageStatusText(row.status) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template #default="{ row }">
              <el-button link type="primary" @click="openCageDialog(row)">编辑</el-button>
              <el-button link type="danger" @click="removeCage(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 房型弹窗 -->
    <el-dialog v-model="roomTypeDialog" :title="roomTypeForm.id ? '编辑房型' : '新增房型'" width="480px">
      <el-form label-width="80px">
        <el-form-item label="名称"><el-input v-model="roomTypeForm.name" /></el-form-item>
        <el-form-item label="规格"><el-input v-model="roomTypeForm.size" placeholder="如 2.0m × 1.5m" /></el-form-item>
        <el-form-item label="日价"><el-input-number v-model="roomTypeForm.dailyPrice" :min="0" :precision="2" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="roomTypeForm.description" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="roomTypeDialog = false">取消</el-button>
        <el-button type="primary" @click="saveRoomType">保存</el-button>
      </template>
    </el-dialog>

    <!-- 笼位弹窗 -->
    <el-dialog v-model="cageDialog" :title="cageForm.id ? '编辑笼位' : '新增笼位'" width="480px">
      <el-form label-width="80px">
        <el-form-item label="笼位号"><el-input v-model="cageForm.cageNo" placeholder="如 A02" /></el-form-item>
        <el-form-item label="房型">
          <el-select v-model="cageForm.roomTypeId" placeholder="选择房型" style="width: 100%">
            <el-option v-for="rt in roomTypes" :key="rt.id" :label="rt.name" :value="rt.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="cageForm.status" style="width: 100%">
            <el-option label="启用" :value="1" />
            <el-option label="停用" :value="2" />
            <el-option label="维修" :value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cageDialog = false">取消</el-button>
        <el-button type="primary" @click="saveCage">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import * as resApi from '../../api/resource'

const activeTab = ref('roomType')
const roomTypes = ref<any[]>([])
const cages = ref<any[]>([])

const roomTypeDialog = ref(false)
const roomTypeForm = ref<any>({})

const cageDialog = ref(false)
const cageForm = ref<any>({})

async function loadRoomTypes() {
  roomTypes.value = (await resApi.listRoomTypes()) as any[]
}

async function loadCages() {
  cages.value = (await resApi.listCages()) as any[]
}

onMounted(() => {
  loadRoomTypes()
  loadCages()
})

function roomTypeName(id: number) {
  const rt = roomTypes.value.find((r) => r.id === id)
  return rt ? rt.name : '-'
}

function cageStatusText(s: number) {
  return s === 1 ? '启用' : s === 2 ? '停用' : '维修'
}

function cageStatusType(s: number) {
  return s === 1 ? 'success' : s === 2 ? 'info' : 'warning'
}

function openRoomTypeDialog(row?: any) {
  roomTypeForm.value = row ? { ...row } : { name: '', size: '', dailyPrice: 0, description: '' }
  roomTypeDialog.value = true
}

async function saveRoomType() {
  const f = roomTypeForm.value
  if (f.id) {
    await resApi.updateRoomType(f.id, f)
  } else {
    await resApi.createRoomType(f)
  }
  ElMessage.success('保存成功')
  roomTypeDialog.value = false
  loadRoomTypes()
}

async function removeRoomType(row: any) {
  await ElMessageBox.confirm('确认删除该房型？', '提示', { type: 'warning' })
  await resApi.deleteRoomType(row.id)
  ElMessage.success('已删除')
  loadRoomTypes()
  loadCages()
}

function openCageDialog(row?: any) {
  cageForm.value = row ? { ...row } : { cageNo: '', roomTypeId: null, status: 1 }
  cageDialog.value = true
}

async function saveCage() {
  const f = cageForm.value
  if (f.id) {
    await resApi.updateCage(f.id, f)
  } else {
    await resApi.createCage(f)
  }
  ElMessage.success('保存成功')
  cageDialog.value = false
  loadCages()
}

async function removeCage(row: any) {
  await ElMessageBox.confirm('确认删除该笼位？', '提示', { type: 'warning' })
  await resApi.deleteCage(row.id)
  ElMessage.success('已删除')
  loadCages()
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 12px;
}
</style>
