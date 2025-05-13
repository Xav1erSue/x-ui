
# useClickAway

## 使用场景

当用户点击或操作不在目标元素内部时，触发回调函数。

## 用法

### 基本使用

<demo react="hooks/use-click-away/demo/base.tsx" />

### 自定义事件

默认的捕获事件为 `click`，可以通过第三个参数自定义捕获事件，如 `keydown` 等。

<demo react="hooks/use-click-away/demo/event.tsx" />
