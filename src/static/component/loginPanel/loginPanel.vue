<template lang="jade">
div#loginPanel(v-show="showLoginPanel")
    div.g-mask(@click="hideLoginPanel")
    div.g-dialog
        div.msg 请输入用户名和登录密码
        div.inputBox(type="text")
            input.nameInput
        div.inputBox(type="password")
            input.pwdInput
        button.loginBtn 登录
</template>

<style lang="sass">
@import "../../scss/base.scss";
@import "../../scss/theme.scss";

#loginPanel{
    .msg{
        @extend .ui-font2;
    }
    .inputBox
    {
        padding: 5px 0;
        input{
            @extend .ui-font1;
            text-align: center;
            width: 100%;
            border-bottom: 1px solid $darkColor2;
            &:active{
                border-bottom: 1px solid $darkColor1;
            }
        }
    }
    .loginBtn{
        @extend .ui-font1-rev;
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

export default {
    computed: mapGetters([
        'showLoginPanel'
    ]),
    methods: {
        loginSubmit() {},
        hideLoginPanel() {
            this.$store.commit('hideLoginPanel');
        }
    }
};
</script>
