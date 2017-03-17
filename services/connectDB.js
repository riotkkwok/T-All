const mongoose = require("mongoose");

const conn = mongoose.createConnection('mongodb://localhost/t-all'); // 连接数据库
const Schema = mongoose.Schema;   // 创建模型

conn.on('open', function(){
    console.log('connectDB open');
});
conn.on('error', function(){
    console.log('connectDB error');
});

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    userId: String,
    userName: String,
    password: String,
    adminId: String
}); // 定义了一个新的模型，但是此模式还未和users集合有关联
const assigneeSchema = new Schema({
    id: String,
    name: String,
    password: String
});
const taskSchema = new Schema({
    id: String, // 任务ID
    name: String, // 任务名
    color: String, // 颜色
    startDate: String, // 开始日期
    endDate: String, // 结束日期
    asg: [ // 参与人员
        {
            id: String,
            effort: {
                dev: [String], // 开发时间
                intg: [String], // 联调自测时间
                test: [String], // 测试时间
                rls: [String] // 上线时间
            },
            nth: Number // 展示位置
        }
    ],
    pjm: String, // 项目经理
    pdm: String, // 产品经理
    dsg: String, // 美术设计
    wbe: String, // web后端
    tsr: String, // 测试人员
    remark: String // 备注
});

exports.user = conn.model('users', userSchema); // 与users集合关联
exports.assignee = conn.model('assignees', assigneeSchema); // 与assignees集合关联
exports.task = conn.model('tasks', taskSchema); // 与tasks集合关联