# signUpGroupWebsite

## 介绍

本项目用于20级科协成员项目培训和练习.前端采用Vue框架,另有基于SpringBoot开发的后端服务.

根据科协成员目前进度水平,本次项目共分为报名注册和后台管理两大功能.

前端组:李鑫磊 李酉夏

后端组:徐浩瀚

## 地址

- 前端默认url: http://127.0.0.1:8000

- 后端默认url: https://www.hanzoy.com/signUpGroupWebsite/{code}/

## 返回码

```
0000				一切正常
1000       	用户密码错误
2000       	用户操作异常
1001				token错误
```



## 接口

### 用户

**提交志愿**

**url：**/post

**method：**post

```json
{
  stdId: String, 			//学号	必填		重复学号会覆盖之前的信息
  stdName: String, 			//姓名	必填
  major: String, 			//专业	必填	
  classNum: String, 		//班级	必填
  stdQQ: String, 			//学生qq	必填
  stdPhone: String 			//学生手机号 必填
  firstWill: { 				//第一志愿 必填
      organization: String, //组织名 必填
      branch: String, 		//下属部门 必填
      reason: String, 		//加入该组织的原因
  }
  secondWill: { 			//第二志愿
      organization: String, //组织名 
      branch: String, 		//下属部门
      reason: String, 		//加入该组织的原因
  }
  isDispensing: Boolean 	//是否调剂 不填默认为true
}
```



```json
{
    code: String,
    message: String
}
```



各部门详情:

------

"团委":"组织部","宣传部","心协","青协"

------

"学生会":"办公室","学习部","宣传部","文艺部","体育部","外联部","自管会"

------

"科技协会":"科技协会"

------

"勤工助学中心":"管理部","活动部","助贷部","外联部"

------

"新闻中心":"摄影协会","新媒体部","记者团"

------

每个组织对应的部门不同，对组织及下属部门的select需要做联动



### 管理员

**登录**

**URL：**/login

**method：**post

```json
{
	username: String,
	password: String
}
```



```json
{
    code: String,		//必有
    message: String,	//必有
    data: {				//必有
    	token: String	//如果code不为0000，则返回 "" 。
	}
    
}
```



**验证token**

**URL：**/getRole

**method：**post

```json
{
	token: String
}
```



```json
{
    code: String,		//必有
    message: String,	//必有
    data: {
        name: String,
        role: String	//(admin || superAdmin)
    }
}
```



### 信息查询

**全表查询**

**URL：**/getAllStuInfo?page=XX&pageSize=XX

**method：**post

```json
{
    token: String
    
    //page: Number		//不传默认为1
    //pageSize: Number
}
```

```json
{
	code: String,
	message: String,
	data: {
		total: Number,					//总共有多少页，从1开始
		students: [{
            stdId: String, 				//学号	必填		重复学号会覆盖之前的信息
          	stdName: String, 			//姓名	必填
          	major: String, 				//专业	必填	
          	classNum: String, 			//班级	必填
          	stdQQ: String, 				//学生qq	必填
         	stdPhone: String 			//学生手机号 必填
          	firstWill: { 				//第一志愿 必填
              	organization: String, 	//组织名 必填
              	branch: String, 		//下属部门 必填
              	reason: String, 		//加入该组织的原因
          	}
          	secondWill: { 				//第二志愿
              	organization: String, 	//组织名 
              	branch: String, 		//下属部门
              	reason: String, 		//加入该组织的原因
          	}
          	isDispensing: Boolean 		//是否调剂 不填默认为true
        },{
            stdId: String, 				//学号	必填		重复学号会覆盖之前的信息
          	stdName: String, 			//姓名	必填
          	major: String, 				//专业	必填	
          	classNum: String, 			//班级	必填
          	stdQQ: String, 				//学生qq	必填
         	stdPhone: String 			//学生手机号 必填
          	firstWill: { 				//第一志愿 必填
              	organization: String, 	//组织名 必填
              	branch: String, 		//下属部门 必填
              	reason: String, 		//加入该组织的原因
          	}
          	secondWill: { 				//第二志愿
              	organization: String, 	//组织名 
              	branch: String, 		//下属部门
              	reason: String, 		//加入该组织的原因
          	}
          	isDispensing: Boolean 		//是否调剂 不填默认为true
        }...]
    }
}
```

**关键字查询**

**URL：**/getStuInfo?page=XX&pageSize=XX

**method：**post

```json
{
    token: String,
    keyWord: Strign
}
```

```json
{
	code: String,
	message: String,
	data: {
		total: Number,					//总共有多少页，从1开始
		students: [{
            stdId: String, 				//学号	必填		重复学号会覆盖之前的信息
          	stdName: String, 			//姓名	必填
          	major: String, 				//专业	必填	
          	classNum: String, 			//班级	必填
          	stdQQ: String, 				//学生qq	必填
         	stdPhone: String 			//学生手机号 必填
          	firstWill: { 				//第一志愿 必填
              	organization: String, 	//组织名 必填
              	branch: String, 		//下属部门 必填
              	reason: String, 		//加入该组织的原因
          	}
          	secondWill: { 				//第二志愿
              	organization: String, 	//组织名 
              	branch: String, 		//下属部门
              	reason: String, 		//加入该组织的原因
          	}
          	isDispensing: Boolean 		//是否调剂 不填默认为true
        },{
            stdId: String, 				//学号	必填		重复学号会覆盖之前的信息
          	stdName: String, 			//姓名	必填
          	major: String, 				//专业	必填	
          	classNum: String, 			//班级	必填
          	stdQQ: String, 				//学生qq	必填
         	stdPhone: String 			//学生手机号 必填
          	firstWill: { 				//第一志愿 必填
              	organization: String, 	//组织名 必填
              	branch: String, 		//下属部门 必填
              	reason: String, 		//加入该组织的原因
          	}
          	secondWill: { 				//第二志愿
              	organization: String, 	//组织名 
              	branch: String, 		//下属部门
              	reason: String, 		//加入该组织的原因
          	}
          	isDispensing: Boolean 		//是否调剂 不填默认为true
        }...]
    }
}
```

