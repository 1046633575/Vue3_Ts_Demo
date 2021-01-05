enum Type {
  Todo,
  Complete,
}

enum NavType {
  All = 'All',
  Unsucc = 'Unsucc',
  Succ = 'Succ',
}

interface ITodoItem {
  id: string,
  title: string
  type: Type
  create_date: string
  complete_date?: string
  detail?: string
}

interface IState {
  navKey: NavType
  todoList: ITodoItem[]
  filterList: ITodoItem[]
}

const c = function (): void {}

/**
 * 获取当前日期
 * 如：2020-01-01 20:00
 */
c.getDate = function (): string {
  const d: Date = new Date();
  let str: string = '';
  str += d.getFullYear() + '-'; //获取当前年份
  str +=
    d.getMonth() < 9 ? '0' + (d.getMonth() + 1) + '-' : (d.getMonth() + 1) + '-'; //获取当前月份（0——11）
  str += d.getDate() <= 9 ? '0' + d.getDate() + ' ' : d.getDate() + ' ';
  str += d.getHours() <= 9 ? '0' + d.getHours() + ':' : d.getHours() + ':';
  str += d.getMinutes() <= 9 ? '0' + d.getMinutes() : d.getMinutes();
  return str;
}

/**
 * 获取storage
 */
c.getStorage = function (key: string) {
  const str = localStorage.getItem(key)
  if (str) {
    return JSON.parse(str)
  }
}

/**
 * 设置storage
 */
c.setStorage = function (key: string, data: ITodoItem[] | []) {
  localStorage.setItem(key, JSON.stringify(data))
}

c.getRandomStr = function (length: number) {
  const x = '0123456789qwertyuioplkjhgfdsazxcvbnm';
  let tmp = '';
  const timestamp = new Date().getTime();
  for (var i = 0; i < length; i++) {
    tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
  }
  return timestamp + tmp;
}

export { c as $c, Type, NavType, ITodoItem, IState }
