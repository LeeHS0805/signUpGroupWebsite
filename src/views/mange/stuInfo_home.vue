<template>
    <div class="user_container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理</el-breadcrumb-item>
            <el-breadcrumb-item>学生信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row>
                <el-col :span="8">
                    <el-input placeholder="请输入搜索关键字" class="input-with-select" v-model="keyword"
                              @keyup.enter.native="getUserListByKeyword" :clearable="true" @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserListByKeyword"></el-button>
                    </el-input>
                </el-col>
            </el-row>

            <el-table max-height="550px" :data="userList" style="width: 100%" ref="elTable">
                <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                <el-table-column prop="stdId" label="学号" sortable min-width="90" align="center"></el-table-column>
                <el-table-column prop="stdName" label="姓名" sortable min-width="140" align="center"></el-table-column>
                <el-table-column prop="major" label="专业" sortable min-width="200" max-width="220"
                                 align="center"></el-table-column>
                <el-table-column prop="classNum" label="班级" sortable min-width="80" align="center"></el-table-column>
                <el-table-column prop="stdQQ" label="QQ" sortable min-width="120" align="center"></el-table-column>
                <el-table-column width="10"></el-table-column>
                <el-table-column prop="stdPhone" label="电话" sortable min-width="130" max-width="120"
                                 align="center"></el-table-column>
                <el-table-column prop="firstWill.organization" label="第一志愿" sortable min-width="160" max-width="200"
                                 align="center"></el-table-column>
                <el-table-column prop="firstWill.branch" label="部门" sortable min-width="120" max-width="140"
                                 align="center"></el-table-column>
                <el-table-column prop="firstWill.reason" label="理由" sortable min-width="220" max-width="250"
                                 align="center"></el-table-column>
                <el-table-column prop="secondWill.organization" label="第二志愿" sortable min-width="160" max-width="200"
                                 align="center"></el-table-column>
                <el-table-column prop="secondWill.branch" label="部门" sortable min-width="120" max-width="140"
                                 align="center"></el-table-column>
                <el-table-column prop="firstWill.reason" label="理由" sortable min-width="220" max-width="250"
                                 align="center"></el-table-column>
                <el-table-column prop="isDispensing" label="调剂" sortable min-width="80" max-width="90"
                                 align="center"></el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-tooltip class="item" effect="dark" content="修改" placement="top" :open-delay=350
                                        :hide-after=1500>
                                <el-button type="primary" icon="el-icon-edit" size="mini"
                                           @click="showEditDialog(scope.row)"></el-button>
                            </el-tooltip>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5,10, 20, 30, 50]"
                    :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>

            <!--            修改用户信息对话框-->
            <el-dialog title="修改用户" align="center" :visible.sync="editdialogVisible" width="50%"
                       :before-close="handleClose" class="editDialog">
                <div class="personInfo">
                    <p class="content">个人信息</p>
                    <i-input class="input" icon="ios-person" placeholder="请输入学号" v-model="editData.stdId"
                             disabled="disabled"></i-input>
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
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editdialogVisible=false" style="margin-right: 10px">取 消</el-button>
                    <el-button type="primary" @click="submitEditUserInfo">确 认 提 交</el-button>
                </span>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
    import config from '../../config/select.json';

    export default {
        name: "stuInfo_home",
        data() {
            return {
                userList: [],
                editData: {
                    stdId: undefined,
                    stdName: undefined,
                    stdQQ: undefined,
                    stdPhone: undefined,
                    majorValue: undefined,
                    firstWill: [],
                    firstReason: undefined,
                    secondWill: [],
                    secondReason: undefined,
                    isDispensing: true
                },
                keyword: '',
                majorData: config.majorData,
                orginazationData: config.orginazationData,
                queryInfo: {
                    query: '',
                    page: 1,
                    pageSize: 5
                },
                total: 0,
                currentPage: 1,
                dialogVisible: false,
                editdialogVisible: false
            }
        },
        methods: {
            async getUserList() {
                const token = {
                    token: sessionStorage.getItem('login')
                }
                const {data: {code, message, data: {total, students}}} = await this.$axios.post(`/getAllStuInfo?page=${this.queryInfo.page}&pageSize=${this.queryInfo.pageSize}`, token)
                if (code !== '0000') {
                    return this.$Message.error(message)
                }
                students.forEach((item) => {
                    item.isDispensing = item.isDispensing.toString()
                })
                this.userList = students
                this.queryInfo.total = total
            },
            async getUserListByKeyword() {
                const data = {
                    token: sessionStorage.getItem('login'),
                    keyword: this.keyword
                }
                const {data: {code, message, data: {total, students}}} = await this.$axios.post(`/getStuInfo?page=${this.queryInfo.page}&pageSize=${this.queryInfo.pageSize}`, data)
                if (code !== '0000') {
                    return this.$Message.error(message)
                }
                this.userList = students
                this.queryInfo.total = total
            },
            async submitEditUserInfo(msg) {
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
                        this.handleClose()
                    }
                    else {
                        this.$Message.error(message);
                    }
                }
            },
            checkValue(data) {
                let nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
                let phoneReg = /^1[3456789]\d{9}$/;
                let idReg = /^(\d{8})?$/;
                for (let key in data) {
                    if (key.indexOf('reason')) continue;
                    if (data[key] === undefined || data[key] == ' ') {
                        return this.$Message.error('有漏填的消息哦');
                    }
                }
                if (!idReg.test(data.stdId)) {
                    return this.$Message.error('学号填错了哦');
                }
                else if (!nameReg.test(data.stdName)) {
                    return this.$Message.error('姓名不合法');
                }
                else if (!phoneReg.test(data.stdPhone)) {
                    return this.$Message.error('电话号不合法');
                }
                else if (data.firstWill.length == 0 || data.secondWill.length == 0) {
                    return this.$Message.error('未填选志愿');
                }
                return true
            },
            async handleSizeChange(val) {
                this.queryInfo.pageSize = val;
                await this.getUserList()
            },
            async handleCurrentChange(val) {
                this.queryInfo.page = val;
                await this.getUserList()
                this.$refs.elTable.bodyWrapper.scrollTop = 0;
            },
            async showEditDialog(data) {
                this.editData = JSON.parse(JSON.stringify(data))
                this.editData.majorValue = [this.editData.major, this.editData.classNum]
                this.editData.firstReason = this.editData.firstWill.reason;
                this.editData.secondReason = this.editData.secondWill.reason;
                this.editData.firstWill = [this.editData.firstWill.organization, this.editData.firstWill.branch]
                this.editData.secondWill = [this.editData.secondWill.organization, this.editData.secondWill.branch]
                this.editdialogVisible = true
                console.log(this.editData)
            },
            handleClose() {
                this.editdialogVisible = false
                this.dialogVisible = false
            }
        },
        created() {
            this.getUserList()
        }
    }
</script>

<style scoped lang="less">
    .user_container {
        padding: 30px;
    }

    .el-breadcrumb {
        margin-bottom: 30px;
    }

    .el-card {
        padding: 10px 5px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
    }

    .el-row {
        text-align: center;
        height: 40px;
        line-height: 40px;
    }

    .el-table {
        margin-top: 40px;
    }

    .el-pagination {
        margin-top: 40px;
    }

    .editDialog {
        p,
        .input,
        .button,
        .select {
            margin: 10px auto;
        }
    }

    .el-table th.gutter {
        display: table-cell !important;
    }

</style>
