<template>
    <div class="login_container">
        <transition name="login">
            <div class="login_box" v-if="show">
                <div class="img_box">
                    <div class="avatar_box">
                        <img src="../../assets/img/login/SIPC_withoutText.png" alt="">
                    </div>
                </div>
                <div>
                    <el-form class="login_form" :model="loginForm" :rules="checkData" ref="loginFormRef">
                        <el-form-item class="efi" prop="username">
                            <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
                        </el-form-item>
                        <el-form-item class="efi" prop="password">
                            <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"
                                      @keyup.enter.native="login"></el-input>
                        </el-form-item>
                        <el-form-item class="ebt">
                            <el-button type="primary" @click="login">登录</el-button>
                            <el-button type="info" @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {Loading} from 'element-ui';

    export default {
        name: "login.vue",
        data() {
            return {
                // 登录表单绑定的对象
                loginForm: {
                    username: '',
                    password: '',
                },
                //字符检验
                checkData: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur'}
                    ]
                },
                //mounted动画加载变量
                show: false
            }
        },
        //mounted动画加载函数
        mounted() {
            setTimeout(() => {
            }, 500)
            this.show = true
        },
        methods: {
            //重置表单函数
            reset: function () {
                this.$refs.loginFormRef.resetFields()
            },
            //登录函数
            login: function () {
                //登录前校验表单数据
                this.$refs.loginFormRef.validate(async isRight => {
                    if (isRight) {
                        const loadingInstance = Loading.service({fullscreen: true})
                        const loginMsg = await this.$axios.post('/login', this.loginForm)
                        loadingInstance.close()
                        let {code, message, data: {token}} = loginMsg.data
                        if (code === '0000') {
                            this.$Message({
                                message: message,
                                type: 'success',
                                duration: 600
                            })
                            sessionStorage.setItem('login', token)
                            this.$router.push({path: '/home'})
                        } else {
                            this.$Message({
                                message: message,
                                type: 'error',
                                duration: 1000
                            })
                        }
                    }
                })
            }
        }
    }

</script>


<style scoped lang="less">
    .login_container {
        display: flex;
        display: -webkit-flex;
        width: 100vw;
        height: 100vh;
        align-items: center;
        justify-content: center;
        background-color: #2b4b6b;

        .login_box {
            display: flex;
            width: 400px;
            height: 450px;
            justify-content: center;
            flex-wrap: wrap;
            background-color: #ffffff;
            border-radius: 20px;
            box-shadow: 0 0 2px #eeeeee;

            .img_box {
                width: 100%;
                height: 120px;
                margin-top: 30px;
                display: flex;
                justify-content: center;

                .avatar_box {
                    display: flex;
                    width: 120px;
                    height: 120px;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #eeeeee;
                    box-shadow: 0 0 10px #eeeeee;
                    border-radius: 50%;

                    img {
                        height: 65px;
                        width: 65px;
                    }
                }
            }

            div {
                width: 100%;
                height: calc(100% - 150px);

            }
        }
    }

    .ebt {
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        margin-top: 50px;
        padding: 0 40px;

        .efi {
            margin: 35px auto;
        }
    }

    /deep/ .el-input__inner {
        letter-spacing: 1.5px;
    }

    /deep/ .el-form-item__error {
        margin-top: 5px;
    }

    .login-enter {
        opacity: 0;
        transform: translateY(30px);
    }

    .login-enter-active {
        transition: .5s all ease-in;
    }

</style>
