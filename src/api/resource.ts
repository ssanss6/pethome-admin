import request from './request'

// 房型
export function listRoomTypes() {
  return request.get('/admin/room-types')
}
export function createRoomType(data: any) {
  return request.post('/admin/room-types', data)
}
export function updateRoomType(id: number, data: any) {
  return request.put(`/admin/room-types/${id}`, data)
}
export function deleteRoomType(id: number) {
  return request.delete(`/admin/room-types/${id}`)
}

// 笼位
export function listCages(roomTypeId?: number) {
  return request.get('/admin/cages', { params: roomTypeId ? { roomTypeId } : {} })
}
export function createCage(data: any) {
  return request.post('/admin/cages', data)
}
export function updateCage(id: number, data: any) {
  return request.put(`/admin/cages/${id}`, data)
}
export function deleteCage(id: number) {
  return request.delete(`/admin/cages/${id}`)
}
