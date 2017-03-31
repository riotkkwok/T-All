<template lang="jade">
header
    a.logo(href="javascript:void(0);" @click="logoClick")
    a#settings(@click="settingsClick" v-show="isLoginStatusReady") 设置
    div#username(@click="loginClick") 
        | {{ username || '游客' }}
    ul.settings-list(v-show="showSettingsList")
        li.settings-item(v-show="!isLogined" @click="loginClick") 登录
        li.settings-item(v-show="isLogined" @click="logoutClick") 退出
</template>

<style lang="sass">
@import "../../scss/base.scss";
@import "../../scss/theme.scss";

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
    cursor: pointer;
}
#username {
    @extend %ui-font3-rev;
    float: right;
    line-height: 28px;
    padding: 1px 10px;
    cursor: pointer;
}
#settings {
    @extend %ui-font1-rev;
    float: right;
    padding: 1px 10px;
    cursor: pointer;
}
.settings-list {
    position: absolute;
    top: 50px;
    right: 10px;
    width: 100px;
    border: 1px solid $color1;
    border-radius: 3px;
    background-color: $bgColor1;
    cursor: pointer;
    z-index: 5;
}
.settings-list:before {
    content: ' ';
    position: absolute;
    top: -20px;
    right: 14px;
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid $color1;
    border-left: 10px solid transparent;
}
.settings-item {
    @extend %ui-font1;
    text-align: center;
}
</style>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

module.exports = {
    created() {
        // TODO - to be deleted
        this.$on('update', function(){
            this.username = this.$store.getters['loginInfo'].userName;
        });
    },
    data(){
        return {
            showSettingsList: false
        }
    },
    computed: {
        isLoginStatusReady() {
            return !!this.$store.getters['loginInfo'];
        },
        isLogined() {
            return this.isLoginStatusReady && !!this.$store.getters['loginInfo'].userName;
        },
        username() {
            return this.$store.getters['loginInfo'].userName;
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
            if(this.isLogined){
                return;
            }
            this.$store.commit('showLoginPanel', true);
            this.showSettingsList = false;
        },
        logoutClick() {
            this.$store.dispatch(['userLogout']);
            this.showSettingsList = false;
        }
    }
};
</script>
