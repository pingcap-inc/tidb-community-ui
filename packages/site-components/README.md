# 社区公共组件

## 难点

- 多个页面需要调用组件
- 每个页面域名不同
- 不同页面有不同的路由方法
- 组件需要调用一些接口

### 解决方案

使用方需要调用 [defineSiteComponentsConfig](src/app-config.ts) 方法设置当前引用者信息：
- `site`: 当前站点
  - `Site.home`: tidb.io
  - `Site.asktug`: asktug.com
  - `Site.others`
- `env`: 环境
  - `Env.prod`
  - `Env.preview`
  - `Env.local`
- `wrapRouteLink`: 如果使用方有站内路由，需要提供该方法以使导航按钮可以使用路由

使用方需要提供 [SiteComponentsContext](src/context/site-components-context.ts) 以提供接口调用方法：
- `fetchers`: 本项目使用 `SWR` 管理客户端请求，使用方需要提供具体每个站点具体请求的逻辑。
  - `home`: tidb.io 相关接口
  - `accounts`: accounts 相关接口
  - `asktug`: asktug 相关接口

[src/datasource](src/datasource) 中封装了所有需要的数据接口，使用方使用时需要确保每个接口都有对应的实现。
