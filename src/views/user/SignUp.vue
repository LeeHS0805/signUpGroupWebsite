<template>
    <div class="body">
        <div class="background"></div>
        <div class="form">
            <div class="title">
                <p>天津理工大学计算机科学与工程学院</p>
                <p>学生组织报名系统</p>
            </div>
            <div class="personInfo">
                <p class="content">个人信息</p>
                <i-input class="input" icon="ios-person" placeholder="请输入学号" v-model="editData.stdId"></i-input>
                <i-input class="input" icon="ios-clock" placeholder="请输入姓名" v-model="editData.stdName"></i-input>
                <i-input class="input" icon="ios-body" placeholder="请输入qq号" v-model="editData.stdQQ"></i-input>
                <i-input class="input" icon="ios-call" placeholder="请输入手机号" v-model="editData.stdPhone"></i-input>
            </div>
            <div class="classInfo">
                <p class="content">专业与班级</p>
                <Cascader class="select" :data="majorData" v-model="editData.majorValue"></Cascader>
            </div>
            <div class="signInfo">
                <p class="content">第一志愿</p>
                <Cascader class="select" :data="orginazationData" v-model="editData.firstWill"></Cascader>
                <i-input class="select textarea" v-model="editData.firstReason" type="textarea"
                         placeholder="请输入加入此组织的理由"></i-input>
                <p class="content">第二志愿</p>
                <Cascader class="select" :data="orginazationData" v-model="editData.secondWill"></Cascader>
                <i-input class="select textarea" v-model="editData.secondReason" type="textarea"
                         placeholder="请输入加入此组织的理由"></i-input>
                <p class="content">是否调剂</p>
                <i-switch v-model="editData.isDispensing">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                </i-switch>
            </div>
            <div class="func">
                <i-button class="input button" type="success" @click="submit" long>报名</i-button>
                <i-button class="input button" @click="toPath('/login')" long>后台登录</i-button>
            </div>

        </div>

        <div class="bottom">
            仅供20级科协成员学习使用<br>2021 &copy; SIPC
        </div>
    </div>

</template>

<script>
    import config from '../../config/select.json';

    export default {
        data() {
            return {
                editData: {
                    stdId: '20202020',
                    stdName: '李鑫磊',
                    stdQQ: '504794559',
                    stdPhone: '18920259090',
                    majorValue: undefined,
                    firstWill: [],
                    firstReason: undefined,
                    secondWill: [],
                    secondReason: undefined,
                    isDispensing: true
                },
                majorData: config.majorData,
                orginazationData: config.orginazationData
            }
        },
        mounted() {

        },
        methods: {
            checkValue(data) {
                let nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
                let phoneReg = /^1[3456789]\d{9}$/;
                let idReg = /^(\d{8})?$/;
                for (let key in data) {
                    if (key.indexOf('reason')) continue;
                    if (data[key] === undefined || data[key] == ' ') {
                        this.$Message.error('有漏填的消息哦');
                        return;
                    }
                }
                if (!idReg.test(data.stdId)) {
                    this.$Message.error('学号填错了哦');
                    return;
                } else if (!nameReg.test(data.stdName)) {
                    this.$Message.error('姓名不合法');
                    return;
                } else if (!phoneReg.test(data.stdPhone)) {
                    this.$Message.error('电话号不合法');
                    return;
                } else if (data.firstWill.length == 0 || data.secondWill.length == 0) {
                    this.$Message.error('未填选志愿');
                    return;
                }
                return true
            },
            toPath(path) {
                this.$router.push({path: path});
            },
            async submit() {
                if (this.checkValue(this.editData)) {
                    let stdData = {
                        stdId: this.editData.stdId,
                        stdName: this.editData.stdName,
                        stdQQ: this.editData.stdQQ,
                        stdPhone: this.editData.stdPhone,
                        major: this.editData.majorValue[0],
                        classNum: this.editData.majorValue[1],
                        firstWill: {
                            organization: this.editData.firstWill[0],
                            branch: this.editData.firstWill[1],
                            reason: this.editData.firstReason ? this.editData.firstReason : ' '
                        },
                        secondWill: {
                            organization: this.editData.secondWill[0],
                            branch: this.editData.secondWill[1],
                            reason: this.editData.secondReason ? this.editData.secondReason : ' ',
                        },
                        isDispensing: this.editData.isDispensing
                    }
                    const {data: {code, message}} = await this.$axios.post('/post', stdData)
                    if (code === '0000') {
                        this.$Message.success("提交成功!");
                    } else {
                        this.$Message.error(message);
                    }

                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .body {
        position: relative;
        padding-top: 1px;
        padding-bottom: 1px;

        .background {
            height: 100vh;
            width: 100%;
            background-color: #34495e;
            position: fixed;
        }

        .form {
            position: relative;
            padding: 20px 40px;
            width: 400px;
            text-align: center;
            font-size: 1.2em;
            margin: 30px auto;
            color: white;

            .title {
                font-size: 1.3em;
                font-weight: 600;
                margin-bottom: 25px;

                p {
                    margin: 10px auto;
                }
            }

            .input {
                margin: 0.55em auto;
            }

            .content {
                margin: 1.0em;
            }

            .select {
                margin: 0.55em auto;
            }

            .func {
                margin: 1.5em 0 3em 0;

                .button {
                    display: block;
                    width: 200px;
                    margin: 1.2em auto;
                    font-size: 0.8em;
                    font-weight: 500;
                }
            }
        }

        .bottom {
            text-align: center;
            position: absolute;
            bottom: 0.5em;
            left: 0;
            right: 0;
            font-size: 1.2em;
            color: seashell;
        }
    }
</style>
