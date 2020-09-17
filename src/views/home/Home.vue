<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <tab-control ref="tabControl1"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 v-show="isTabFixed"
                 class="fixed"></tab-control>
    <scroll class="content"
            :probe-type="3"
            ref="scroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            @scroll="contentScroll">
      <home-swipper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swipper>
      <home-recommend :recommends="recommends"/>
      <home-feature></home-feature>
      <tab-control ref="tabControl2" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
  import HomeSwipper from './childComps/HomeSwipper'
  import HomeRecommend from './childComps/HomeRecommend'
  import HomeFeature from './childComps/HomeFeature'

  import NavBar from 'components/common/navbar/NarBar'
  import TabControl from 'components/content/mainTabbar/TabControl'
  import GoodList from 'components/content/goods/GoodList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/common/backTop/BackTop'


  import {getHomeMultidata, getHomeGoods} from 'network/home.js'
  import { debounce } from "common/utils";


  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isBackTopShow: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    components: {
      NavBar,
      HomeSwipper,
      HomeRecommend,
      HomeFeature,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata();
      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      /*let timer = null;
      this.bus.$on('itemImgLoad',()=>{
        if (timer) clearTimeout(timer);
        timer = setTimeout(()=> {
          this.$refs.scroll.refresh();
        },500)
      })*/
      //或者使用反抖函数
      // 图片加载完成的监听事件
      const refresh =debounce(this.$refs.scroll.refresh,500);
      this.bus.$on('itemImgLoad',()=>{
        refresh()
      })

    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        this.axios.post('/mock/goods', {
          type,
          page: 0
        }).then(res => {
          this.goods[type].list.push(...res.data[type].list);
          this.$refs.scroll.finishPullUp()
        })
      },
      tabClick(index) {
        console.log(index);
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      //加载更多事件
      loadMore() {
        this.getHomeGoods(this.currentType);
      },
      //返回顶部事件
      backClick() {
        this.$refs.scroll.scrollTo(0,0,50);
      },
      //滚动监听事件
      contentScroll(position) {
        //显示返回顶部按钮
        this.isBackTopShow = (-position.y) > 1000
        //判断tabControl[流行，新款，精选]是否显示
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //监听加载轮播图完成的控制栏fixed事件
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        // console.log(this.tabOffsetTop);
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y;
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
/*    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }

 /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }*/
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .fixed {
    position: relative;
    z-index: 9;
  }
</style>
