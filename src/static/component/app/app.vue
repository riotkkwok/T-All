<script>
export default {
    name: 'app',
    components: {
        'wHeader': require('header'),
        'wEditor': require('../component/editor/editor.js'),
        'wTimeTable': require('../component/timeTable/timeTable.js'),
        'wFooter': require('footer'),
        'wLoginPanel': require('loginPanel')
    }
});
</script>