<template lang="jade">
header
    a.logo(href="javascript:void(0);" @click="logoClick")
    a#settings(@click="settingsClick" v-show="isLoginStatusReady") 设置
    div#username 游客
    ul.settings-list(v-show="showSettingsList")
        li.settings-item(v-show="!isLogined" @click="loginClick") 登录
        li.settings-item(v-show="isLogined" @click="logoutClick") 退出
</template>

<style lang="scss">
header {
    @extend .cf;
    height: 30px;
    width: 100%;
    padding: 5px 0;
    background-color: $mainColor;
}
a.logo {
    display: inline-block;
    height: 30px;
    width: 60px;
}
#username {
    @extend .ui-font3-rev;
    float: right;
    padding: 1px 10px;
}
#settings {
    @extend .ui-font1-rev;
    float: right;
    padding: 1px 10px;
}
.settings-list {
    position: absolute;
    top: 40px;
    right: 10px;
    width: 100px;
    border: 1px solid $color1;
    border-radius: 3px;
    background-color: $bgColor2;
}
.settings-list:before {
    content: ' ';
    position: absolute;
    top: -6px;
    left: 47px;
    border-top: 3px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 3px solid currentColor;
    border-left: 3px solid transparent;
}
.settings-item {
    @extend .ui-font1;
    text-align: center;
}
</style>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

module.exports = {
    data: {
        showSettingsList: false
    }
    computed: {
        isLoginStatusReady() {
            return !!mapGetters(['loginInfo']);
        },
        isLogined() {
            return this.isLoginStatusReady && !!mapGetters(['loginInfo']).userName;
        }
    },
    methods: {
        logoClick() {
            // TODO - show About
        },
        settingsClick() {
            this.showSettingsList = !this.showSettingsList;
        },
        loginClick() {
            mapMutations(['showLoginPanel']);
        },
        logoutClick() {
            mapActions(['userLogout']);
        }
    }
};
</script>
