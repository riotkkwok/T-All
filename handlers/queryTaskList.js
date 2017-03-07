const handler = function(){
    console.log('queryTaskList handler');
    return function(cb){
        /* mock response [start] */
        const resp = {
            "code": 0,
            "data": [{
                "id": "1", // 任务ID
                "name": "Task 1", // 任务名
                "color": "#ff6666", // 颜色
                "asg": [ // 参与人员
                    {
                        "id": "1",
                        "effort": {
                            "dev": ["2016/01/01", "2016/01/02", "2016/01/03", "2016/01/05"], // 开发时间
                            "intg": ["2016/01/06", "2016/01/08"], // 联调自测时间
                            "test": ["2016/01/09", "2016/01/10"], // 测试时间
                            "rls": ["2016/01/11"] // 上线时间
                        },
                        "nth": 0 // 展示位置
                    }, {
                        "id": "3",
                        "effort": {
                            "dev": ["2016/01/01", "2016/01/03", "2016/01/04"], // 开发时间
                            "intg": ["2016/01/06", "2016/01/07"], // 联调自测时间
                            "test": ["2016/01/10"], // 测试时间
                            "rls": [] // 上线时间
                        },
                        "nth": 0 // 展示位置
                    }
                ],
                "pjm": "Paul", // 项目经理
                "pdm": "Pactrick", // 产品经理
                "dsg": "Doris", // 美术设计
                "wbe": "Winnie", // web后端
                "tsr": "Tina", // 测试人员
                "remark": "" // 备注
            }, {
                "id": "2", // 任务ID
                "name": "Task 2", // 任务名
                "color": "#66ff66", // 颜色
                "asg": [ // 参与人员
                    {
                        "id": "1",
                        "effort": {
                            "dev": ["2016/01/07", "2016/01/08"], // 开发时间
                            "intg": ["2016/01/09"], // 联调自测时间
                            "test": [], // 测试时间
                            "rls": ["2016/01/11"] // 上线时间
                        },
                        "nth": 1 // 展示位置
                    }
                ],
                "pjm": "Paul", // 项目经理
                "pdm": "Pactrick", // 产品经理
                "dsg": "Doris", // 美术设计
                "wbe": "Winnie", // web后端
                "tsr": "Tina", // 测试人员
                "remark": "" // 备注
            }]
        };
        /* mock response [end] */
        cb(null, JSON.stringify(resp));
    }
}

module.exports = handler;