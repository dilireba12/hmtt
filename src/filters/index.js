import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'datjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export const dateformat = (time) => {
  return dayjs(time).fromNow()
  // return time
}
