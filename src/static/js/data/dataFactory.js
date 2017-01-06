export const newSingleTask = (color) => {
    const st = {
        id: '', // 任务ID
        name: '', // 任务名
        color: color || 'transparent', // 颜色
        asg: [ // 参与人员
        ],
        pjm: '', // 项目经理
        pdm: '', // 产品经理
        dsg: '', // 美术设计
        wbe: '', // web后端
        tsr: '', // 测试人员
        remark: '' // 备注
    };
    return st;
}