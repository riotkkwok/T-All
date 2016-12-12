export default resp = {
    getTaskList: {
        code: 0,
        data: {
            taskList: [
                {
                    id: '', // 任务ID
                    name: '', // 任务名
                    asg: [ // 参与人员
                        {
                            id: '',
                            effort: {
                                dev: [''], // 开发时间
                                intg: [''], // 联调自测时间
                                test: [''], // 测试时间
                                rls: '' // 上线时间
                            }
                        }
                    ],
                    pjm: '', // 项目经理
                    pdm: '', // 产品经理
                    dsg: '', // 美术设计
                    wbe: '', // web后端
                    tsr: '', // 测试人员
                    remark: '' // 备注
                }
            ]
        }
    },

    getAssigneeList: {
        code: 0,
        data: {
            assigneeList: [
                {
                    id: '', // ID
                    name: '', // 名字
                }
            ]
        }
    }
}