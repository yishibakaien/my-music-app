<template>
    <div class="singer">
        <list-view :data="this.singers"></list-view>
    </div>
</template>
<script>
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/listView/listView'

  const HOT_NAME = '热门'
  const HOT_SINGER_LENGTH = 10
  export default {
    data() {
      return {
        singers: []
      }
    },
    components: {
      ListView
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then(res => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LENGTH) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        /**
         * 为了得到有序列表，我们需要处理 map
         */
        let hot = []
        let rest = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            rest.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        // 按照字母升序排序
        rest.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
        return hot.concat(rest)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>