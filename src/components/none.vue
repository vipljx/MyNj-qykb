<template>
    <div class="none">
        <div class="none-img">
            <img src="../assets/images/web/none-tp1.png" alt="">
        </div>
        <div class="none-note">{{note}}</div>
        <button class="none-btn" v-if="false">立即前往</button>
    </div>
</template>
<script>
export default {
    props:["note"]
}
</script>
<style lang="less" scoped>
.none{
    text-align: center;
    .none-img{
        width: 186*@precision;
        margin: 0 auto;
    }
    .none-note{
        color: #cccccc;
        font-size: 1.6rem;
        padding: 3rem 0;
    }
    .none-btn{
        background: #ffa200;
            color: #ffffff;
            font-size: 1.4rem;
            padding: 1rem 2.8rem;
            border: 0;
          
            margin: 0 auto;
    }
}
</style>
