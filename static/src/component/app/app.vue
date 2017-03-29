<template lang="jade">
    div#app
        wHeader

        wLoginPanel

        wTimeTable

        wDetails

        wFooter
</template>

<script>
import wHeader from 'header'
import wFooter from 'footer'
import wLoginPanel from 'loginPanel'
import wTimeTable from 'timeTable'
import wDetails from 'details'

export default {
    name: 'app',
    components: {
        wHeader,
        wDetails,
        wTimeTable,
        wFooter,
        wLoginPanel
    },
    mounted() {
        const that = this;
        new Promise((resolve, reject) => {
            this.$store.dispatch('init', {rs: resolve, rj: reject});
        }).then(function(){
            that.$children.forEach(function(child){
                if(/wHeader|wTimeTable/.test(child.$options._componentTag)){
                    child.$emit('update');
                }
            })
        }, function(){
            // TODO - 异常处理
        });
    }
};
</script>