# pethome-admin（管理后台 Web）

宠物寄养洗护预约管理平台 · 门店管理后台（Vue3 + Vite + TypeScript + Element Plus + Pinia + Vue Router）

## 技术栈

- Vue 3 + Vite + TypeScript
- Element Plus
- Pinia + Vue Router
- axios（`/api` 代理到后端）

## 已实现功能

- 账号密码登录：→ 后端 `POST /api/auth/login`
- 经营看板：统计卡接真实接口 `GET /api/reports/summary`（在住 / 入住率 / 今日洗护完成 / 客单价）
- 笼位日历看板（占位数据）
- 侧边栏布局 + 路由守卫（未登录跳转 `/login`）

## 目录

```
src\
├── api\request.ts / auth.ts / resource.ts   # axios 封装 + 登录/资源接口
├── stores\user.ts                            # Pinia 用户状态
├── router\index.ts                           # 路由 + 登录守卫
├── layouts\MainLayout.vue                    # 侧边栏 + 顶栏布局
└── views\
    ├── login\index.vue        # 登录页
    ├── dashboard\index.vue    # 经营看板（报表接真实接口）
    └── resources\index.vue    # 房型与笼位
```

## 运行

```bash
npm install
npm run dev      # http://localhost:5173（/api 已代理到 http://127.0.0.1:8080）
npm run build    # 生产构建
```

默认账号：`admin / admin123`（后端首次启动自动种子）。

## 待办

- 侧边栏其余菜单（寄养订单 / 洗护订单 / 排班 / 定价 / 结算 / 报表 / 售后）逐个实现
- 笼位日历 / 资源页数据接真实接口（当前部分为占位数据）
