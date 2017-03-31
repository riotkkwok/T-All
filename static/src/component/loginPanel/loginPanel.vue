<template lang="jade">
div#loginPanel(v-show="showLoginPanel")
    div.g-mask(@click="hideLoginPanel")
    div.g-dialog
        div.msg 请输入用户ID和登录密码
        div.errMsg(v-show="showErrMsg") 登录失败，请重新输入
        div.inputBox
            input.nameInput(type="text", placeholder="用户ID", v-model="userId")
        div.inputBox
            input.pwdInput(type="password", placeholder="密码", v-model="password")
        button.loginBtn(@click="loginSubmit") 登录
</template>

<style lang="sass">
@import "../../scss/base.scss";
@import "../../scss/theme.scss";

#loginPanel{
    .msg{
        @extend %ui-font2;
    }
    .errMsg{
        @extend %ui-font4;
        color: #ff0000;
    }
    .inputBox
    {
        padding: 5px 0;
        input{
            @extend %ui-font1;
            text-align: center;
            width: 100%;
            border-bottom: 1px solid $darkColor2;
            &:active{
                border-bottom: 1px solid $darkColor1;
            }
            &::-webkit-input-placeholder{
                color: #cccccc;
                font-weight: normal;
            }
        }
    }
    .loginBtn{
        @extend %ui-font1-rev;
        box-sizing: border-box;
        width: 100%;
        border-radius: 2px;
        margin-top: 15px;
        padding: 5px;
        background-color: $mainColor;
    }
}
</style>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getCookie } from 'myUtil'

export default {
    data() {
        return {
            userId: getCookie('userId') || '',
            password: '',
            showErrMsg: false
        }
    },
    computed: mapGetters([
        'showLoginPanel'
    ]),
    methods: {
        loginSubmit() {
            new Promise((rs, rj) => {
                this.$store.dispatch('userLogin', {
                    param: {
                        userId: this.userId,
                        password: this.password
                    }, 
                    rs, 
                    rj
                });
            }).then(() => {
                this.showErrMsg = false;
                this.$store.commit('showLoginPanel', false);
            }, () => {
                // TODO - 异常处理
                this.showErrMsg = true;
            });
        },
        hideLoginPanel() {
            this.$store.commit('showLoginPanel', false);
            this.password = '';
            this.showErrMsg = false;
        }
    }
};
</script>
