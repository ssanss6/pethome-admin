# frontend-admin（管理后台 Web）

门店管理后台：Vue3 + Vite + TypeScript + Element Plus + Pinia + Vue Router。

## 已实现

- 登录页（账号密码 → 后端 `POST /api/auth/login`）
- 首页看板（笼位预约看板，写死数据：统计卡 + 笼位日历）
- 侧边栏布局 + 路由守卫（未登录跳转 `/login`）

## 目录

```
src\
├── api\request.ts / auth.ts     # axios 封装 + 登录接口
├── stores\user.ts               # Pinia 用户状态
├── router\index.ts              # 路由 + 登录守卫
├── layouts\MainLayout.vue       # 侧边栏 + 顶栏布局
└── views\login、views\dashboard # 登录页 + 看板首页
```

## 运行

```bash
npm install
npm run dev      # http://localhost:5173（/api 已代理到 http://127.0.0.1:8080）
npm run build    # 生产构建
```

默认账号：`admin / admin123`（后端首次启动自动种子）。

## 待办

- 侧边栏其余菜单（寄养订单/洗护订单/房型笼位/排班/定价/结算/报表）逐个实现
- 看板数据接真实接口（当前写死）
