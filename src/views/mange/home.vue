<template>
    <el-container class="home_container">
        <!--        头部区域-->
        <div class="el-head-container">
            <el-header>
                <div class="header_icon">
                    <img src="../../assets/img/login/SIPC_withoutText.png" alt="">
                    <span>学生组织报名管理系统</span>
                </div>
                <div class="header_info">
                    <span>{{date | formaDate}}</span>
                </div>
                <div class="header_logout">
                    <el-button type="danger" round @click.once="logout">退出</el-button>
                </div>
            </el-header>
        </div>
        <!--        页面主体区域-->
        <el-container>
            <div class="el-aside-container">
                <el-aside :width="isCollapsed ?'64px' : '200px'" ref="elAside">
                    <div class="toggle-button">
                        <span @click="tiggleCollapsed" :class="isCollapsed?'span_close':'span'">|||</span>
                    </div>
                    <!--                侧边栏菜单-->
                    <el-menu
                            text-color="#fff"
                            active-text-color="#ffd04b"
                            :default-active="navState"
                            background-color="#505F82"
                            :unique-opened="true"
                            :collapse="isCollapsed"
                            :collapse-transition="false"
                            :router="true">
                        <el-submenu v-for="(item,index) in menuList" :key="index" :index="index.toString()">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{item.authName}}</span>
                            </template>
                            <el-menu-item :index="'/'+subItem.path+''" v-for="(subItem,sunIndex) in item.children"
                                          :key="sunIndex">
                                <template slot="title">
                                    <i class="el-icon-s-grid"></i>
                                    <span>{{subItem.name}}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
            </div>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>


<script>
    import {Loading} from 'element-ui';

    var padaDate = function (value) {
        return value < 10 ? '0' + value : value;
    }
    export default {
        name: "home.vue",
        data() {
            return {
                date: new Date(),
                menuList: [
                    {
                        authName: '管理',
                        children: [
                            {
                                name: '学生信息',
                                path: 'stuInfo'
                            }
                        ]
                    }
                ],
                isCollapsed: false,   //是否折叠菜单
                navState: '',   //nav高亮
                loginTime: '',
            }
        },
        methods: {
            logout: function () {
                window.sessionStorage.clear()
                this.$Message({
                    message: '您已安全退出',
                    type: 'success',
                    duration: 800
                })
                this.$router.push('/login')
            },
            tiggleCollapsed() {
                this.isCollapsed = !this.isCollapsed;
            },
        },
        created() {
            //加载
            let loadingInstance = Loading.service({fullscreen: false})
            //菜单激活高亮
            this.navState = window.sessionStorage.getItem('navState')
            //关闭加载
            setTimeout(loadingInstance.close(), 700)
            this.loginTime = new Date(sessionStorage.getItem('loginTime'))
        },
        mounted() {
            //获取用户名
            var _this = this;
            //声明一个变量指向Vue实例this，保证作用域一致
            this.timer = setInterval(function () {
                //设置定时器，每秒执行一次function函数，
                //函数是获取当前时间并给date变量赋值(每秒赋值一次)
                _this.date = new Date();  //修改数据date
            }, 1000);
        },
        filters: {
            //设置一个函数来进行过滤
            formaDate: (value) => {
                //创建一个时间日期对象
                var date = new Date();
                var month = padaDate(date.getMonth() + 1);    //存储月份
                var day = padaDate(date.getDate());         //存储日期
                var hours = padaDate(date.getHours());      //存储时
                var minutes = padaDate(date.getMinutes());  //存储分
                var seconds = padaDate(date.getSeconds());  //存储秒
                //返回格式化后的日期
                return month + '月' + day + '日' + hours + '时' + minutes + '分' + seconds + '秒';
            }
        },
        watch: {
            $route(to, from) {
                if (to !== from) {
                    this.navState = to.fullPath
                    window.sessionStorage.setItem('navState', this.navState)
                }
            }
        },
        components: {}
    }
</script>

<style lang="less" scoped>
    .home_container {
        height: 100vh;
        width: 100vw;
    }

    .el-head-container {
        display: inline;
        height: 60px;

        .el-header {
            position: fixed;
            width: 100vw;
            line-height: 60px;
            background-color: #373d41;
            color: white;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 2px;

            .header_icon {
                display: inline-block;
                height: 60px;
                width: 200px;

                img {
                    position: relative;
                    height: 35px;
                    width: 35px;
                    transform: translateY(30%);
                }

                span {
                    margin-left: 18px;
                }
            }

            .header_info {
                display: inline-block;
                position: absolute;
                right: 125px;
                font-size: 14px;
                font-weight: 400;

                span {
                    margin-left: 30px;
                }
            }

            .header_logout {
                display: inline-block;
                float: right;
                margin: 0;

                /deep/ .el-button {
                    transform: scale(0.8);
                    letter-spacing: 2px;
                    font-size: 15px;
                }
            }

        }
    }

    .el-aside-container {
        margin-top: 60px;

        .el-aside {
            position: relative;
            height: calc(100vh - 60px);
            overflow: hidden;
            background-color: rgba(80, 95, 130);

            .toggle-button {
                padding: 15px;
                text-align: center;
                letter-spacing: 3px;
                color: #eaedf1;
                animation-fill-mode: forwards;

                span.span_close {
                    padding: 0 2px;
                }

                span.span {
                    display: inline-block;
                    position: relative;
                    top: 4px;
                    transform: rotate(90deg);
                }
            }

            .toggle-button span:hover {
                display: inline-block;
                position: relative;
                transform: rotate(90deg);
                transition: .5s all ease-in-out;
                top: 4px;
                color: rgb(255, 208, 70);
            }

            .el-menu {
                width: 100%;
            }
        }
    }

    .el-main {
        width: 100%;
        margin-top: 60px;
        background-color: #eaedf1;
    }
</style>
