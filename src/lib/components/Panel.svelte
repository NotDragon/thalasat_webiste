<script lang="ts">
    export let background: string;
    export let width: string = '';
    export let style: string = "";
</script>

<div style="background: {background}; {width? `width: ${width};`: ''} {style}">
    <slot/>
</div>

<style>
    div {
        padding: 1%;
        padding-left: 2vw;
        padding-right: 2vw;

        border-radius: 1vh;
    }
</style>