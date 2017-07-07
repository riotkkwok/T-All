# 数据库存储结构

本系统的数据库是MongoDB

## Users表
用于存储登录用户数据

### 存储字段

| 字段名 | 数据类型 | 详情 |
| :---- | :---- | :---- |
| userId | String | 登录用户id |
| userName | String | 用户名 |
| password | String | 登录密码的MD5 |
| adminId | String | 管理员id |
| ticket | String | 登录ticket，登录校验 |
| ticketValid | String | 免登录失效时间，日期字符串 |

## Tasks表
用于存储任务相关信息

### 存储字段

| 字段名 | 数据类型 | 详情 |
| :---- | :---- | :---- |
| id | String | 任务id |
| name | String | 任务名 |
| color | String | 颜色，Web RGB色值 |
| startDate | String | 开始日期 |
| endDate | String | 结束日期 |
| asg | Array | 参与人员列表，详情在 *参与人员数组元素结构* |
| pjm | String | 项目经理 |
| pdm | String | 产品经理 |
| dsg | String | 美术设计 |
| wbs | String | 后端开发 |
| tsr | String | 测试人员 |
| remark | String | 备注 |

#### 参与人员数组元素结构

| 字段名 | 数据类型 | 详情 |
| :---- | :---- | :---- |
| id | String | 参与人员id |
| effort | Object | 工作量对象，包括dev(开发阶段), intg(联调阶段), test(测试阶段), rls(上线)四个字段，字段的值是字符串数组，都是该阶段所有工作日期的字符串的集合 |
| nth | Number | 显示在该参与人员的表格的第几行 |

### 参考数据
```
{
    "id": "0",
    "name": "Task 1",
    "color": "#538DD5",
    "pjm": "Jack",
    "pdm": "Doris",
    "dsg": "Alex",
    "wbe": "Kevin",
    "tsr": "William",
    "remark": "This is a coooool project.",
    "startDate": "2017/01/01",
    "endDate": "2017/01/08",
    "asg": [
        {
            "effort": {
                "dev": [
                    "2017/01/03",
                    "2017/01/02",
                    "2017/01/04"
                ],
                "intg": [
                    "2017/01/05"
                ],
                "test": [
                    "2017/01/06"
                ],
                "rls": [
                    "2017/01/08"
                ]
            },
            "id": "2",
            "nth": 0
        },
        {
            "effort": {
                "dev": [
                    "2017/01/01",
                    "2017/01/02"
                ],
                "intg": [],
                "test": [
                    "2017/01/05"
                ],
                "rls": [
                    "2017/01/08"
                ]
            },
            "id": "4",
            "nth": 0
        }
    ]
}
```

## Assignees表
用于存储任务参与者相关信息

### 存储字段

| 字段名 | 数据类型 | 详情 |
| :---- | :---- | :---- |
| id | String | 参与者id |
| name | String | 参与者名字 |
| startDate | String | 开始时间（可分配任务） |
| endDate | String | 结束时间（可分配任务） |
| leaves | Object | 休假记录对象，以日期字符串(如20170101)为字段，对应的值是time(时段)和type(类型) |

### 参考数据
```
{
    "id": "0",
    "name": "Jack",
    "startDate": "2017/01/01",
    "endDate": "2017/12/31",
    "leaves": {
        "20170102": {
            "time": "ALL",
            "type": "A"
        },
        "20170131": {
            "time": "PM",
            "type": "S"
        }
    }
}
```


## Colors表
用于存储显示颜色信息

### 存储字段

| 字段名 | 数据类型 | 详情 |
| :---- | :---- | :---- |
| color | String | 颜色，Web RGB色值 |
| vacantFrom | String | 可使用的开始时间 |