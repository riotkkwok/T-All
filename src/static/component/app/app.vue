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
            this.$store.dispatch('init', resolve, reject);
        }).then(function(){
            that.$children.forEach(function(child){
                if(child.$options._componentTag === 'wTimeTable'){
                    child.$emit('update');
                }
            })
        }, function(){
            // TODO - 异常处理
        });
    }
};
</script>