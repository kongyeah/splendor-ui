<template>
  <div class="docs-preview-part">
    <sk-input class="filter" v-model="filter" icon="filter-2" placeholder="筛选" />
    <div class="grid">
      <sk-copy-link
        v-for="n in list"
        :key="n.icon_id"
        v-slot="{ copy }"
        :text="n.font_class"
        @success="copySuccess(n.font_class)"
      >
        <div class="item" @click="copy">
          <div class="inner">
            <p><sk-icon :type="n.font_class" /></p>
            <p>{{ n.font_class }}</p>
          </div>
        </div>
      </sk-copy-link>
      <i v-if="list.length === 0">无结果</i>
      <div v-for="n in 16" class="item-space"></div>
    </div>
  </div>
</template>

<script>
import iconfont from './iconfont.json';
import { Notify } from '../../../src/main';
export default {
  name: 'icon-list',
  data() {
    return {
      icons: iconfont.glyphs.sort((a, b) => {
        if (a.font_class < b.font_class) {
          return -1;
        }
        return 1;
      }),
      filter: '',
    };
  },
  computed: {
    list() {
      return this.icons.filter(({ font_class }) => font_class.indexOf(this.filter) >= 0);
    },
  },
  methods: {
    copySuccess(name) {
      Notify.success(`已复制：${name}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.docs-preview-part {
  position: relative;
}

.filter {
  position: absolute;
  right: -8px;
  top: -90px;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    display: flex;
    flex-direction: column;
    width: 80px;
    height: 100px;
    cursor: pointer;
    padding-top: 10px;
    margin-bottom: 8px;

    &:hover {
      background-color: #f5f5f5;
    }

    .sk-icon {
      font-size: 36px;
    }

    .inner {
      text-align: center;
      font-size: 12px;

      p {
        margin: 0;
      }
    }
  }

  .item-space {
    width: 80px;
  }
}
</style>
